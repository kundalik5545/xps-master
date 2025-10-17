"use client";

import { flexRender } from "@tanstack/react-table";
import {
  ArrowDownUp,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ChevronDown,
  Columns3,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { TableCell, TableHead, TableRow } from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

// Select-all checkbox rendered in the table header
const HeaderSelectAllCheckbox = ({ table }) => {
  if (!table) return null;

  return (
    <TableHead className={"w-[50px]"}>
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all rows"
      />
    </TableHead>
  );
};

// Per-row selection checkbox
const RowSelectCheckbox = ({ row }) => {
  if (!row) return null;

  return (
    <TableCell>
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    </TableCell>
  );
};

// Column sort button with direction-aware icon
const ColumnSortButton = ({ header }) => {
  if (!header.column.getCanSort()) {
    return null;
  }

  const sortState = header.column.getIsSorted();
  return (
    <Button
      variant="ghost"
      onClick={header.column.getToggleSortingHandler()}
      title={sortState ? `Sorted ${sortState}` : "Toggle sort"}
    >
      {sortState ? (
        sortState === "desc" ? (
          <ArrowDownWideNarrow className="ml-2 h-4 w-4" />
        ) : (
          <ArrowUpNarrowWide className="ml-2 h-4 w-4" />
        )
      ) : (
        <ArrowDownUp className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
};

// Render column header label
const ColumnHeaderLabel = ({ header }) => {
  if (!header) return null;

  return (
    <span className="font-medium">
      {flexRender(header.column.columnDef.header, header.getContext())}
    </span>
  );
};

// Render cell value
const CellValue = ({ cell }) => {
  if (!cell) return null;

  return (
    <span>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
  );
};

// Empty-state row spanning full width
const EmptyStateRow = ({ columns }) => {
  return (
    <TableRow>
      <TableCell colSpan={columns.length} className="h-20 text-center">
        No results.
      </TableCell>
    </TableRow>
  );
};

// Render header rows for the table instance
// Back-compat props: isTableSort -> enableSorting, isTableHeadingCheckBox -> enableSelectAll
const ColumnHeaderRows = ({
  table,
  enableSorting,
  isTableSort,
  enableSelectAll,
  isTableHeadingCheckBox,
}) => {
  const sortingEnabled = enableSorting ?? isTableSort;
  const selectAllEnabled = enableSelectAll ?? isTableHeadingCheckBox;
  return (
    <>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {selectAllEnabled && <HeaderSelectAllCheckbox table={table} />}

          {headerGroup.headers.map((header) => (
            <TableHead key={header.id}>
              <ColumnHeaderLabel header={header} />
              {sortingEnabled && <ColumnSortButton header={header} />}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </>
  );
};

const RowActions = ({ record, onEdit, onDelete, deleting }) => {
  if (!deleting) return toast.error("Please Provide deleting function ...");

  return (
    <div className="flex items-center justify-end gap-2">
      {onEdit && (
        <Button variant="secondary" size="icon" onClick={() => onEdit(record)}>
          <Pencil className="h-4 w-4" />
        </Button>
      )}
      {onDelete && (
        <Button
          variant="destructive"
          size="icon"
          onClick={() => onDelete(record.id)}
        >
          {deleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      )}
    </div>
  );
};

const RowActionsHeader = () => {
  return <span className="flex items-end justify-end text-end">Actions</span>;
};

const TableColVisibilitySelect = ({ table }) => {
  if (!table) return null;

  return (
    <div className="inline-block text-left">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            <Columns3 />
            Columns <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export {
  // New, clearer names
  RowActions,
  RowActionsHeader,
  HeaderSelectAllCheckbox,
  TableColVisibilitySelect,
  ColumnHeaderRows,
  ColumnHeaderLabel,
  EmptyStateRow,
  RowSelectCheckbox,
  CellValue,
  ColumnSortButton,
  // Backward-compatible aliases
  RowActions as TableActions,
  RowActionsHeader as TableActionsHeader,
  HeaderSelectAllCheckbox as TableHeadCheckBox,
  ColumnHeaderRows as TableHeading,
  ColumnHeaderLabel as TableHeadingText,
  EmptyStateRow as TableNoResults,
  RowSelectCheckbox as TableRowCellCheckBox,
  CellValue as TableRowCellText,
  ColumnSortButton as TableSortIcon,
};

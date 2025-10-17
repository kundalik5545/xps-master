import {
  TableHeading,
  TableNoResults,
  TableRowCellCheckBox,
  TableRowCellText,
} from "@/components/myUi/TableComponents";
import TablePagination from "@/components/myUi/TablePagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import UsersFilter from "./UsersFilter";

const UsersTable = ({ data, columns, onMultiRowDelete, loading }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const initialVisibility = {};
    columns.forEach((column) => {
      if (column.meta?.initiallyHidden) {
        initialVisibility[column.accessorKey || column.id] = false;
      }
    });
    return initialVisibility;
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility,
    },
    meta: {
      debounceTime: 200,
    },
  });

  const handleMultiDelete = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const selectedIds = selectedRows.map((row) => row.original.id);
    const res = onMultiRowDelete(selectedIds);
    if (res && res.then) {
      res.then(() => table.resetRowSelection());
    }
  };

  const resetFilters = () => {
    setSorting([]);
    setColumnFilters([]);
    setRowSelection({});
  };

  return (
    <div>
      {/* Table Filters */}
      <UsersFilter
        table={table}
        rowSelection={rowSelection}
        resetFilters={resetFilters}
        handleMultiDelete={handleMultiDelete}
        loading={loading}
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-md shadow-md mt-4 p-3">
        <Table>
          <TableHeader>
            <TableHeading
              table={table}
              isTableSort={true}
              isTableHeadingCheckBox={true}
            />
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {!data || data.length === 0 ? (
              <TableNoResults columns={columns} />
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {/* To Select Individual Row */}
                  <TableRowCellCheckBox row={row} />

                  {/* Custome cell value or else Table Row Cell Text */}
                  {row.getVisibleCells().map((cell) => {
                    const columnId = cell.column.id;

                    return (
                      <TableCell key={cell.id}>
                        {columnId === "portalUrl" ? (
                          <Button
                            className={"text-blue-600 underline cursor-pointer"}
                            variant="link"
                            onClick={() =>
                              window.open(cell.getValue(), "_blank")
                            }
                          >
                            Visit Portal
                          </Button>
                        ) : (
                          <TableRowCellText cell={cell} />
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Table Pagination */}
      <TablePagination table={table} />
    </div>
  );
};

export default UsersTable;

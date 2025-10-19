"use client";
import Loading from "@/app/Loading";
import {
  TableHeading,
  TableNoResults,
  TableRowCellText,
} from "@/components/myUi/TableComponents";
import TablePagination from "@/components/myUi/TablePagination";
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
import EmTCFilter from "./EmTCFilter";

const EmTCTables = ({ data, columns, loading }) => {
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

  const resetFilters = () => {
    setSorting([]);
    setColumnFilters([]);
    setRowSelection({});
  };

  if (!table) return null;

  return (
    <div>
      {/* Table Filters */}
      <EmTCFilter
        table={table}
        rowSelection={rowSelection}
        resetFilters={resetFilters}
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-md shadow-md mt-4 p-3">
        <Table>
          <TableHeader>
            <TableHeading
              table={table}
              isTableSort={true}
              isTableHeadingCheckBox={false}
            />
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {loading ? (
              <Loading />
            ) : data && data.length > 0 ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        <TableRowCellText cell={cell} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : (
              <TableNoResults columns={columns} />
            )}
          </TableBody>
        </Table>
      </div>

      {/* Table Pagination */}
      <TablePagination table={table} />
    </div>
  );
};

export default EmTCTables;

"use client";
import React, { useState } from "react";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  TableHeading,
  TableNoResults,
  TableRowCellText,
} from "@/components/myUi/TableComponents";
import TablePagination from "@/components/myUi/TablePagination";
import DbTableFilter from "./tableFilter";
import Loading from "@/app/Loading";

const DbTables = ({ data, columns, loading }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});

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
    state: {
      sorting,
      columnFilters,
      rowSelection,
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
      <DbTableFilter
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

export default DbTables;

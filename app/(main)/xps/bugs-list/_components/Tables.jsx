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
import XpsBugsFilter from "./xpsBugFilter";

const XpsBugsTable = ({ data, columns, loading }) => {
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
  if (loading) return <Loading />;
  if (!data || data.length === 0) return <TableNoResults columns={columns} />;

  return (
    <div>
      {/* Table Filters */}
      <XpsBugsFilter
        table={table}
        rowSelection={rowSelection}
        resetFilters={resetFilters}
      />

      {/* Table */}
      <div className="overflow-x-auto rounded-md shadow-md mt-4 p-3 ">
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
            {!data ? (
              <TableNoResults columns={columns} />
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-start">
                      <TableRowCellText cell={cell} />
                    </TableCell>
                  ))}
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

export default XpsBugsTable;

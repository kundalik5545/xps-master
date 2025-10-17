/**
 * TablePagination component => paginated table navigation.
 * @param {Object} props.table - Table instance with pagination state and navigation methods.
 * @returns {JSX.Element|null} Pagination controls for the table.
 *
 * Usage: Pass a table object with `.getState().pagination`, `.setPageSize`, `.previousPage`, `.nextPage`, `.getCanPreviousPage`, `.getCanNextPage`, and `.getPageCount()` methods.
 */

"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const TablePagination = ({ table }) => {
  if (!table) return null;

  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-6 gap-4">
      {/* Page Size Selector */}
      {isMobile ? undefined : <PageSize table={table} />}

      {/* Pagination Controls */}
      <PageChange table={table} />
    </div>
  );
};

export default TablePagination;

const PageSize = ({ table }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-700">Rows per page:</span>
      <Select
        value={String(table.getState().pagination.pageSize)} // must be string
        onValueChange={(value) => {
          table.setPageSize(Number(value)); // convert back to number
        }}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {[5, 10, 20, 50].map((pageSize) => (
            <SelectItem key={pageSize} value={String(pageSize)}>
              {pageSize}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

const PageChange = ({ table }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        size={"sm"}
        variant={"outline"}
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>

      <span className="text-sm text-gray-700">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </span>

      <Button
        size={"sm"}
        variant={"outline"}
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  );
};

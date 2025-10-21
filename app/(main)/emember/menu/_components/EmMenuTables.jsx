"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Clock } from "lucide-react";

const EmMenuTables = ({ emTablesData }) => {
  const rows = Array.isArray(emTablesData) ? emTablesData : [];

  return (
    <div className="max-w-7xl mx-auto space-y-4 mt-5">
      <h2 className="text-xl font-semibold">Emember Tables</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Table Name</TableHead>

              <TableHead>
                <span className="flex items-center justify-end gap-2">
                  {" "}
                  Created At <Clock className="w-4 h-4" />{" "}
                </span>
              </TableHead>
              <TableHead>
                <span className="text-right flex items-center justify-end gap-2">
                  Updated At <Clock className="w-4 h-4" />
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-sm text-muted-foreground"
                >
                  No emember tables found.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id ?? "-"}</TableCell>
                  <TableCell>{row.emTableName ?? "-"}</TableCell>
                  <TableCell className="text-right">
                    {row.createdAt
                      ? new Date(row.createdAt).toLocaleString()
                      : "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {row.updatedAt
                      ? new Date(row.updatedAt).toLocaleString()
                      : "-"}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EmMenuTables;

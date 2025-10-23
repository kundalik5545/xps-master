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
import Link from "next/link";

const XpsReleasedTask = ({ xpsTablesData }) => { 
  const rows = Array.isArray(xpsTablesData) ? xpsTablesData : [];

  return (
    <div className="  space-y-4 mt-5">
      <h2 className="text-xl font-semibold">XPS Released Tasks</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Task Title</TableHead>
              <TableHead>Portal Name</TableHead>
              <TableHead>Task State</TableHead>
              <TableHead>Environment</TableHead>
              <TableHead>Assigned By</TableHead>
              <TableHead>Comments</TableHead>
              <TableHead>Task URL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-sm text-muted-foreground"
                >
                  No tables found.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id ?? "-"}</TableCell>
                  <TableCell>{row.taskTitle ?? "-"}</TableCell>
                  <TableCell>{row.portalName ?? "-"}</TableCell>
                  <TableCell>{row.taskState ?? "-"}</TableCell>
                  <TableCell>{row.env ?? "-"}</TableCell>
                  <TableCell>{row.assignedBy ?? "-"}</TableCell>
                  <TableCell>{row.comments ?? "-"}</TableCell>
                  <TableCell>
                    {row.taskURL ? (
                      <Link
                        href={row.taskURL}
                        target="_blank"
                        className="text-blue-600 underline cursor-pointer"
                      >
                        View Task
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
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

export default XpsReleasedTask;

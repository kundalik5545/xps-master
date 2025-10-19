"use client";
import { getEmTableById } from "@/actions/database/em_databaseReq";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const XpsColumnsPage = () => {
  const { id } = useParams();
  const [emTables, setEmTables] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchXpsTable = async () => {
      setLoading(true);
      const res = await getEmTableById(id);
      setEmTables(res.resData);
      setLoading(false);
    };
    fetchXpsTable();
  }, [id]);

  return (
    <div className="space-y-6 mt-10">
      <h2 className="text-2xl font-bold tracking-tight">
        Table Columns -{" "}
        <span className="text-blue-600">
          {emTables?.emTableName || "No table name found"}
        </span>
      </h2>

      {/* Table */}
      <div className="max-w-5xl overflow-x-auto rounded-md shadow-md mt-4 p-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className={"font-bold text-lg text-red-600"}>
                Column Name
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <Spinner />
            ) : emTables && emTables.emColumns.length > 0 ? (
              emTables.emColumns.map((col) => (
                <TableRow key={col.id}>
                  <TableCell>{col.emColumnName}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  No columns found for this table.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default XpsColumnsPage;

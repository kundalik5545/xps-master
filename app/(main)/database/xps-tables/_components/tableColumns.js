import Link from "next/link";

export const dbTablesColumns = () => [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "tableName",
    header: "Table Name",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "xpsMenuId",
    header: "Xps Menu Id",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "More Details",
    header: "More Details",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
    cell: ({ row }) => {
      return (
        <Link
          href={`/database/xps-tables/${row.original.id}`}
          className="text-blue-600 underline cursor-pointer"
        >
          More Details
        </Link>
      );
    },
  },
];

export default dbTablesColumns;

import Link from "next/link";

export const emTablesColumns = () => [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "emTableName",
    header: "Table Name",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "emMenuId",
    header: "Em Menu Id",
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
          href={`/database/emember-tables/${row.original.id}`}
          className="text-blue-600 underline cursor-pointer"
        >
          More Details
        </Link>
      );
    },
  },
];

export default emTablesColumns;

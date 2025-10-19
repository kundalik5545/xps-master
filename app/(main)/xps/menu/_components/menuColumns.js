import Link from "next/link";

export const xpsMenuColumns = () => [
  {
    accessorKey: "menuName",
    header: "Menu Name",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "schemeLevel",
    header: "Scheme Level",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "module",
    header: "Module",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "automationStatus",
    header: "Automation Status",
    enableSorting: true,
    enableHiding: false,
    enableColumnFilter: true,
  },
  {
    accessorKey: "userGuideId",
    header: "User Guide Id",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "More Details",
    header: "More Details",
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
    cell: ({ row }) => {
      return (
        <Link
          href={`/xps/menu/${row.original.id}`}
          className="text-blue-600 underline cursor-pointer"
        >
          More Details
        </Link>
      );
    },
  },
];

export default xpsMenuColumns;

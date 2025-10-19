import Link from "next/link";

export const emMenuColumns = () => [
  {
    accessorKey: "emMenuName",
    header: "Menu Name",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "portalName",
    header: "Portal Name",
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
          href={`/emember/menu/${row.original.id}`}
          className="text-blue-600 underline cursor-pointer"
        >
          More Details
        </Link>
      );
    },
  },
];

export default emMenuColumns;

import Link from "next/link";

export const emTCColumns = () => [
  {
    accessorKey: "testCaseNo",
    header: "Test Case No",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
    cell: ({ row }) => {
      const record = row.original;
      return (
        <Link
          href={`/emember/test-cases/${record.id}`}
          className="text-blue-600 underline cursor-pointer"
        >
          {record.testCaseNo}
        </Link>
      );
    },
  },
  {
    accessorKey: "testCaseName",
    header: "Test Case Name",
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
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "expectedResult",
    header: "Expected Result",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
    meta: {
      initiallyHidden: true, // Hide by default
    },
  },
  {
    accessorKey: "actualResult",
    header: "Actual Result",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
    meta: {
      initiallyHidden: true, // Hide by default
    },
  },
  {
    accessorKey: "comments",
    header: "Comments",
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
];

export default emTCColumns;

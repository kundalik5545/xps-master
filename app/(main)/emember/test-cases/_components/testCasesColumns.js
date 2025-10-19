import {
  TableActions,
  TableActionsHeader,
} from "@/components/myUi/TableComponents";
import Link from "next/link";

export const emTCColumns = ({ onEdit, onDelete }) => [
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
    header: "portalName",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "automationStatus",
    header: "automationStatus",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "expectedResult",
    header: "expectedResult",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
    meta: {
      initiallyHidden: true, // Hide by default
    },
  },
  {
    accessorKey: "actualResult",
    header: "actualResult",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
    meta: {
      initiallyHidden: true, // Hide by default
    },
  },
  {
    accessorKey: "comments",
    header: "comments",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "emMenuId",
    header: "emMenuId",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    id: "actions",
    header: () => <TableActionsHeader />,
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
    cell: ({ row }) => {
      const record = row.original;
      return (
        <TableActions record={record} onEdit={onEdit} onDelete={onDelete} />
      );
    },
  },
];

export default emTCColumns;

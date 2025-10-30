import {
  TableActions,
  TableActionsHeader,
} from "@/components/myUi/TableComponents";
import Link from "next/link";

export const dwTaskColumns = ({ onEdit, onDelete }) => [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "taskId",
    header: "Task Id",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
    filterFn: "includesString",
  },
  {
    accessorKey: "taskTitle",
    header: "Task Title",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "taskState",
    header: "Task State",
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
    accessorKey: "env",
    header: "Env",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "assignedBy",
    header: "Assigned By",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "taskURL",
    header: "Task URL",
    enableSorting: false,
    enableHiding: true,
    enableColumnFilter: false,
    cell: ({ row }) => {
      return (
        <Link
          href={row.original.taskURL}
          className="text-blue-500 hover:text-blue-700 underline cursor-pointer"
          target="_blank"
        >
          View Task
        </Link>
      );
    },
  },
  {
    accessorKey: "moreDetails",
    header: "More Details",
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
    cell: ({ row }) => {
      return (
        <Link
          href={`/basics/daily-work/${row.original.id}`}
          className="text-blue-500 hover:text-blue-700 underline cursor-pointer"
        >
          View Details
        </Link>
      );
    },
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

export default dwTaskColumns;

import {
  TableActions,
  TableActionsHeader,
} from "@/components/myUis/TableComponents";
import Link from "next/link";

export const XpsRTColumns = ({ onEdit, onDelete }) => [
  {
    accessorKey: "taskId",
    header: "Task Id",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "taskTitle",
    header: "Task Title",
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
    accessorKey: "taskState",
    header: "Task State",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "env",
    header: "Environment",
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
    accessorKey: "comments",
    header: "Comments",
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
      const s = row.original.taskURL;
      return s ? (
        <Link
          href={row.original.taskURL}
          className="text-blue-600 underline cursor-pointer"
          target="_blank"
        >
          View Task
        </Link>
      ) : (
        <span className="text-muted-foreground">-</span>
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

export default XpsRTColumns;

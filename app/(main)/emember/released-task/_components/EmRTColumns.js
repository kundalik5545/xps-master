import {
  TableActions,
  TableActionsHeader,
} from "@/components/myUis/TableComponents";
import Link from "next/link";

export const EmRTColumns = ({ onEdit, onDelete }) => [
  {
    accessorKey: "emTaskId",
    header: "Task Id",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "emTaskTitle",
    header: "Task Title",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "emPortalName",
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
    accessorKey: "emComments",
    header: "Comments",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "emTaskUrl",
    header: "Task URL",
    enableSorting: false,
    enableHiding: true,
    enableColumnFilter: false,
    cell: ({ row }) => {
      const s = row.original.emTaskUrl;
      return s ? (
        <Link
          href={s}
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

export default EmRTColumns;

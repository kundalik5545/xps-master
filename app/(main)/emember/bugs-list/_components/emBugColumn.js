import {
  TableActions,
  TableActionsHeader,
} from "@/components/myUi/TableComponents";
import Link from "next/link";

export const emBugsColumns = ({ onEdit, onDelete }) => [
  {
    accessorKey: "emBugId",
    header: "Em Bug Id",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "emBugTitle",
    header: "Em Bug Title",
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
    accessorKey: "qaBugState",
    header: "QA Bug State",
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
    accessorKey: "assignedTo",
    header: "Assigned To",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "emBugUrl",
    header: "Em Bug URL",
    enableSorting: false,
    enableHiding: true,
    enableColumnFilter: false,
    cell: ({ row }) => {
      const s = row.original.emBugUrl;
      return s ? (
        <Link
          href={s}
          className="text-blue-600 underline cursor-pointer"
          target="_blank"
        >
          View Bug
        </Link>
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
  },
  {
    accessorKey: "comments",
    header: "Comments",
    enableSorting: false,
    enableHiding: true,
    enableColumnFilter: false,
    meta: {
      initiallyHidden: true, // Hide by default
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

export default emBugsColumns;

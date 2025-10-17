import {
  TableActions,
  TableActionsHeader,
} from "@/components/myUi/TableComponents";

export const portalColumns = ({ onEdit, onDelete, deleting }) => [
  {
    accessorKey: "portalName",
    header: "Portal Name",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "appName",
    header: "App Name",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "userName",
    header: "User Name",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "password",
    header: "Password",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "memorableWord",
    header: "Memorable Word",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "appURL",
    header: "App URL",
    enableSorting: false,
    enableHiding: false,
    enableColumnFilter: false,
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
        <TableActions
          record={record}
          onEdit={onEdit}
          onDelete={onDelete}
          deleting={deleting}
        />
      );
    },
  },
];

export default portalColumns;

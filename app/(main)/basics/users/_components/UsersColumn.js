import {
  TableActions,
  TableActionsHeader,
} from "@/components/myUi/TableComponents";

export const userColumns = ({ onEdit, onDelete, deleting } = {}) => [
  {
    accessorKey: "id",
    header: "ID",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
    meta: {
      initiallyHidden: false, // Hide by default
    },
  },
  {
    accessorKey: "eMemberId",
    header: "eMember ID",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "xpsId",
    header: "XPS ID",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "userHashId",
    header: "Hash ID",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "username",
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
    enableColumnFilter: false,
  },
  {
    accessorKey: "userStatusId",
    header: "User Status ID",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
    cell: ({ row }) => {
      const s = row.original.userStatusId;
      return s ? (
        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-white/6">
          {String(s)}
        </span>
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
  },
  {
    accessorKey: "userEmail",
    header: "User Email",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "xpsSchemeId",
    header: "XPS Scheme",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
    meta: {
      initiallyHidden: true, // Hide by default
    },
  },
  {
    accessorKey: "eMemberSchemeId",
    header: "eMember Scheme",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
    meta: {
      initiallyHidden: true,
    },
  },
  {
    accessorKey: "niNumber",
    header: "NI Number",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
  },
  {
    accessorKey: "DOB",
    header: "Date of Birth",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
    cell: ({ row }) => {
      const v = row.original.DOB;
      if (!v) return <span className="text-muted-foreground">-</span>;
      try {
        const d = new Date(v);
        return d.toLocaleDateString();
      } catch {
        return <span className="text-muted-foreground">-</span>;
      }
    },
  },
  {
    accessorKey: "addressId",
    header: "Address ID",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
    cell: ({ row }) => {
      const v = row.original.addressId;
      if (!v) return <span className="text-muted-foreground">-</span>;
      return v;
    },
  },
  {
    accessorKey: "postcode",
    header: "Postcode",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: false,
    cell: ({ row }) => {
      const v = row.original.postcode;
      if (!v) return <span className="text-muted-foreground">-</span>;
      return v;
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

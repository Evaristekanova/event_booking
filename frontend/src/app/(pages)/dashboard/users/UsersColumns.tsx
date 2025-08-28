import { type ColumnDef } from "@tanstack/react-table";
import Button from "../../../components/shared/Button";
import { Badge } from "../../../components/shared/Badge";
import { LuArrowUpDown } from "react-icons/lu";

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: "USER" | "ADMIN";
  status: "ACTIVE" | "INACTIVE";
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

interface UsersColumnsProps {
  onActivate?: (user: User) => void;
  onDeactivate?: (user: User) => void;
  isAdmin?: boolean;
}

export function UsersColumns({
  onActivate = () => {},
  onDeactivate = () => {},
  isAdmin = false,
}: UsersColumnsProps): ColumnDef<User, unknown>[] {
  return [
    {
      accessorKey: "fullName",
      header: ({ column }) => (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <LuArrowUpDown className="ml-2 h-4 w-4" />
          <span className="ml-2">Name</span>
        </span>
      ),
      cell: ({ row }) => (
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-sm font-medium text-purple-700">
              {row.original.fullName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {row.original.fullName}
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <div className="text-sm text-gray-900">{row.original.email}</div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <Badge
          variant={row.original.role === "ADMIN" ? "default" : "secondary"}
          className={
            row.original.role === "ADMIN"
              ? "bg-purple-100 text-purple-800"
              : "bg-gray-100 text-gray-800"
          }
        >
          {row.original.role}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <LuArrowUpDown className="ml-2 h-4 w-4" />
          <span className="ml-2">Status</span>
        </span>
      ),
      cell: (info) => (
        <p
          className={`capitalize  ${
            info.getValue<string>() === "ACTIVE"
              ? " text-purple-600"
              : " text-red-600"
          } `}
        >
          {info.getValue<string>().toLocaleLowerCase()}
        </p>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const user = row.original;
        const isActive = user.status === "ACTIVE";

        if (!isAdmin) {
          return <div className="text-sm text-gray-500">No permissions</div>;
        }

        return (
          <div className="flex items-center space-x-2">
            {isActive ? (
              <Button
                onClick={() => onDeactivate?.(user)}
                className="text-white hover:bg-red-500 rounded-sm cursor-pointer bg-red-600 border-2 px-3 py-1 text-sm"
              >
                Deactivate
              </Button>
            ) : (
              <Button
                onClick={() => onActivate?.(user)}
                className=" bg-purple-600 hover:bg-purple-700 rounded-sm cursor-pointer text-white px-3 py-1 text-sm"
              >
                Activate
              </Button>
            )}
          </div>
        );
      },
    },
  ];
}

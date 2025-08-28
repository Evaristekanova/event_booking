// todoColumns.tsx
import { type ColumnDef } from "@tanstack/react-table";
import { ActionsCell } from "@/app/components/table/ActionCell";
import { LuArrowUpDown } from "react-icons/lu";
import { Event as EventType } from "../../../_services/eventServiceApi";

export function EventColumns(
  onView?: (event: EventType) => void,
  onEdit?: (event: EventType) => void,
  isAdmin: boolean = false
): ColumnDef<EventType, unknown>[] {
  return [
    {
      accessorKey: "title",
      cell: (info) => <span>{info.getValue<string>()}</span>,
      header: ({ column }) => (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <LuArrowUpDown className="ml-2 h-4 w-4" />
          <span className="ml-2">Title</span>
        </span>
      ),
    },
    {
      accessorKey: "location",
      cell: (info) => <p>{info.getValue<string>()}</p>,

      header: () => <span className="flex items-center">Location</span>,
    },
    {
      accessorKey: "date",
      cell: (info) => (
        <p>{new Date(info.getValue<string>()).toLocaleDateString()}</p>
      ),
      header: () => <span className="flex items-center">Date</span>,
    },
    {
      accessorKey: "status",
      cell: (info) => (
        <p
          className={`
            ${
              info.getValue<string>() === "UPCOMING"
                ? "bg-green-600  text-white"
                : "bg-red-1 text-white"
            } opacity-80 rounded-md px-2 py-1 grid place-items-center
            `}
        >
          {info.getValue<string>()}
        </p>
      ),
      header: ({ column }) => (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <LuArrowUpDown className="ml-2 h-4 w-4" />
          <span className="ml-2">Status</span>
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const event = row.original;

        return (
          <ActionsCell
            id={event.id}
            onView={() => onView?.(event)}
            onEdit={isAdmin ? () => onEdit?.(event) : undefined}
          />
        );
      },
    },
  ];
}

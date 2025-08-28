// bookingColumns.tsx
import { type ColumnDef } from "@tanstack/react-table";
import { LuArrowUpDown } from "react-icons/lu";
import { type Booking } from "@/app/_services/bookingServiceApi";

export function BookingColumns(
  onView: (booking: Booking) => void
): ColumnDef<Booking, unknown>[] {
  return [
    {
      id: "eventTitle",
      accessorFn: (row) => row.event.title,
      cell: (info) => <span>{info.getValue<string>()}</span>,
      header: ({ column }) => (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <LuArrowUpDown className="ml-2 h-4 w-4" />
          <span className="ml-2">Event Title</span>
        </span>
      ),
    },
    {
      accessorKey: "event.location",
      cell: (info) => <p>{info.getValue<string>()}</p>,
      header: () => <span className="flex items-center">Location</span>,
    },
    {
      accessorKey: "bookingDate",
      cell: (info) => (
        <p>{new Date(info.getValue<string>()).toLocaleDateString()}</p>
      ),
      header: ({ column }) => (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <LuArrowUpDown className="ml-2 h-4 w-4" />
          <span className="ml-2">Booking Date</span>
        </span>
      ),
    },
    {
      accessorKey: "event.time",
      cell: (info) => <p>{info.getValue<string>()}</p>,
      header: () => <span className="flex items-center">Event Time</span>,
    },
    {
      accessorKey: "status",
      cell: (info) => (
        <p
          className={`${
            info.getValue<string>() === "PENDING"
              ? "text-yellow-500"
              : info.getValue<string>() === "CONFIRMED"
              ? "text-green-500"
              : info.getValue<string>() === "CANCELLED"
              ? "text-red-500"
              : "text-gray-500"
          } capitalize`}
        >
          {info.getValue<string>()}
        </p>
      ),
      header: () => <span className="flex items-center">Status</span>,
    },
  ];
}

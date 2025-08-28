// bookingColumns.tsx
import { type ColumnDef } from "@tanstack/react-table";
import { LuArrowUpDown } from "react-icons/lu";
import { type Booking } from "@/types";

export function BookingColumns(): ColumnDef<Booking, unknown>[] {
  return [
    {
      id: "eventTitle",
      accessorFn: (row) => row.event?.title,
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
      accessorKey: "eventDate",
      accessorFn: (row) => row.event?.date,
      cell: (info) => (
        <p>{new Date(info.getValue<string>()).toLocaleDateString()}</p>
      ),
      header: ({ column }) => (
        <span
          className="flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <LuArrowUpDown className="ml-2 h-4 w-4" />
          <span className="ml-2">Event Date</span>
        </span>
      ),
    },
    {
      accessorKey: "event.time",
      cell: (info) => (
        <p>{`${info.getValue<string>()} ${
          Number(info.getValue<string>().split(":")[0]) > 11 ? "PM" : "AM"
        }`}</p>
      ),
      header: () => <span className="flex items-center">Event Time</span>,
    },
  ];
}

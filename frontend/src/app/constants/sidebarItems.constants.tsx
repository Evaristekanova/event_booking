import { MdDashboard, MdEvent } from "react-icons/md";
import { LuCalendar } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { FaBook } from "react-icons/fa";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

export const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <MdDashboard size={20} />,
  },
  {
    label: "Events",
    href: "/dashboard/events",
    icon: <MdEvent size={20} />,
  },
  {
    label: "Calendar",
    href: "/dashboard/calendar",
    icon: <LuCalendar size={20} />,
  },
  {
    label: "Bookings",
    href: "/dashboard/bookings",
    icon: <FaBook size={20} />,
  },
  // Admin-only items
  {
    label: "Users",
    href: "/dashboard/users",
    icon: <LuUsers size={20} />,
    adminOnly: true,
  },
];

export default navItems;

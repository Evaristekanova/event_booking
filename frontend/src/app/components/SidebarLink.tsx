import { NavItem } from "@/app/constants/sidebarItems.constants";
import Link from "next/link";

export default function SidebarLink({
  item,
  isActive,
  setSidebarOpen,
}: {
  item: NavItem;
  isActive: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  return (
    <li key={item.href}>
      <Link
        href={item.href}
        className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
          isActive
            ? "bg-purple-100 text-purple-700"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <span className="mr-3">{item.icon}</span>
        {item.label}
      </Link>
    </li>
  );
}

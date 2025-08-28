import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useOutsideClick } from "@/app/hooks/useClickOutside";

interface ActionsCellProps {
  id: string;
  onView: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ActionsCell({
  id,
  onView,
  onEdit,
  onDelete,
}: ActionsCellProps) {
  const [open, setOpen] = useState(false);

  const ref = useOutsideClick(() => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded hover:bg-gray-200 hover:cursor-pointer"
      >
        <BsThreeDotsVertical size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
          <button
            onClick={() => {
              onView(id);
              setOpen(false);
            }}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            View
          </button>

          {onEdit && (
            <button
              onClick={() => {
                onEdit(id);
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => {
                onDelete(id);
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}

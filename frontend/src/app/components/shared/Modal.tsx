import { type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImCross } from "react-icons/im";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
}: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              {title && <h2 className="text-lg font-semibold">{title}</h2>}
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <ImCross size={16} />
              </button>
            </div>

            <div className="mb-4 overflow-y-auto max-h-[80vh]">{children}</div>

            {/* Footer */}
            {footer && (
              <div className="mt-4 flex gap-4 justify-end">{footer}</div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

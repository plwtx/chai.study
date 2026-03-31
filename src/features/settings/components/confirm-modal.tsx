import { Download, AlertTriangle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type ConfirmModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => Promise<void>;
  downloadAction?: () => Promise<void>;
};

export default function ConfirmModal({
  open,
  onClose,
  title,
  description,
  confirmLabel = "Delete",
  onConfirm,
  downloadAction,
}: ConfirmModalProps) {
  if (!open) return null;

  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  const handleDownload = async () => {
    await downloadAction?.();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-brown-50 dark:bg-dark-600 border-brown-200 dark:border-dark-600 mx-4 w-full max-w-md rounded-xl border p-6 shadow-lg"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center gap-3">
              <AlertTriangle className="size-5 stroke-red-500" />
              <h3 className="text-brown-900 dark:text-dark-100 text-base font-medium">
                {title}
              </h3>
            </div>
            <p className="text-brown-700 dark:text-dark-100/70 mb-6 text-sm">
              {description}
            </p>
            <div className="flex items-center justify-end gap-3">
              {downloadAction && (
                <button
                  onClick={handleDownload}
                  className="border-brown-200 dark:border-dark-600 dark:bg-dark-900/45 dark:text-dark-100 bg-brown-100 hover:bg-brown-200/55 flex cursor-pointer items-center justify-center gap-3 rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-150 active:scale-95 hover:dark:bg-black/50"
                >
                  <Download className="size-4" />
                  Download
                </button>
              )}
              <button
                onClick={onClose}
                className="border-brown-200 dark:border-dark-600 dark:bg-dark-900/45 dark:text-dark-100 bg-brown-100 hover:bg-brown-200/55 cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-150 active:scale-95 hover:dark:bg-black/50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="cursor-pointer rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-all duration-150 hover:bg-red-100 active:scale-95 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300 dark:hover:bg-red-950"
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

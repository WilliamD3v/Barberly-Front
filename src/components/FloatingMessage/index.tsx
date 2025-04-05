"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface FloatingMessageProps {
  message: string;
  show: boolean;
  duration?: number;
  onClose: () => void;
  type?: string;
}

export const FloatingMessage = ({
  message,
  show,
  duration = 5000,
  onClose,
  type = "success", // 👈 padrão
}: FloatingMessageProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  const bgColor = type === "error" ? "bg-red-500" : "bg-green-500";

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.4 }}
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-6 py-3 rounded-xl shadow-lg z-50`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-background w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl border border-primary/10 overflow-hidden flex flex-col pointer-events-auto"
            >
               {/* Header */}
               <div className="px-6 py-4 border-b border-primary/5 flex items-center justify-between bg-card/50">
                  <h3 className="text-xl font-bold text-primary truncate pr-4">{title}</h3>
                  <button 
                    onClick={onClose}
                    className="p-2 hover:bg-primary/10 rounded-full transition-colors text-muted hover:text-primary"
                  >
                    <X size={20} />
                  </button>
               </div>
               
               {/* Scrollable Content */}
               <div className="p-6 overflow-y-auto custom-scrollbar">
                 {children}
               </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;

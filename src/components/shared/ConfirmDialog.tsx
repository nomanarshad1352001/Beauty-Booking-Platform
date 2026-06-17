import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Dialog, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  variant?: 'destructive' | 'default';
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  variant = 'destructive',
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, delay: 0.1 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/50 mb-4"
        >
          <AlertTriangle className="h-7 w-7 text-red-500" />
        </motion.div>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </div>
      <div className="flex justify-center gap-3 mt-6">
        <Button variant="outline" onClick={onClose} className="rounded-xl min-w-[100px]">
          Cancel
        </Button>
        <Button
          variant={variant}
          onClick={() => { onConfirm(); onClose(); }}
          className="rounded-xl min-w-[100px]"
        >
          {confirmLabel}
        </Button>
      </div>
    </Dialog>
  );
}

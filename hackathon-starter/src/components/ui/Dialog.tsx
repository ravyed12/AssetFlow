"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/cn";

import { Button } from "./Button";

const dialogSizes = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
} as const;

export interface DialogProps {
  children: React.ReactNode;
  className?: string;
  closeLabel?: string;
  description?: React.ReactNode;
  dismissible?: boolean;
  footer?: React.ReactNode;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  size?: keyof typeof dialogSizes;
  title: React.ReactNode;
}

function Dialog({
  children,
  className,
  closeLabel = "Close dialog",
  description,
  dismissible = true,
  footer,
  onOpenChange,
  open,
  size = "md",
  title,
}: DialogProps) {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const titleId = React.useId();
  const descriptionId = React.useId();

  React.useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-describedby={description ? descriptionId : undefined}
      aria-labelledby={titleId}
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none bg-transparent p-4 backdrop:bg-zinc-950/50"
      onCancel={(event) => {
        event.preventDefault();
        if (dismissible) {
          onOpenChange(false);
        }
      }}
      onClick={(event) => {
        if (dismissible && event.target === event.currentTarget) {
          onOpenChange(false);
        }
      }}
      onClose={() => {
        if (open) {
          onOpenChange(false);
        }
      }}
    >
      <div
        className={cn(
          "mx-auto w-full rounded-xl border border-zinc-200 bg-white p-6 text-zinc-950 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50",
          dialogSizes[size],
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 id={titleId} className="text-lg font-semibold">
              {title}
            </h2>
            {description ? (
              <p
                id={descriptionId}
                className="text-sm text-zinc-500 dark:text-zinc-400"
              >
                {description}
              </p>
            ) : null}
          </div>
          {dismissible ? (
            <Button
              aria-label={closeLabel}
              className="-mr-2 -mt-2 shrink-0"
              size="icon"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              <X aria-hidden="true" />
            </Button>
          ) : null}
        </div>
        <div className="mt-6">{children}</div>
        {footer ? (
          <div className="mt-6 flex flex-wrap justify-end gap-2 border-t border-zinc-100 pt-4 dark:border-zinc-900">
            {footer}
          </div>
        ) : null}
      </div>
    </dialog>
  );
}

export { Dialog };

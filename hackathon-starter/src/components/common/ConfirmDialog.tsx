"use client";

import * as React from "react";

import { Button, type ButtonProps } from "../ui/Button";
import { Dialog, type DialogProps } from "../ui/Dialog";
import { Spinner } from "../ui/Spinner";

export interface ConfirmDialogProps
  extends Omit<DialogProps, "footer"> {
  cancelLabel?: string;
  confirmLabel?: string;
  confirmVariant?: ButtonProps["variant"];
  isConfirming?: boolean;
  onConfirm: () => void;
}

function ConfirmDialog({
  cancelLabel = "Cancel",
  children,
  confirmLabel = "Confirm",
  confirmVariant = "destructive",
  isConfirming = false,
  onConfirm,
  onOpenChange,
  open,
  ...props
}: ConfirmDialogProps) {
  return (
    <Dialog
      footer={
        <>
          <Button
            disabled={isConfirming}
            variant="ghost"
            onClick={() => onOpenChange(false)}
          >
            {cancelLabel}
          </Button>
          <Button disabled={isConfirming} variant={confirmVariant} onClick={onConfirm}>
            {isConfirming ? <Spinner className="-ml-1 mr-1" size="sm" /> : null}
            {confirmLabel}
          </Button>
        </>
      }
      onOpenChange={onOpenChange}
      open={open}
      {...props}
    >
      {children}
    </Dialog>
  );
}

export { ConfirmDialog };

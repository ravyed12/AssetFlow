import * as React from "react";
import { AlertCircle } from "lucide-react";

import { cn } from "@/lib/cn";

import { Alert, AlertDescription, AlertTitle } from "../ui/Alert";

export interface ErrorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  action?: React.ReactNode;
  message?: React.ReactNode;
  title?: React.ReactNode;
}

function ErrorView({
  action,
  className,
  message = "Something went wrong. Please try again.",
  title = "Unable to load content",
  ...props
}: ErrorProps) {
  return (
    <div className={className} {...props}>
      <Alert variant="destructive">
        <div className="flex items-start gap-3">
          <AlertCircle
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-current"
          />
          <div className="flex-1 space-y-2">
            <div className={cn("space-y-1", action && "pr-2")}>
              <AlertTitle>{title}</AlertTitle>
              {message ? <AlertDescription>{message}</AlertDescription> : null}
            </div>
            {action ? <div>{action}</div> : null}
          </div>
        </div>
      </Alert>
    </div>
  );
}

export { ErrorView as Error };

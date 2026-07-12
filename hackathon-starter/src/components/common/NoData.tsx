import * as React from "react";

import { EmptyState, type EmptyStateProps } from "./EmptyState";

export interface NoDataProps
  extends Omit<EmptyStateProps, "description" | "title"> {
  description?: React.ReactNode;
  title?: React.ReactNode;
}

function NoData({
  description = "There is nothing to display right now.",
  title = "No data available",
  ...props
}: NoDataProps) {
  return (
    <EmptyState
      description={description}
      title={title}
      className="px-4 py-8"
      {...props}
    />
  );
}

export { NoData };

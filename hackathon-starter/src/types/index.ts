/**
 * Reusable type definitions for Hackathon Starter Kit
 */

// Generic type to make any value nullable
export type Nullable<T> = T | null;

// Core Theme type options
export type Theme = "light" | "dark" | "system";

// Reusable standard query parameters representation
export type SearchParams = {
  [key: string]: string | string[] | undefined;
};

// Generic structure for Server Action responses
export type ActionResponse<T = undefined> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
};

// Generic structure for standard API Route responses
export type ApiResponse<T = undefined> = {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
};

// Generic wrapper for paginated database / API outputs
export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/cn";

import { Button, buttonVariants } from "./Button";

type PaginationEntry =
  | { type: "ellipsis"; key: string }
  | { type: "page"; value: number };

function buildEntries(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
): PaginationEntry[] {
  const pages = new Set<number>([1, totalPages]);

  for (
    let page = currentPage - siblingCount;
    page <= currentPage + siblingCount;
    page += 1
  ) {
    if (page >= 1 && page <= totalPages) {
      pages.add(page);
    }
  }

  const sortedPages = Array.from(pages).sort((a, b) => a - b);
  const entries: PaginationEntry[] = [];

  sortedPages.forEach((page, index) => {
    const previousPage = sortedPages[index - 1];

    if (previousPage !== undefined && page - previousPage > 1) {
      if (page - previousPage === 2) {
        entries.push({ type: "page", value: previousPage + 1 });
      } else {
        entries.push({ type: "ellipsis", key: `${previousPage}-${page}` });
      }
    }

    entries.push({ type: "page", value: page });
  });

  return entries;
}

function buildHref(template: string, page: number) {
  return template.replace("{page}", String(page));
}

export interface PaginationProps extends React.HTMLAttributes<HTMLElement> {
  hrefTemplate?: string;
  onPageChange?: (page: number) => void;
  page: number;
  siblingCount?: number;
  totalPages: number;
}

function Pagination({
  className,
  hrefTemplate,
  onPageChange,
  page,
  siblingCount = 1,
  totalPages,
  ...props
}: PaginationProps) {
  const safeTotalPages = Math.max(1, totalPages);
  const currentPage = Math.min(Math.max(1, page), safeTotalPages);
  const entries = buildEntries(currentPage, safeTotalPages, siblingCount);

  function renderPageControl(targetPage: number, label: React.ReactNode) {
    const disabled = targetPage < 1 || targetPage > safeTotalPages;

    if (hrefTemplate && !disabled) {
      return (
        <a
          className={buttonVariants({ size: "sm", variant: "outline" })}
          href={buildHref(hrefTemplate, targetPage)}
        >
          {label}
        </a>
      );
    }

    if (hrefTemplate && disabled) {
      return (
        <span
          aria-disabled="true"
          className={cn(
            buttonVariants({ size: "sm", variant: "outline" }),
            "pointer-events-none opacity-50",
          )}
        >
          {label}
        </span>
      );
    }

    return (
      <Button
        disabled={disabled}
        size="sm"
        variant="outline"
        onClick={() => onPageChange?.(targetPage)}
      >
        {label}
      </Button>
    );
  }

  return (
    <nav
      aria-label="Pagination"
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      {renderPageControl(
        currentPage - 1,
        <>
          <ChevronLeft aria-hidden="true" />
          <span>Previous</span>
        </>,
      )}
      {entries.map((entry) => {
        if (entry.type === "ellipsis") {
          return (
            <span
              key={entry.key}
              aria-hidden="true"
              className="inline-flex h-9 w-9 items-center justify-center text-zinc-500 dark:text-zinc-400"
            >
              <MoreHorizontal className="size-4" />
            </span>
          );
        }

        const isActive = entry.value === currentPage;
        const pageLabel = `Page ${entry.value}`;

        if (hrefTemplate) {
          return (
            <a
              key={entry.value}
              aria-current={isActive ? "page" : undefined}
              aria-label={pageLabel}
              className={cn(
                buttonVariants({
                  size: "sm",
                  variant: isActive ? "default" : "outline",
                }),
                "min-w-9",
              )}
              href={buildHref(hrefTemplate, entry.value)}
            >
              {entry.value}
            </a>
          );
        }

        return (
          <Button
            key={entry.value}
            aria-current={isActive ? "page" : undefined}
            aria-label={pageLabel}
            className="min-w-9"
            size="sm"
            variant={isActive ? "default" : "outline"}
            onClick={() => onPageChange?.(entry.value)}
          >
            {entry.value}
          </Button>
        );
      })}
      {renderPageControl(
        currentPage + 1,
        <>
          <span>Next</span>
          <ChevronRight aria-hidden="true" />
        </>,
      )}
    </nav>
  );
}

export { Pagination };

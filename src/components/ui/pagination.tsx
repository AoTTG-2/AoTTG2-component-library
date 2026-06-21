import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const pageLink = "inline-flex h-10 min-w-10 items-center justify-center gap-1 font-primary text-sm font-medium normal-case text-foreground transition-colors duration-150 ease-out hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-[current=page]:text-primary";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => <nav role="navigation" aria-label="pagination" className={cn("mx-auto flex w-full justify-center", className)} {...props} />;
const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(({ className, ...props }, ref) => <ul ref={ref} className={cn("flex flex-row items-center gap-3", className)} {...props} />);
PaginationContent.displayName = "PaginationContent";
const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => <li ref={ref} className={cn("", className)} {...props} />);
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = { isActive?: boolean; size?: "default" | "sm" | "lg" | "icon" | "account" | null } & React.ComponentProps<"a">;
const PaginationLink = ({ className, isActive, size: _size, ...props }: PaginationLinkProps) => (
  <a aria-current={isActive ? "page" : undefined} className={cn(pageLink, className)} {...props} />
);

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => <PaginationLink aria-label="Go to previous page" className={cn("pr-1", className)} {...props}><ChevronLeft className="h-4 w-4" /><span>Previous</span></PaginationLink>;
const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => <PaginationLink aria-label="Go to next page" className={cn("pl-1", className)} {...props}><span>Next</span><ChevronRight className="h-4 w-4" /></PaginationLink>;
const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => <span aria-hidden className={cn("flex h-10 min-w-10 items-center justify-center text-foreground", className)} {...props}><MoreHorizontal className="h-4 w-4" /><span className="sr-only">More pages</span></span>;

export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious };

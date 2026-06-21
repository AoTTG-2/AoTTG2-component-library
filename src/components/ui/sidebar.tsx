import { createContext, useContext, useState, type HTMLAttributes, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarContextValue = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const SidebarContext = createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("Sidebar components must be used inside <Sidebar>");
  return context;
}

type SidebarProps = HTMLAttributes<HTMLElement> & {
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
};

function Sidebar({ className, defaultCollapsed = false, onCollapsedChange, children, ...props }: SidebarProps) {
  const [collapsed, setCollapsedState] = useState(defaultCollapsed);
  const setCollapsed = (next: boolean) => {
    setCollapsedState(next);
    onCollapsedChange?.(next);
  };

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <aside
        data-collapsed={collapsed}
        className={cn(
          "aottg2-texture aottg2-texture-card flex h-full flex-col overflow-hidden shadow-lg transition-[width] duration-200 ease-out",
          collapsed ? "w-16" : "w-64",
          className,
        )}
        {...props}
      >
        {children}
      </aside>
    </SidebarContext.Provider>
  );
}

function SidebarHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { collapsed } = useSidebar();
  return <div className={cn("flex min-h-14 items-center gap-2 p-3 font-primary text-xl text-foreground", collapsed && "justify-center", className)} {...props} />;
}

function SidebarFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mt-auto p-3", className)} {...props} />;
}

function SidebarToggle({ className, ...props }: HTMLAttributes<HTMLButtonElement>) {
  const { collapsed, setCollapsed } = useSidebar();
  return (
    <button
      type="button"
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      aria-expanded={!collapsed}
      className={cn(
        "flex h-10 min-w-10 items-center justify-center text-foreground transition-[color,transform] duration-150 ease-out hover:text-primary active:scale-[0.96]",
        className,
      )}
      onClick={() => setCollapsed(!collapsed)}
      {...props}
    >
      <ChevronLeft className={cn("h-4 w-4 transition-transform duration-150 ease-out", collapsed && "rotate-180")} />
    </button>
  );
}

function SidebarSection({ className, title, children, ...props }: HTMLAttributes<HTMLDivElement> & { title?: ReactNode }) {
  const { collapsed } = useSidebar();
  return (
    <div className={cn("space-y-1 p-2", className)} {...props}>
      {title ? <div className={cn("px-2 pb-1 font-primary text-xs uppercase tracking-wide text-muted-foreground", collapsed && "sr-only")}>{title}</div> : null}
      {children}
    </div>
  );
}

type SidebarItemProps = HTMLAttributes<HTMLElement> & {
  active?: boolean;
  href?: string;
  icon?: ReactNode;
};

function SidebarItem({ className, active, href, icon, children, ...props }: SidebarItemProps) {
  const { collapsed } = useSidebar();
  const Comp = href ? "a" : "button";
  const fallback = typeof children === "string" ? children[0] : "•";

  return (
    <Comp
      {...(href ? { href } : { type: "button" })}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex h-10 min-w-10 w-full items-center gap-3 px-2 font-primary text-base text-foreground transition-[color,background-color,transform] duration-150 ease-out hover:text-primary active:scale-[0.96] aria-[current=page]:text-primary",
        collapsed && "justify-center px-0",
        className,
      )}
      {...props}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">{icon ?? fallback}</span>
      <span className={cn("truncate", collapsed && "sr-only")}>{children}</span>
    </Comp>
  );
}

function SidebarGroup({ className, title, icon, defaultOpen = true, children, ...props }: HTMLAttributes<HTMLDivElement> & { title: ReactNode; icon?: ReactNode; defaultOpen?: boolean }) {
  const { collapsed } = useSidebar();
  const [open, setOpen] = useState(defaultOpen);
  const fallback = typeof title === "string" ? title[0] : "•";

  return (
    <div className={cn("space-y-1", className)} {...props}>
      <button
        type="button"
        className={cn(
          "flex h-10 min-w-10 w-full items-center gap-3 px-2 font-primary text-base text-foreground transition-[color,background-color,transform] duration-150 ease-out hover:text-primary active:scale-[0.96]",
          collapsed && "justify-center px-0",
        )}
        aria-expanded={open && !collapsed}
        onClick={() => setOpen(!open)}
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center">{icon ?? fallback}</span>
        <span className={cn("truncate", collapsed && "sr-only")}>{title}</span>
        <ChevronRight className={cn("ml-auto h-4 w-4 transition-transform duration-150 ease-out", open && "rotate-90", collapsed && "hidden")} />
      </button>
      {open && !collapsed ? <div className="aottg2-stagger ml-5 border-l border-border/60 pl-2">{children}</div> : null}
    </div>
  );
}

export { Sidebar, SidebarFooter, SidebarGroup, SidebarHeader, SidebarItem, SidebarSection, SidebarToggle };

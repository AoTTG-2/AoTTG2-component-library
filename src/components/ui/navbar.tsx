import { useState, type ReactNode } from "react";
import NavbarLogo from "@/assets/images/aottg2-navbar-logo.webp";
import LogoDark from "@/assets/images/aottg2-logo-dark.png";
import LogoLight from "@/assets/images/aottg2-logo-light.webp";
import { cn } from "@/lib/utils";

export type NavbarItem = {
  label: ReactNode;
  href?: string;
  id?: string;
  active?: boolean;
};

export type NavbarProps = {
  items?: NavbarItem[];
  logo?: "navbar" | "dark" | "light" | "text";
  logoText?: string;
  fixed?: boolean;
  onLogoClick?: () => void;
  onItemSelect?: (item: NavbarItem) => void;
  className?: string;
};

const defaultItems: NavbarItem[] = [
  { label: "DEVBLOG", id: "devblog" },
  { label: "COMMUNITY", id: "community" },
  { label: "SUPPORT", id: "support" },
  { label: "CREDITS", id: "credits" },
  { label: "PLAY", id: "home" },
  { label: "LOGIN", href: "/login" },
];

const logos = {
  navbar: NavbarLogo,
  dark: LogoDark,
  light: LogoLight,
} as const;

export function Navbar({ items = defaultItems, logo = "navbar", logoText, fixed = false, onLogoClick, onItemSelect, className }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const selectItem = (item: NavbarItem) => {
    onItemSelect?.(item);
    setOpen(false);
  };

  const logoSrc = logo === "text" ? undefined : logos[logo];
  const textLogo = (logoText ?? "").toUpperCase();

  return (
    <nav className={cn(fixed && "fixed top-0", "z-50 w-full", className)}>
      <div className="aottg2-texture flex h-14 w-full items-center justify-between px-4 shadow-lg lg:h-16 lg:px-8">
        <button type="button" onClick={onLogoClick} className="min-w-0 shrink-0" aria-label="AoTTG 2 home">
          {logo === "text" ? (
            <span className="aottg2-text-logo font-primary text-lg leading-none tracking-wide sm:text-xl lg:text-2xl">
              <span className="aottg2-text-logo-part text-foreground" data-text="AoTTG">AoTTG</span>
              <span className="aottg2-text-logo-part aottg2-textured-text text-primary" data-text={textLogo}>{textLogo}</span>
            </span>
          ) : logo === "navbar" ? (
            <>
              <img src={NavbarLogo} className="h-7 w-auto object-contain dark:hidden lg:h-10" alt="AoTTG 2" decoding="async" />
              <img src={LogoLight} className="hidden h-7 w-auto object-contain dark:block lg:h-10" alt="AoTTG 2" decoding="async" />
            </>
          ) : (
            <img src={logoSrc} className="h-7 w-auto object-contain lg:h-10" alt="AoTTG 2" decoding="async" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="p-2 font-primary text-2xl leading-none text-foreground lg:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="aottg2-navbar-mobile-menu"
        >
          {open ? "×" : "☰"}
        </button>

        <div className="hidden flex-row gap-6 font-primary text-foreground lg:flex">
          {items.map((item, index) =>
            item.href ? (
              <a key={index} href={item.href} onClick={() => selectItem(item)} className={cn("transition-colors hover:text-primary", item.active && "text-primary")}>
                {item.label}
              </a>
            ) : (
              <button key={index} type="button" onClick={() => selectItem(item)} className={cn("transition-colors hover:text-primary", item.active && "text-primary")}>
                {item.label}
              </button>
            ),
          )}
        </div>
      </div>

      {open ? (
        <div id="aottg2-navbar-mobile-menu" className="grid border-t border-border bg-background font-primary text-foreground shadow-lg lg:hidden">
          {items.map((item, index) =>
            item.href ? (
              <a key={index} href={item.href} onClick={() => selectItem(item)} className="p-4 text-left transition-colors hover:bg-accent hover:text-accent-foreground">
                {item.label}
              </a>
            ) : (
              <button key={index} type="button" onClick={() => selectItem(item)} className="p-4 text-left transition-colors hover:bg-accent hover:text-accent-foreground">
                {item.label}
              </button>
            ),
          )}
        </div>
      ) : null}
    </nav>
  );
}

export { LogoDark as Aottg2LogoDark, LogoLight as Aottg2LogoLight, NavbarLogo as Aottg2NavbarLogo };

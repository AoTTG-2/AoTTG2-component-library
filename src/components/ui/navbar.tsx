import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
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
        <button type="button" onClick={onLogoClick} className="flex min-h-10 min-w-10 shrink-0 items-center transition-transform duration-150 ease-out active:scale-[0.96]" aria-label="AoTTG 2 home">
          {logo === "text" ? (
            <span className="aottg2-text-logo aottg2-emboss-text font-primary text-lg leading-none tracking-wide sm:text-xl lg:text-2xl">
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
          className="relative flex h-10 w-10 items-center justify-center font-primary text-2xl leading-none text-foreground transition-transform duration-150 ease-out active:scale-[0.96] lg:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="aottg2-navbar-mobile-menu"
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={open ? "close" : "open"}
              initial={{ opacity: 0, scale: 0.25, filter: "blur(2px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.25, filter: "blur(2px)" }}
              transition={{ type: "spring", duration: 0.18, bounce: 0 }}
            >
              {open ? "×" : "☰"}
            </motion.span>
          </AnimatePresence>
        </button>

        <div className="hidden flex-row gap-6 font-primary text-foreground lg:flex">
          {items.map((item, index) =>
            item.href ? (
              <a key={index} href={item.href} onClick={() => selectItem(item)} className={cn("transition-colors duration-150 ease-out hover:text-primary", item.active && "text-primary")}>
                {item.label}
              </a>
            ) : (
              <button key={index} type="button" onClick={() => selectItem(item)} className={cn("transition-colors duration-150 ease-out hover:text-primary", item.active && "text-primary")}>
                {item.label}
              </button>
            ),
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id="aottg2-navbar-mobile-menu"
            className="grid border-t border-border bg-background font-primary text-foreground shadow-lg lg:hidden"
            initial={{ opacity: 0, y: -6, filter: "blur(2px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
            transition={{ duration: 0.14, ease: "easeOut" }}
          >
            {items.map((item, index) =>
              item.href ? (
                <a key={index} href={item.href} onClick={() => selectItem(item)} className="p-4 text-left transition-[background-color,color] duration-150 ease-out hover:bg-accent hover:text-accent-foreground">
                  {item.label}
                </a>
              ) : (
                <button key={index} type="button" onClick={() => selectItem(item)} className="p-4 text-left transition-[background-color,color] duration-150 ease-out hover:bg-accent hover:text-accent-foreground">
                  {item.label}
                </button>
              ),
            )}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}

export { LogoDark as Aottg2LogoDark, LogoLight as Aottg2LogoLight, NavbarLogo as Aottg2NavbarLogo };

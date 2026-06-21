import { useState, type ReactNode } from "react";
import NavbarTexture from "@/assets/images/bg-light.webp";
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
      <div
        className="relative flex h-14 w-full items-center justify-between overflow-hidden px-4 shadow-lg md:h-16 md:px-8"
        style={{ backgroundImage: `url(${NavbarTexture})`, backgroundRepeat: "repeat-x", backgroundSize: "auto 100%", backgroundPosition: "center" }}
      >
        <button type="button" onClick={onLogoClick} className="shrink-0" aria-label="AoTTG 2 home">
          {logo === "text" ? (
            <span className="aottg2-text-logo font-primary text-xl leading-none tracking-wide md:text-2xl">
              <span className="aottg2-text-logo-part text-foreground" data-text="AoTTG">AoTTG</span>
              <span className="aottg2-text-logo-part text-primary" data-text={textLogo}>{textLogo}</span>
            </span>
          ) : logo === "navbar" ? (
            <>
              <img src={NavbarLogo} className="h-7 w-auto object-contain dark:hidden md:h-10" alt="AoTTG 2" decoding="async" />
              <img src={LogoLight} className="hidden h-7 w-auto object-contain dark:block md:h-10" alt="AoTTG 2" decoding="async" />
            </>
          ) : (
            <img src={logoSrc} className="h-7 w-auto object-contain md:h-10" alt="AoTTG 2" decoding="async" />
          )}
        </button>

        <button type="button" onClick={() => setOpen((value) => !value)} className="font-primary text-2xl text-foreground md:hidden" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open}>
          ☰
        </button>

        <div className="hidden flex-row gap-6 font-primary text-foreground md:flex">
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
        <div className="grid bg-neutral-950 font-primary text-white md:hidden">
          {items.map((item, index) =>
            item.href ? (
              <a key={index} href={item.href} onClick={() => selectItem(item)} className="p-4 text-left transition-colors hover:bg-white/10">
                {item.label}
              </a>
            ) : (
              <button key={index} type="button" onClick={() => selectItem(item)} className="p-4 text-left transition-colors hover:bg-white/10">
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

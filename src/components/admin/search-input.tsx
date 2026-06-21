import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, type InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchInputProps = InputProps & {
  onClear?: () => void;
};

export function SearchInput({ className, value, onClear, ...props }: SearchInputProps) {
  const hasValue = value != null && String(value).length > 0;

  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input className="pl-9 pr-10" value={value} {...props} />
      <AnimatePresence initial={false}>
        {hasValue && onClear ? (
          <motion.div
            className="absolute right-1 top-1"
            initial={{ opacity: 0, scale: 0.25, filter: "blur(2px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.25, filter: "blur(2px)" }}
            transition={{ type: "spring", duration: 0.18, bounce: 0 }}
          >
            <Button type="button" variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:bg-foreground/10 hover:text-foreground" onClick={onClear}>
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

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
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
      <Input className="pl-9 pr-10" value={value} {...props} />
      {hasValue && onClear ? (
        <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1 h-10 w-10 text-white hover:bg-white/10" onClick={onClear}>
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      ) : null}
    </div>
  );
}

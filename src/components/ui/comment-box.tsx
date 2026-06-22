import * as React from "react";
import { Bold, Code, Italic, Link, Strikethrough } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea, type TextareaProps } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type CommentBoxProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, "onChange" | "onSubmit"> & {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  onCancel?: () => void;
  placeholder?: string;
  submitLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  disabled?: boolean;
  preview?: boolean;
  textareaProps?: Omit<TextareaProps, "value" | "onChange" | "disabled" | "placeholder">;
  textareaClassName?: string;
  toolbarClassName?: string;
  previewClassName?: string;
  actionsClassName?: string;
  renderPreview?: (value: string) => React.ReactNode;
};

type InlineToken = {
  regex: RegExp;
  render: (match: RegExpExecArray, key: string) => React.ReactNode;
};

function safeHref(href: string) {
  const trimmed = href.trim();
  if (/^(https?:|mailto:)/i.test(trimmed)) return trimmed;
  return "#";
}

function renderInline(text: string): React.ReactNode[] {
  const tokens: InlineToken[] = [
    { regex: /^`([^`]+)`/, render: (match, key) => <code key={key} className="bg-muted px-1 py-0.5 font-mono text-[0.85em] text-foreground">{match[1]}</code> },
    { regex: /^\[([^\]]+)\]\(([^)]+)\)/, render: (match, key) => <a key={key} href={safeHref(match[2])} className="font-medium text-primary underline underline-offset-4" target="_blank" rel="noreferrer">{match[1]}</a> },
    { regex: /^\*\*([^*]+)\*\*/, render: (match, key) => <strong key={key} className="font-semibold text-foreground">{match[1]}</strong> },
    { regex: /^~~([^~]+)~~/, render: (match, key) => <del key={key}>{match[1]}</del> },
    { regex: /^\*([^*]+)\*/, render: (match, key) => <em key={key}>{match[1]}</em> },
  ];

  const nodes: React.ReactNode[] = [];
  let rest = text;
  let index = 0;

  while (rest.length) {
    const token = tokens.find((candidate) => candidate.regex.test(rest));
    if (token) {
      const match = token.regex.exec(rest);
      if (match) {
        nodes.push(token.render(match, `token-${index}`));
        rest = rest.slice(match[0].length);
        index += 1;
        continue;
      }
    }

    const nextSpecial = rest.slice(1).search(/[`*~\[]/) + 1;
    const end = nextSpecial > 0 ? nextSpecial : rest.length;
    nodes.push(rest.slice(0, end));
    rest = rest.slice(end);
    index += 1;
  }

  return nodes;
}

export function renderCommentMarkdown(value: string) {
  if (!value.trim()) return <span className="text-muted-foreground">Nothing to preview.</span>;

  return value.split(/\n{2,}/).map((paragraph, paragraphIndex) => (
    <p key={paragraphIndex} className="mb-2 last:mb-0">
      {paragraph.split("\n").map((line, lineIndex, lines) => (
        <React.Fragment key={lineIndex}>
          {renderInline(line)}
          {lineIndex < lines.length - 1 ? <br /> : null}
        </React.Fragment>
      ))}
    </p>
  ));
}

const tools = [
  { label: "Bold", icon: Bold, before: "**", after: "**", placeholder: "bold" },
  { label: "Italic", icon: Italic, before: "*", after: "*", placeholder: "italic" },
  { label: "Strikethrough", icon: Strikethrough, before: "~~", after: "~~", placeholder: "struck text" },
  { label: "Inline code", icon: Code, before: "`", after: "`", placeholder: "code" },
  { label: "Link", icon: Link, before: "[", after: "](https://example.com)", placeholder: "link" },
];

const CommentBox = React.forwardRef<HTMLFormElement, CommentBoxProps>(
  ({ value, onChange, onSubmit, onCancel, placeholder = "Write a comment...", submitLabel = "Comment", cancelLabel = "Cancel", disabled = false, preview = true, textareaProps, textareaClassName, toolbarClassName, previewClassName, actionsClassName, renderPreview, className, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    function insertMarkup(before: string, after: string, fallback: string) {
      const textarea = textareaRef.current;
      if (!textarea || disabled) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = value.slice(start, end) || fallback;
      const nextValue = `${value.slice(0, start)}${before}${selected}${after}${value.slice(end)}`;
      const nextStart = start + before.length;
      const nextEnd = nextStart + selected.length;

      onChange(nextValue);
      requestAnimationFrame(() => {
        textarea.focus();
        textarea.setSelectionRange(nextStart, nextEnd);
      });
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if (!disabled) onSubmit?.();
    }

    return (
      <form ref={ref} className={cn("rounded-none border border-border bg-card p-3 text-card-foreground shadow-sm", className)} onSubmit={handleSubmit} {...props}>
        <div className={cn("flex flex-wrap items-center gap-1 border border-input border-b-0 bg-muted/40 px-2 py-1", toolbarClassName)} aria-label="Comment formatting toolbar">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Button key={tool.label} type="button" variant="ghost" size="icon" static disabled={disabled} onClick={() => insertMarkup(tool.before, tool.after, tool.placeholder)} className="text-muted-foreground hover:bg-foreground/10 hover:text-foreground">
                <Icon className="h-4 w-4" />
                <span className="sr-only">{tool.label}</span>
              </Button>
            );
          })}
        </div>

        <Textarea
          ref={textareaRef}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          className={cn("min-h-28 resize-y border-t-0 focus-visible:ring-offset-0", textareaClassName)}
          onChange={(event) => onChange(event.target.value)}
          {...textareaProps}
        />

        {preview ? (
          <div className={cn("mt-3 border-l-2 border-primary/40 bg-muted/30 px-3 py-2 text-sm leading-6 text-foreground [text-wrap:pretty]", previewClassName)}>
            {renderPreview ? renderPreview(value) : renderCommentMarkdown(value)}
          </div>
        ) : null}

        <div className={cn("mt-3 flex justify-end gap-2", actionsClassName)}>
          {onCancel ? <Button type="button" variant="outline" disabled={disabled} onClick={onCancel}>{cancelLabel}</Button> : null}
          <Button type="submit" disabled={disabled}>{submitLabel}</Button>
        </div>
      </form>
    );
  },
);
CommentBox.displayName = "CommentBox";

export { CommentBox };

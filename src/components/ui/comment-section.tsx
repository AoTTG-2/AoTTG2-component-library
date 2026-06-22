import * as React from "react";
import { CornerUpLeft, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type CommentAction = {
  label: React.ReactNode;
  onSelect?: () => void;
  destructive?: boolean;
};

export type CommentAuthor = {
  name: React.ReactNode;
  avatarUrl?: string;
  fallback?: React.ReactNode;
};

export type CommentItem = {
  id: string;
  author?: CommentAuthor;
  createdAt?: React.ReactNode;
  editedAt?: React.ReactNode;
  body?: React.ReactNode;
  deleted?: boolean;
  actions?: CommentAction[];
  replies?: CommentItem[];
};

export type CommentSectionProps = React.HTMLAttributes<HTMLDivElement> & {
  comments: CommentItem[];
  empty?: React.ReactNode;
  renderBody?: (comment: CommentItem) => React.ReactNode;
  renderMeta?: (comment: CommentItem) => React.ReactNode;
  renderActions?: (comment: CommentItem) => React.ReactNode;
};

function getFallback(author?: CommentAuthor) {
  if (author?.fallback) return author.fallback;
  if (typeof author?.name === "string" && author.name.trim()) return author.name.trim().slice(0, 2).toUpperCase();
  return "?";
}

function isReplyAction(action: CommentAction) {
  return typeof action.label === "string" && action.label.trim().toLowerCase() === "reply";
}

function CommentActions({ comment, actions, renderActions }: { comment: CommentItem; actions?: CommentAction[]; renderActions?: (comment: CommentItem) => React.ReactNode }) {
  if (renderActions) return <>{renderActions(comment)}</>;
  if (!actions?.length) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-foreground/10 hover:text-foreground">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open comment actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((action, index) => (
          <DropdownMenuItem key={index} onSelect={action.onSelect} className={action.destructive ? "text-destructive" : undefined}>
            {action.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function CommentMeta({ comment, renderMeta }: { comment: CommentItem; renderMeta?: (comment: CommentItem) => React.ReactNode }) {
  if (renderMeta) return <>{renderMeta(comment)}</>;

  if (comment.deleted) {
    return <span className="inline-flex items-center font-medium italic leading-none text-muted-foreground">Deleted comment</span>;
  }

  return (
    <>
      <span className="inline-flex items-center font-primary text-sm font-semibold uppercase leading-none text-foreground">{comment.author?.name ?? "Unknown scout"}</span>
      {comment.createdAt ? <span className="inline-flex items-center leading-none text-muted-foreground">{comment.createdAt}</span> : null}
      {comment.editedAt ? <span className="inline-flex items-center leading-none text-muted-foreground">edited {comment.editedAt}</span> : null}
    </>
  );
}

function CommentBody({ comment, renderBody }: { comment: CommentItem; renderBody?: (comment: CommentItem) => React.ReactNode }) {
  if (comment.deleted) {
    return <p className="italic text-muted-foreground">This comment was deleted.</p>;
  }

  return <div className="text-foreground [text-wrap:pretty]">{renderBody ? renderBody(comment) : comment.body}</div>;
}

function CommentRow({ comment, isReply = false, renderBody, renderMeta, renderActions }: { comment: CommentItem; isReply?: boolean; renderBody?: (comment: CommentItem) => React.ReactNode; renderMeta?: (comment: CommentItem) => React.ReactNode; renderActions?: (comment: CommentItem) => React.ReactNode }) {
  const replies = isReply ? [] : (comment.replies ?? []);
  const replyAction = !comment.deleted && !renderActions ? comment.actions?.find(isReplyAction) : undefined;
  const menuActions = replyAction ? comment.actions?.filter((action) => action !== replyAction) : comment.actions;

  return (
    <article className={cn("group/comment relative", isReply && "border-l-4 border-primary pl-4")}>
      <div className={cn("py-3", comment.deleted && "opacity-80")}>
        <div className="flex min-h-10 items-center gap-3">
          <Avatar className={cn("h-9 w-9", comment.deleted && "opacity-50 grayscale")}>
            {comment.author?.avatarUrl && !comment.deleted ? <AvatarImage src={comment.author.avatarUrl} alt={typeof comment.author.name === "string" ? comment.author.name : "Comment author"} /> : null}
            <AvatarFallback className={comment.deleted ? "bg-muted text-muted-foreground" : undefined}>{getFallback(comment.author)}</AvatarFallback>
          </Avatar>

          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1 text-sm leading-none">
            <CommentMeta comment={comment} renderMeta={renderMeta} />
          </div>

          <div className="flex shrink-0 items-center gap-1">
            {replyAction ? (
              <TooltipProvider delayDuration={150}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:bg-transparent hover:text-primary" onClick={replyAction.onSelect}>
                      <CornerUpLeft className="h-4 w-4" />
                      <span className="sr-only">{replyAction.label}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reply</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : null}
            <CommentActions comment={comment} actions={menuActions} renderActions={renderActions} />
          </div>
        </div>

        <div className="mt-2 text-sm leading-6">
          <CommentBody comment={comment} renderBody={renderBody} />
        </div>
      </div>

      {replies.length ? (
        <div className="space-y-1 pb-1">
          {replies.map((reply) => (
            <CommentRow key={reply.id} comment={reply} isReply renderBody={renderBody} renderMeta={renderMeta} renderActions={renderActions} />
          ))}
        </div>
      ) : null}
    </article>
  );
}

const CommentSection = React.forwardRef<HTMLDivElement, CommentSectionProps>(({ comments, empty = "No comments yet.", renderBody, renderMeta, renderActions, className, ...props }, ref) => (
  <section ref={ref} className={cn("rounded-none border border-border bg-card p-4 text-card-foreground shadow-sm", className)} {...props}>
    {comments.length ? (
      <div className="divide-y divide-border/70">
        {comments.map((comment) => (
          <CommentRow key={comment.id} comment={comment} renderBody={renderBody} renderMeta={renderMeta} renderActions={renderActions} />
        ))}
      </div>
    ) : (
      <div className="flex min-h-24 items-center justify-center text-sm text-muted-foreground">{empty}</div>
    )}
  </section>
));
CommentSection.displayName = "CommentSection";

export { CommentSection };

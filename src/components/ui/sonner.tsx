import { Toaster as Sonner, toast, type ToasterProps } from "sonner";
import { cn } from "@/lib/utils";

const Toaster = ({ className, closeButton = true, position = "bottom-center", toastOptions, ...props }: ToasterProps) => {
  const classNames = toastOptions?.classNames;

  return (
    <Sonner
      className={cn("aottg2-sonner", className)}
      closeButton={closeButton}
      gap={10}
      position={position}
      toastOptions={{
        ...toastOptions,
        classNames: {
          toast: cn("aottg2-toast aottg2-texture", classNames?.toast),
          title: cn("aottg2-toast-title", classNames?.title),
          description: cn("aottg2-toast-description", classNames?.description),
          icon: cn("aottg2-toast-icon", classNames?.icon),
          actionButton: cn("aottg2-toast-action", classNames?.actionButton),
          cancelButton: cn("aottg2-toast-cancel", classNames?.cancelButton),
          closeButton: cn("aottg2-toast-close", classNames?.closeButton),
          success: cn("aottg2-toast-success", classNames?.success),
          error: cn("aottg2-toast-error", classNames?.error),
          warning: cn("aottg2-toast-warning", classNames?.warning),
          info: cn("aottg2-toast-info", classNames?.info),
          loading: cn("aottg2-toast-loading", classNames?.loading),
          default: cn("aottg2-toast-default", classNames?.default),
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
export type { ToasterProps };

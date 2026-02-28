import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const emptyStateVariants = cva(
  "flex flex-col items-center justify-center text-center",
  {
    variants: {
      size: {
        sm: "py-6 px-4 gap-2 [&_.empty-state-icon>svg]:h-8 [&_.empty-state-icon>svg]:w-8 [&_.empty-state-title]:text-base [&_.empty-state-description]:text-xs",
        default:
          "py-10 px-6 gap-3 [&_.empty-state-icon>svg]:h-10 [&_.empty-state-icon>svg]:w-10 [&_.empty-state-title]:text-lg [&_.empty-state-description]:text-sm",
        lg: "py-16 px-8 gap-4 [&_.empty-state-icon>svg]:h-16 [&_.empty-state-icon>svg]:w-16 [&_.empty-state-title]:text-xl [&_.empty-state-description]:text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface EmptyStateProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof emptyStateVariants> {}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(emptyStateVariants({ size, className }))}
      {...props}
    />
  )
);
EmptyState.displayName = "EmptyState";

const EmptyStateIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("empty-state-icon text-muted-foreground", className)}
    {...props}
  />
));
EmptyStateIcon.displayName = "EmptyStateIcon";

const EmptyStateTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("empty-state-title text-foreground font-semibold", className)}
    {...props}
  />
));
EmptyStateTitle.displayName = "EmptyStateTitle";

const EmptyStateDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "empty-state-description text-muted-foreground max-w-sm",
      className
    )}
    {...props}
  />
));
EmptyStateDescription.displayName = "EmptyStateDescription";

const EmptyStateAction = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mt-4", className)} {...props} />
));
EmptyStateAction.displayName = "EmptyStateAction";

export {
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateAction,
  emptyStateVariants,
};

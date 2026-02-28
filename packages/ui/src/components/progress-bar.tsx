import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const progressBarVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      size: {
        sm: "h-2",
        default: "h-3",
        lg: "h-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const progressBarIndicatorVariants = cva(
  "h-full w-full flex-1 rounded-full transition-all duration-500 ease-in-out",
  {
    variants: {
      variant: {
        default: "bg-primary",
        success: "bg-green-500 dark:bg-green-400",
        warning: "bg-amber-500 dark:bg-amber-400",
        info: "bg-blue-500 dark:bg-blue-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ProgressBarProps
  extends
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressBarVariants>,
    VariantProps<typeof progressBarIndicatorVariants> {
  /** Optional visible label text (e.g. "75%") */
  label?: string;
}

const ProgressBar = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>,
  ProgressBarProps
>(({ className, value, variant, size, label, ...props }, ref) => {
  const clampedValue = Math.min(100, Math.max(0, value ?? 0));

  return (
    <div className="w-full">
      {label && (
        <span className="text-foreground mb-1 block text-sm font-medium">
          {label}
        </span>
      )}
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(progressBarVariants({ size }), className)}
        value={clampedValue}
        aria-label={label}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(progressBarIndicatorVariants({ variant }))}
          style={{ transform: `translateX(-${100 - clampedValue}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
});
ProgressBar.displayName = "ProgressBar";

export { ProgressBar, progressBarVariants, progressBarIndicatorVariants };

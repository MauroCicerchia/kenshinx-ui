import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Flame } from "lucide-react";

import { cn } from "../lib/utils";

const streakVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap",
  {
    variants: {
      intensity: {
        inactive:
          "text-muted-foreground font-normal [&>svg]:text-muted-foreground",
        active:
          "text-foreground font-bold [&>svg]:text-orange-500 dark:[&>svg]:text-orange-400",
        hot: "text-foreground font-extrabold [&>svg]:text-red-500 dark:[&>svg]:text-red-400 [&>svg]:animate-pulse",
      },
      size: {
        sm: "gap-1 text-sm [&>svg]:h-4 [&>svg]:w-4 [&>span.streak-label]:text-xs",
        default:
          "gap-1.5 text-base [&>svg]:h-5 [&>svg]:w-5 [&>span.streak-label]:text-sm",
        lg: "gap-2 text-xl [&>svg]:h-7 [&>svg]:w-7 [&>span.streak-label]:text-base",
      },
    },
    defaultVariants: {
      intensity: "active",
      size: "default",
    },
  }
);

export interface StreakProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof streakVariants> {
  /** The current streak count */
  count: number;
  /** Optional label text displayed after the count (e.g., "day streak") */
  label?: string;
  /** Optional custom icon (defaults to Flame from lucide-react) */
  icon?: React.ReactNode;
  /** Count threshold at which the "hot" intensity activates (default: 7) */
  hotThreshold?: number;
}

const Streak = React.forwardRef<HTMLDivElement, StreakProps>(
  (
    {
      className,
      count,
      label,
      icon,
      hotThreshold = 7,
      intensity: intensityProp,
      size,
      ...props
    },
    ref
  ) => {
    // Derive intensity if not explicitly provided
    let intensity = intensityProp;
    if (!intensity) {
      if (count === 0) {
        intensity = "inactive";
      } else if (count >= hotThreshold) {
        intensity = "hot";
      } else {
        intensity = "active";
      }
    }

    return (
      <div
        ref={ref}
        className={cn(streakVariants({ intensity, size, className }))}
        {...props}
      >
        {icon || <Flame />}
        <span>{count}</span>
        {label && (
          <span className="streak-label text-muted-foreground font-normal">
            {label}
          </span>
        )}
      </div>
    );
  }
);
Streak.displayName = "Streak";

export { Streak, streakVariants };

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/utils";

const BottomNav = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    // ArrowLeft/ArrowRight movement between focusable children
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      const navElements = Array.from(
        e.currentTarget.querySelectorAll<HTMLButtonElement>(
          "button:not([disabled])"
        )
      );

      if (navElements.length === 0) return;

      const currentIndex = navElements.indexOf(
        document.activeElement as HTMLButtonElement
      );
      let nextIndex = 0;

      if (e.key === "ArrowLeft") {
        nextIndex =
          currentIndex <= 0 ? navElements.length - 1 : currentIndex - 1;
      } else if (e.key === "ArrowRight") {
        nextIndex =
          currentIndex === navElements.length - 1 ? 0 : currentIndex + 1;
      }

      navElements[nextIndex]?.focus();
    }
  };

  return (
    <nav
      ref={ref}
      role="navigation"
      onKeyDown={handleKeyDown}
      className={cn(
        "bg-background border-border fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full border-t",
        className
      )}
      {...props}
    />
  );
});
BottomNav.displayName = "BottomNav";

const bottomNavItemVariants = cva(
  "flex flex-1 flex-col items-center justify-center gap-1 py-1 px-2 text-[10px] sm:text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      isActive: {
        true: "text-primary [&_.bottom-nav-icon]:text-primary",
        false:
          "text-muted-foreground hover:text-foreground [&_.bottom-nav-icon]:text-muted-foreground hover:[&_.bottom-nav-icon]:text-foreground",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  }
);

export interface BottomNavItemProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof bottomNavItemVariants> {
  isActive?: boolean;
}

const BottomNavItem = React.forwardRef<HTMLButtonElement, BottomNavItemProps>(
  ({ className, isActive, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        aria-current={isActive ? "page" : undefined}
        className={cn(bottomNavItemVariants({ isActive, className }))}
        {...props}
      />
    );
  }
);
BottomNavItem.displayName = "BottomNavItem";

const BottomNavIcon = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      "bottom-nav-icon relative flex items-center justify-center transition-colors [&>svg]:h-5 [&>svg]:w-5",
      className
    )}
    {...props}
  />
));
BottomNavIcon.displayName = "BottomNavIcon";

const BottomNavLabel = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn("bottom-nav-label origin-bottom transition-all", className)}
    {...props}
  />
));
BottomNavLabel.displayName = "BottomNavLabel";

export {
  BottomNav,
  BottomNavItem,
  BottomNavIcon,
  BottomNavLabel,
  bottomNavItemVariants,
};

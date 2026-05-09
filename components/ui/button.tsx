import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-blue disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:  "bg-obsidian-overlay text-ink-primary border border-border-default hover:border-border-default hover:bg-obsidian-surface",
        run:      "bg-brand-green text-obsidian-base font-semibold hover:bg-brand-green/90",
        primary:  "bg-brand-blue text-obsidian-base font-semibold hover:bg-brand-blue/90",
        ghost:    "text-ink-muted hover:bg-obsidian-overlay hover:text-ink-primary",
        danger:   "text-brand-red hover:bg-brand-red/10 hover:text-brand-red",
        outline:  "border border-border-default bg-transparent text-ink-primary hover:bg-obsidian-overlay",
      },
      size: {
        default: "h-8 px-3 py-1.5",
        sm:      "h-7 px-2 text-xs",
        lg:      "h-9 px-4",
        icon:    "h-8 w-8",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

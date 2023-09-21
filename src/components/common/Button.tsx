import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/utils";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-secondary disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-primary data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-secondary",
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-slate-700  text-primary",
        danger:
          "bg-red-500 text-primary hover:bg-red-600 dark:hover:bg-red-600",

        ghost:
          "focus:ring-0 focus:ring-offset-0 ring-0  bg-transparent hover:bg-slate-100 dark:hover:bg-secondary text-primary data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

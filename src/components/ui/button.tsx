import { LucideIcon } from "lucide-react";
import * as React from "react";
import mergeClx from "../../libs/merge-clx";

const BUTTON_VARIANT = ["primary", "secondary", "outline", "ghost"] as const;

const BUTTON_SIZE = ["xs", "sm", "base", "lg"] as const;

type ButtonProps = {
  children: React.ReactNode;
  variant?: (typeof BUTTON_VARIANT)[number];
  size?: (typeof BUTTON_SIZE)[number];
  icon?: LucideIcon;
  iconClassName?: string;
} & React.ComponentPropsWithRef<"button">;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "base",
      icon: Icon,
      type = "button",
      iconClassName,
      ...rest
    },
    ref
  ) => {
    return (
      <button
        type={type}
        ref={ref}
        {...rest}
        className={mergeClx(
          "inline-flex items-center justify-center rounded-lg font-medium p-3",
          "focus:outline-none focus-visible:ring",
          "shadow-sm",
          "transition-colors duration-75",
          [
            size === "lg" && [
              "min-h-[2.75rem] min-w-[2.75rem] md:min-h-[3rem] md:min-w-[3rem]",
              "text-base",
            ],
            size === "base" && [
              "min-h-[2.25rem] min-w-[2.25rem] md:min-h-[2.5rem] md:min-w-[2.5rem]",
              "text-sm md:text-base",
            ],
            size === "sm" && [
              "min-h-[1.75rem] min-w-[1.75rem] md:min-h-[2rem] md:min-w-[2rem]",
              "text-xs md:text-sm",
            ],
            size === "xs" && ["p-1", "text-xs md:text-sm"],
          ],
          [
            variant === "primary" && [
              "bg-[#8362F2] text-white",
              "border border-primary-600",
              "hover:bg-primary-600 hover:text-white",
              "active:bg-primary-700",
              "disabled:bg-primary-700",
              "focus-visible:ring-primary-400",
            ],
            variant === "secondary" && [
              "bg-secondary-500 text-black",
              "border border-secondary-600",
              "hover:bg-secondary-600 hover:text-white",
              "active:bg-secondary-700",
              "disabled:bg-secondary-700",
              "focus-visible:ring-secondary-400",
            ],

            variant === "outline" && [
              "text-typo",
              "border border-gray-300",
              "hover:bg-light focus-visible:ring-primary-400 active:bg-typo-divider disabled:bg-typo-divider",
            ],
            variant === "ghost" && [
              "text-primary-500",
              "shadow-none",
              "hover:bg-primary-50 focus-visible:ring-primary-400 active:bg-primary-100 disabled:bg-primary-100",
            ],
          ],
          className
        )}
      >
        {Icon && <Icon size="1em" className={mergeClx(iconClassName)} />}
        {children}
      </button>
    );
  }
);

export default Button;

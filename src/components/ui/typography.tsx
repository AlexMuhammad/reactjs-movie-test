import * as React from "react";
import mergeClx from "../../libs/merge-clx";

const TypographyVariant = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
const TypographyColor = ["primary", "dark", "white", "danger"] as const;

export type TypographyProps<T extends React.ElementType> = {
  /** @default <p> tag */
  as?: T;
  className?: string;
  color?: (typeof TypographyColor)[number];
  variant?: (typeof TypographyVariant)[number];
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

export type TypographyComponent = <T extends React.ElementType = "p">(
  props: TypographyProps<T>
) => React.ReactNode | null;

export const Typography: TypographyComponent = React.forwardRef(
  <T extends React.ElementType = "p">(
    {
      as,
      children,
      className,
      color = "primary",
      variant = "h1",
      ...rest
    }: TypographyProps<T>,
    ref?: React.ComponentPropsWithRef<T>["ref"]
  ) => {
    const Component = as || "p";
    return (
      <Component
        ref={ref}
        className={mergeClx(
          [
            variant === "h1" && ["font-bnv-bold text-4xl md:text-7xl"],
            variant === "h2" && ["font-bnv-medium md:text-3xl"],
            variant === "h3" && ["font-bnv-medium text-lg"],
            variant === "h4" && ["font-bnv-regular text-lg"],
            variant === "h5" && [
              "font-bnv-regular text-base",
            ],
            variant === "h6" && ["font-bnv-regular text-sm"],
          ],
          [
            color === "primary" && ["text-black"],
            color === "dark" && ["text-black"],
            color === "white" && ["text-white"],
            color === "danger" && ["text-red-700"],
          ],
          className
        )}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

import * as React from "react";
import mergeClx from "../../libs/merge-clx";

const TAG_SIZE = ["sm", "base"] as const;
type TagSize = (typeof TAG_SIZE)[number];

const TAG_COLOR = ["DEFAULT", "primary", "secondary"] as const;

type TagColor = (typeof TAG_COLOR)[number];

type TagProps = {
  children: React.ReactNode;
  size?: TagSize;
  color?: TagColor;
} & React.ComponentPropsWithRef<"div">;

export const Tag = React.forwardRef<HTMLDivElement, TagProps>(
  ({ children, color = "DEFAULT", size = "base", className, ...rest }, _ref) => {
    return (
      <div
        className={mergeClx(
          [
            size === "sm" && ["py-0.5 text-xs"],
            size === "base" && ["py-1 text-sm"],
          ],
          color === "DEFAULT" && "bg-black text-white",
          color === "primary" &&
            'bg-[#8DD4CC] text-white font-bnv-regular',
          color === "secondary" && "bg-red-400 text-white font-bnv-regular",
          "inline-flex items-center px-3 rounded-2xl",
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
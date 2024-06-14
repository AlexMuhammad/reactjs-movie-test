import * as React from "react";

type CardProps = {
  children: React.ReactNode;
  icon?: boolean;
} & React.ComponentPropsWithRef<"div">;

export const Card = ({ children, icon, ...rest }: CardProps) => {
  return (
    <div
      className="bg-white p-[25px] w-full h-[145px] shadow-md rounded-xl relative overflow-hidden"
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;

import * as React from "react";

import { HTMLAttributes, ReactNode } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode
}

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <main className="min-h-screen flex justify-center bg-[#1a1a1a] w-full">
      <div className="relative max-w-[1200px] bg-[#1a1a1a] w-full mx-auto flex flex-col space-y-8">
        {children}
      </div>
    </main>
  );
};
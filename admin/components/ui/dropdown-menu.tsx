import React from "react";
import { cn } from "@/lib/utils";

const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative inline-block">{children}</div>;
};

const DropdownMenuTrigger = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  return <div onClick={onClick}>{children}</div>;
};

const DropdownMenuContent = ({
  children,
  isOpen,
  className,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  className?: string;
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "absolute right-0 mt-2 w-48 rounded-md border bg-popover p-1 shadow-md z-50",
        className
      )}
    >
      {children}
    </div>
  );
};

const DropdownMenuItem = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
};

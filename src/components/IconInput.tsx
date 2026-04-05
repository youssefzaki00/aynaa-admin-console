import React from "react";
import { Input } from "@/ui/input";
import { cn } from "@/lib/utils";

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  rightAction?: React.ReactNode;
}

export default function IconInput({ icon, rightAction, className, ...props }: IconInputProps) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
        {icon}
      </span>
      <Input
        className={cn("pl-12 bg-background/50 border-border/50 h-12 rounded-lg", rightAction && "pr-12", className)}
        {...props}
      />
      {rightAction && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2">
          {rightAction}
        </span>
      )}
    </div>
  );
}

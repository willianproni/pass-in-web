import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonPros extends ComponentProps<"button"> {
  trasparent?: boolean;
}

export function IconButton({ trasparent, ...props }: IconButtonPros) {
  return (
    <button
      {...props}
      className={twMerge(
        "border border-white/10 rounded-md p-1.5",
        trasparent ? "bg-black/20" : "bg-white/10",
        props.disabled ? "opacity-50" : null
      )}
    />
  );
}

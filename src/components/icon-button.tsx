import { ComponentProps } from "react";

interface IconButtonPros extends ComponentProps<"button"> {
  trasparent?: boolean;
}

export function IconButton({ trasparent, ...props }: IconButtonPros) {
  return (
    <button
      {...props}
      className={
        trasparent
          ? "bg-black/20 border border-white/10 rounded-md p-1.5"
          : "bg-white/10 border border-white/10 rounded-md p-1.5"
      }
    />
  );
}

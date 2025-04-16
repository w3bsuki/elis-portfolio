import React from "react";

export const Chip = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-800 border border-green-500/30 text-zinc-300">{children}</span>
  );
};

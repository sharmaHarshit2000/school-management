"use client";
import React from "react";

interface LoaderProps {
  size?: number;
  fullScreen?: boolean;
}

export default function Loader({ size = 16, fullScreen = false }: LoaderProps) {
  const classes = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-black/30 z-50"
    : "flex items-center justify-center";

  // Use inline style for dynamic sizing since Tailwind doesn't support dynamic classes
  return (
    <div className={classes}>
      <div
        style={{ width: size, height: size }}
        className="border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
      ></div>
    </div>
  );
}
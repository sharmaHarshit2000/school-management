"use client";
import React from "react";

export default function ButtonLoader({ size = 16 }: { size?: number }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="border-2 border-white border-t-transparent rounded-full animate-spin"
    />
  );
}

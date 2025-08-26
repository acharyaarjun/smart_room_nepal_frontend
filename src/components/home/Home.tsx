"use client";
import React from "react";
import { ThemeToggler } from "@/components/common";

export default function Home() {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <ThemeToggler />
    </div>
  );
}

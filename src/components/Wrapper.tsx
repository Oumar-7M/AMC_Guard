// src/components/Wrapper.tsx
"use client";

import Navbar from "./Navbar";

type WrapperProps = {
  children: React.ReactNode;
};

export default function Wrapper({ children }: WrapperProps) {
  return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 px-5 md:px-[10%] mb-10">
          {children}
        </main>
      </div>
  );
}

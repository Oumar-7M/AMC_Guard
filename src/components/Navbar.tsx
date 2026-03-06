// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { UserIcon } from "lucide-react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export default function Navbar() {
  const [shadow, setShadow] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { isLoggedIn, isAdmin,logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setShadow(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isLoggedIn) return null;

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Permanence-Courante", href: "/permanence-courante" },
  ];

  if (isAdmin) links.push({ name: "Admin", href: "/admin" });

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 bg-base-100 transition-shadow ${shadow ? "shadow-lg" : "shadow-md"
        }`}
    >
      <nav className="navbar max-w-6xl mx-auto px-4">
        {/* Logo */}
        <div className="flex-1">
          <p className="text-xl font-bold text-primary">
            AMC-Guard
          </p>
        </div>

        {/* Liens Desktop */}
        <div className="hidden md:flex items-center gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="btn btn-ghost rounded-2xl px-5"
            >
              {link.name}
            </Link>
          ))}
          
          <button
            onClick={logout}
            className="btn flex-1 text-white rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 flex items-center gap-2"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            logout
          </button>
        </div>

        {/* Profil Desktop */}
        <div className="hidden md:flex relative">
          <Link href="/profil" className="rounded-xl px-5">
            <UserIcon className="w-7 h-7" />
          </Link>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          {/* Profil */}
          <Link href="/profil" className="block rounded-xl px-3 py-2">
          <UserIcon className="w-7 h-7" />
          </Link>

          {/* Menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="btn btn-ghost btn-circle"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Dropdown Mobile */}
      {mobileOpen && (
        <div className="md:hidden bg-base-100 shadow-lg px-4 py-3 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-xl px-3 py-2 hover:bg-base-200"
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          <button
            onClick={logout}
            className="btn flex-1 text-white rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 flex items-center gap-2"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            logout
          </button>
        </div>
      )}
    </div>
  );
}

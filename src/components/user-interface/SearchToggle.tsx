//src/components/user-interface/SearchToggle.tsx
"use client";

import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";

type SearchToggleProps = {
  placeholder?: string;
  onSearch: (value: string) => void;
  initialValue?: string;
  className?: string;
};

export default function SearchToggle({
  placeholder = "Rechercher...",
  onSearch,
  initialValue = "",
  className = "",
}: SearchToggleProps) {
  const [open, setOpen] = useState(!!initialValue);
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setTimeout(() => {
      setValue(initialValue);
    setOpen(!!initialValue);
    }, 0);
  }, [initialValue]);

  const toggle = () => {
    if (open) {
      setValue("");
      onSearch("");
    }
    setOpen((o) => !o);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {open && (
        <div className="relative">
          <Search
            size={16}
            className="absolute left-2 top-1/2 -translate-y-1/2 opacity-60"
          />
          <input
            autoFocus
            className="input input-sm input-bordered pl-8 w-56"
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              const v = e.target.value;
              setValue(v);
              onSearch(v);
            }}
          />
        </div>
      )}

      <button
        className="btn btn-sm btn-circle"
        onClick={toggle}
        aria-label="Recherche"
      >
        {open ? <X size={18} /> : <Search size={18} />}
      </button>
    </div>
  );
}

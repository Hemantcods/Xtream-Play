"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounce?: number;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  debounce = 300,
}: SearchBarProps) {
  const [local, setLocal] = useState(value);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (local !== value) {
        onChange(local);
      }
    }, debounce);
    return () => clearTimeout(timer);
  }, [local, debounce, onChange, value]);

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
      <input
        type="text"
        placeholder={placeholder}
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:border-accent-brand/40 focus:outline-none focus:ring-1 focus:ring-accent-brand/20 transition-all"
      />
    </div>
  );
}

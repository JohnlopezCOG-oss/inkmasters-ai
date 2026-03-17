"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-white">
            Ink Masters <span className="text-orange-500">DTF</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="rounded-md px-3 py-1.5 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}

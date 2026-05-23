"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Landmark, LogIn, Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";

const AVATAR_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBnCTK6c6cDxsP0tSn2t6xBxBgsnuYlIhTN4jdOQmW2oOwVN5Yh1YvgPXiJWFaWgnqg059m500M6GolUEXp7WPS9CI3pVaqCFavnCUCyal3p4i92YludAvE0D_AQCHsh-7ZKcpX2zuosP5vbwGqB-_zR53UPCVBG_TfeJxvj44n1WSJ9Mzq_zrHLKh0kfOzxI2WrgL7jeO4_d2e-0-CLKJLGBUeRSzg4gMZczWrSIp0dY_wnIuwmfUtEauPNMOsj_tlW0s2gtx7MqQa";

const navLinks = [
  { href: "/courses", label: "Khóa học", match: (p: string) => p.startsWith("/courses") },
  { href: "/tutor", label: "Thư viện", match: (p: string) => p === "/tutor" },
  { href: "#", label: "Cộng đồng", match: () => false },
  { href: "#", label: "Về chúng tôi", match: () => false },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant/30 bg-surface">
      <div className="container-page flex h-20 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-serif text-headline-md font-bold tracking-tight text-primary transition-opacity hover:opacity-80"
        >
          <Landmark className="size-7 stroke-[1.5] text-primary" />
          Minh Triết Học Đường
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = link.match(pathname);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-label-md transition-colors",
                  active
                    ? "border-b-2 border-primary pb-1 font-bold text-primary"
                    : "text-on-surface-variant hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="hidden items-center gap-2 text-label-md text-primary transition-opacity hover:opacity-80 md:flex"
          >
            Đăng nhập
            <LogIn className="size-5 stroke-[1.5]" />
          </button>
          <div className="hidden size-10 cursor-pointer overflow-hidden rounded-full border border-outline-variant/50 transition-colors hover:border-primary md:flex">
            <Image
              src={AVATAR_URL}
              alt="Ảnh đại diện"
              width={40}
              height={40}
              className="size-full object-cover"
            />
          </div>
          <button
            type="button"
            className="text-primary md:hidden"
            aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="size-7 stroke-[1.5]" />
            ) : (
              <Menu className="size-7 stroke-[1.5]" />
            )}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-outline-variant/30 bg-surface md:hidden",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <div className="container-page flex flex-col gap-4 py-4">
          {navLinks.map((link) => {
            const active = link.match(pathname);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-label-md",
                  active
                    ? "font-bold text-primary"
                    : "text-on-surface-variant hover:text-primary"
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

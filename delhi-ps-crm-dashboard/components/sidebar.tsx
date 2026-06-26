"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import {
  LayoutDashboard,
  Map,
  AlertOctagon,
  BarChart3,
  FileText,
  PieChart,
  Shield,
  Menu,
  X,
  MessageCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

const NAV = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/analytics", label: "Analytics", icon: TrendingUp },
  { href: "/district-overview", label: "District Overview", icon: Map },
  { href: "/urgent-issues", label: "Urgent Issues", icon: AlertOctagon },
  { href: "/department-performance", label: "Department Performance", icon: BarChart3 },
  { href: "/citizen-complaints", label: "Citizen Complaints", icon: FileText },
  { href: "/reports-insights", label: "Reports & Insights", icon: PieChart },
  { href: "/administration", label: "Administration", icon: Shield },
] as const;

export default function Sidebar() {
  const path = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [path]);

  // Close on Escape
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setMobileOpen(false);
  }, []);
  
  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Mobile top bar (below md) ───────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-[#E8EDF5] bg-[#FFFFFF] px-4 md:hidden">
        <div className="flex items-center gap-3">
          <img src="/emblem.png" alt="Emblem" className="h-10 w-8 object-contain" />
          <span className="text-[16px] font-black tracking-tight text-[#0F172A]">
            PulseDilli
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-[#64748B] hover:bg-slate-50"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {/* ── Mobile overlay ──────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0F172A]/40 md:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile & Desktop drawer ─────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col h-full border-r transition-all duration-300 md:static md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "w-16 bg-[#F8FAFC] border-transparent" : "w-60 bg-[#FFFFFF] border-[#E8EDF5]"}`}
      >
        <div className={`shrink-0 flex flex-col border-b border-[#E8EDF5] py-6 relative ${isCollapsed ? "px-2" : "px-4"}`}>
          <div className={`flex items-center mb-1 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <span className="text-[20px] font-black tracking-tight text-[#0F172A] leading-tight">
                    PulseDilli
                  </span>
                  <span className="text-[11px] font-bold text-[#64748B]">
                    The real time pulse of Delhi
                  </span>
                </div>
              </div>
            )}
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden rounded-lg p-1.5 text-[#64748B] hover:bg-slate-50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Desktop Toggle Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex absolute -right-3 top-7 h-6 w-6 items-center justify-center rounded-full border border-[#E8EDF5] bg-white text-[#64748B] shadow-sm hover:text-[#0F172A]"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        <nav className={`flex-1 flex flex-col justify-start py-4 ${isCollapsed ? "px-2" : "px-3"}`}>
          <ul className="space-y-1">
            {NAV.map(({ href, label, icon: Icon }) => {
              const active = href === "/" ? path === "/" : path.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    title={isCollapsed ? label : undefined}
                    className={`flex items-center rounded-xl py-2.5 text-[14px] font-bold transition-all ${
                      isCollapsed ? "justify-center gap-0 px-2" : "gap-3.5 px-3"
                    } ${
                      active
                        ? "bg-[#EFF6FF] text-[#2563EB]"
                        : "text-[#64748B] hover:bg-slate-50 hover:text-[#0F172A]"
                    }`}
                  >
                    <Icon className={`h-5 w-5 shrink-0 ${active ? "text-[#2563EB]" : "text-[#64748B]"}`} />
                    {!isCollapsed && <span className="truncate">{label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── Bottom Section ──────────────────────────────────── */}
        <div className={`shrink-0 mt-auto border-t border-[#E8EDF5] flex flex-row items-center transition-all ${isCollapsed ? 'py-4 px-2 justify-center' : 'py-5 px-4 justify-start'}`}>
          <div className="w-12 flex justify-center items-center shrink-0">
            <img 
              src="/emblem.png" 
              alt="Emblem" 
              className="object-contain h-10 w-10 shrink-0" 
            />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0 ml-2.5">
              <span className="block text-[10px] font-bold text-[#94A3B8] uppercase tracking-wide leading-tight">
                Government of<br/>NCT of Delhi
              </span>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

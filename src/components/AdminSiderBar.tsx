"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Newspaper,
  Users,
  Calendar,
  X,
  Briefcase,
  TrendingUp,
  LogOut,
} from "lucide-react";

const navLinks = [
  { name: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
  { name: "Utilisateurs", href: "/admin/users", icon: Users },
  { name: "Articles", href: "/admin/articles", icon: Newspaper },
  { name: "Projets", href: "/admin/projects", icon: Briefcase },
  { name: "Événements", href: "/admin/events", icon: Calendar },
  { name: "Impact", href: "/admin/impact", icon: TrendingUp },
];

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const sidebarVariants = {
    closed: { x: "-100%", opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  const handleLogout = () => {
    if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
      signOut({ callbackUrl: "/" });
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300">
      {" "}
      {/* Fond Bleu Nuit */}
      {/* EN-TÊTE */}
      <div className="flex items-center justify-between h-20 px-6 border-b border-slate-800">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8">
            <Image
              src="/ELILA FOUNDATION WHITE.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-lg font-bold text-white tracking-wide">
            Admin
          </span>
        </Link>
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-slate-400 hover:text-white"
        >
          <X size={24} />
        </button>
      </div>
      {/* NAVIGATION */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        <p className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Menu Principal
        </p>
        {navLinks.map((link) => {
          const isActive =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname?.startsWith(link.href);

          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setSidebarOpen(false)}
              className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 
                                ${
                                  isActive
                                    ? "bg-blue-600 text-white shadow-md" // Bleu plus standard
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                                }`}
            >
              <link.icon
                className={`mr-3 h-5 w-5 ${
                  isActive
                    ? "text-white"
                    : "text-slate-500 group-hover:text-white"
                }`}
              />
              {link.name}
            </Link>
          );
        })}
      </nav>
      {/* PIED DE PAGE */}
      <div className="p-4 border-t border-slate-800 bg-slate-900">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-9 h-9 rounded-full bg-blue-900 flex items-center justify-center text-xs font-bold text-blue-200 border border-blue-700">
            AD
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">
              Administrateur
            </p>
            <p className="text-xs text-slate-500 truncate">admin@elila.org</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-red-600/90 rounded-lg transition-all"
        >
          <LogOut size={16} />
          Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      <aside className="hidden lg:block w-72 h-screen sticky top-0">
        <SidebarContent />
      </aside>
    </>
  );
}

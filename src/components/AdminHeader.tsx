import { Menu } from 'lucide-react';
import React from 'react';

interface AdminHeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function AdminHeader({ setSidebarOpen }: AdminHeaderProps) {
  return (
    // Ce header est visible sur mobile/tablette (lg:hidden)
    <header className="lg:hidden bg-white shadow-sm p-4">
      <button
        onClick={() => setSidebarOpen(true)}
        className="text-gray-500 hover:text-gray-700"
        aria-label="Ouvrir le menu"
      >
        <Menu size={24} />
      </button>
    </header>
  );
}
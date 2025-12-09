"use client";

import React, { useState } from 'react';
import AdminSidebar from '@/components/AdminSiderBar';
import AdminHeader from '@/components/AdminHeader';
import { useSession } from "next-auth/react";
import SiteLoader from '@/components/Loader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // Pour éviter les erreurs, on ne peut pas utiliser le hook useRouter directement ici.
      // Le middleware gère la redirection principale.
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    },
  });

  // useState est autorisé car nous sommes dans un Client Component
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (status === "loading") {
    return <SiteLoader />;
  }

  // Ce JSX sera rendu côté client et pourra être interactif
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1">
        <AdminHeader setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";

// Ce layout ne fait qu'ajouter la navigation autour des pages publiques.
// Il n'a plus besoin des métadonnées, des polices, ou des providers.
export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}
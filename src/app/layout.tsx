import type { Metadata } from "next";
import "./globals.css";
import AppProviders from "@/providers/AppProviders";

export const metadata: Metadata = {
    title: "elila foundation",
    description: "elila foundation est une organisation à but non lucratif fondée en 2023 à Goma, RDC; Bujumbura, Burundi, dédiée à habiliter les jeunes de la région des Grands Lacs.",
    icons: {
        icon: "/icon.png",
    }
};

// Ce layout enveloppe TOUT.
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                {/* Les providers sont déclarés ICI et seulement ici. */}
                <AppProviders>
                    {children}
                </AppProviders>
            </body>
        </html>
    );
}
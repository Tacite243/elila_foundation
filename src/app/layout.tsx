import Footer from "@/comoponents/footer";
import Header from "@/comoponents/header";
import Loader from "@/comoponents/loader";
import type { Metadata } from "next";
import localFont from "next/font/local";
import ClientWrapper from "@/comoponents/clientWrapper";
import Head from "next/head";
import '@/app/globals.css'


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Elila foundation",
  description: "Site web de la Elila Foundation",
  icons: {
    icon: "/ELILA FOUNDATION WHITE.png" as string,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <Head>
        <title>{metadata.title ? String(metadata.title) : "Titre par défaut"}</title>
        <meta name="description" content={metadata.description ?? "Description par défaut"} />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:title" content={String(metadata.title ?? "Titre par défaut")} />
        <meta property="og:description" content={String(metadata.description ?? "Description par défaut")} />
        <meta property="og:image" content={String("/dev.jpg")} />
        <meta property="og:url" content="https://elilafoundation.org" />
        <meta property="og:type" content="website" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={String(metadata.title ?? "Titre par défaut")} />
        <meta name="twitter:description" content={String(metadata.description ?? "Description par défaut")} />
        <meta name="twitter:image" content={String("/dev.jpg")} />

        {/* Langue et région */}
        <meta http-equiv="Content-Language" content="fr" />
        <meta name="language" content="French" />

        {/* Balises supplémentaires pour mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* Favicon */}
        <link rel="icon" href={typeof metadata.icons === "string" ? metadata.icons : "/default-icon.png"} />

        <link rel="preload" href="/fonts/GeistVF.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/GeistMonoVF.woff" as="font" type="font/woff" crossOrigin="anonymous" />
      </Head>

      <body className={`index-page ${geistSans.variable} ${geistMono.variable}`}>
        <ClientWrapper>
          <Header />
          <Loader />
          {children}
          <Footer />
        </ClientWrapper>
      </body>
    </html>
  );
}

import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";


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

export const metadata = {
  title: 'Index - AgriCulture Bootstrap Template',
  description: 'Description de votre site',
  keywords: 'agriculture, bootstrap, template, etc.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />

        {/* Précharger les Polices */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/opensans/v27/mem8YaGs126MiZpBA-U1U4I1cQ.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/marcellus/v8/-F6sY9pxGLTqZD9MzBxIT9g.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Polices Google */}
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&family=Marcellus:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className={`index-page ${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}

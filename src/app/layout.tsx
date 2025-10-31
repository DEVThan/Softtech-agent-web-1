"use client";

// import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/app/(admin)/[locale]/context/SidebarContext';
import { ThemeProvider } from '@/app/(admin)/[locale]/context/ThemeContext';
import { UserProvider } from "@/app/(admin)/[locale]/context/UserContext";
import { useParams,  } from "next/navigation";

// const outfit = Outfit({
//   subsets: ["latin"],
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const route = useParams<{ locale: string }>();
  let fontLocale = "font-kanit";
  switch (route.locale) {
    case "mm":
      fontLocale = "font-padauk";
      break;
    default:
      fontLocale = "font-kanit";
      break;
  }

  return (
    <html lang={route.locale}>
      <head>
        <link rel="icon" href="/front_images/Logo/sna_logo.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/front_images/Logo/sna_logo.png" />
        <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;600&family=Padauk:wght@400;700&display=swap" rel="stylesheet" />
      </head>

      {/* <body className={`${outfit.className} ${fontLocale} dark:bg-gray-900`}> */}
      <body className={`${fontLocale} dark:bg-gray-900`}>
        <ThemeProvider>
          {/* <SidebarProvider>{children}</SidebarProvider> */}
          <SidebarProvider>
            <UserProvider>{children}</UserProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

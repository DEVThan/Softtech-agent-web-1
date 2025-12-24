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
  let title = "Agent Softtechnw";
  let description ="We specialize in providing software development services, including AI systems. Additionally, we are a distributor of satellite dishes and set-top boxes. Our goal is to meet the needs and offer the best solutions to our customers.";

  switch (route.locale) {
    case "th":
      title = "Agent Softtechnw";
      description ="We specialize in providing software development services, including AI systems. Additionally, we are a distributor of satellite dishes and set-top boxes. Our goal is to meet the needs and offer the best solutions to our customers.";
      fontLocale = "font-padauk";
      break;
    case "en":
      title = "Agent Softtechnw";
      description ="We specialize in providing software development services, including AI systems. Additionally, we are a distributor of satellite dishes and set-top boxes. Our goal is to meet the needs and offer the best solutions to our customers.";
      fontLocale = "font-padauk";
      break;
    case "mm":
      title = "Agent Softtechnw";
      description ="We specialize in providing software development services, including AI systems. Additionally, we are a distributor of satellite dishes and set-top boxes. Our goal is to meet the needs and offer the best solutions to our customers.";
      fontLocale = "font-padauk";
      break;
    default:
      title = "Agent Softtechnw";
      description ="We specialize in providing software development services, including AI systems. Additionally, we are a distributor of satellite dishes and set-top boxes. Our goal is to meet the needs and offer the best solutions to our customers.";
      fontLocale = "font-kanit";
      break;
  }

  return (
    <html lang={route.locale}>
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
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




import "./style/custom.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { loadLocale } from "@/lib/loadLocale";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const nav = loadLocale(locale, "./navbar");
  const footer = loadLocale(locale, "./footer");

  return (<>
  {/* <div className="flex h-screen bg-gray-100 dark:bg-gray-900"> */}
  
    <div className="flex">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main content */}
      <div className="flex flex-col flex-1  min-h-screen">
        <Navbar nav={nav} />
        <main className="flex-grow overflow-y-auto"> {children} </main>
        <Footer footer={footer} />
      </div> 
    </div>
    </>
  );
}

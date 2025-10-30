// "use client";

// import { NextIntlClientProvider } from "next-intl";
// import { ReactNode } from "react";
// import Navbar from "./components/Navbar";
// import Sidebar from "./components/Sidebar";

// export default function FrontLayoutProvider({
//   children,
//   locale,
//   messages,
// }: {
//   children: ReactNode;
//   locale: string;
//   messages: Record<string, unknown>;
// }) {
//   return (
//     <NextIntlClientProvider locale={locale} messages={messages}>
//       <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
//         <Sidebar />
//         <div className="flex flex-col flex-1">
//           <Navbar nav={messages} />
//           <main className="p-6 overflow-y-auto">{children}</main>
//         </div>
//       </div>
//     </NextIntlClientProvider>
//   );
// }

import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

interface MessagesType {
  navbar: {
    home: string;
    product: string;
    aboutus: string;
    contactus: string;
  };
  authen_navbar: {
    signin: string;
    regis: string;
  };
}

export default function FrontLayoutProvider({
  children,
  locale,
  messages,
}: {
  children: ReactNode;
  locale: string;
  messages: MessagesType;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Navbar nav={messages} />
          <main className="p-6 overflow-y-auto">{children}</main>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
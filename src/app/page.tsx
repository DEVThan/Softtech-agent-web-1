"use client";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";

export default function RootPage() {
  const pathname = usePathname();
    const locale = pathname.split("/")[1] || "th";
  // return <div>Redirecting...</div>;
  redirect( `${locale}/home`); // ใช้งาน redirect แทน <div>Redirecting...</div>
}

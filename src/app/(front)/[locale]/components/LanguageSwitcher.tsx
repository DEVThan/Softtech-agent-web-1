"use client";

import { useRouter, usePathname } from "next/navigation";
const languages = [
  { code: "en", label: "English", href: "#" },
  { code: "th", label: "ไทย" , href: "#"},
  { code: "mm", label: "MM", href: "#" }
];

export default function LanguageSwitcher({ currentLang }: { currentLang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLang: string) => {
    // ตัด locale ปัจจุบันออกจาก path
    const segments = pathname.split("/");
    segments[1] = newLang; // แทนที่ segment แรกด้วยภาษาใหม่
    const newPath = segments.join("/");
    router.push(newPath);
  };


  return (<>
    <select
      value={currentLang}
      onChange={(e) => handleChange(e.target.value)}
      className="border rounded px-2 py-1 bg-white dark:bg-gray-700"
    >
      {languages.map((l) => (
        <option key={l.code} value={l.code}> {l.label} </option>
      ))}
    </select>
  </>);
}

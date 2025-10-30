"use client";

import { useEffect, useState } from "react";
import Image from 'next/image';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // โหลด theme จาก localStorage ตอน mount
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const initialTheme = saved || "light";

    setTheme(initialTheme);

    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (<>
    {/* <button onClick={toggleTheme} className="px-4 py-4 " >  {theme === "light" ? "🌞" : "🌙"} </button> */}
    <button onClick={toggleTheme}  className=" relative flex items-center justify-center  rounded-full  bg-[#0874B6]  border border-white" >  
      {  (theme === "light") 
      ? <Image src="/front_images/icon/theme/light.png" alt="Logo" width={24} height={24} className="object-cover rounded-[10px] w-full h-full"/> 
      : <Image src="/front_images/icon/theme/dark.png" alt="Logo" width={24} height={24} className="object-cover rounded-[10px] w-full h-full"/> 
      } 
    </button> 
  </>
  );
}



"use client";
import { useState } from "react";

//import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import { useParams, useRouter, usePathname } from "next/navigation";
import Image from 'next/image';
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface NavbarProps {
  nav: {
    navbar: { home: string; product: string; aboutus: string; contactus: string; };
    authen_navbar: { signin: string; regis: string; };
  };
}

const languages = [
  { code: "en", label: "English" , icon:  `/front_images/language/eng.png`},
  { code: "th", label: "ไทย"  , icon: `/front_images/language/thai.png`},
  { code: "mm", label: "မြန်မာ"  , icon: `/front_images/language/myanmar.png` },
];
  

export default function Navbar({ nav }: NavbarProps) {
  // const [lang, setLang] = useState("en");
  const [isOpen, setIsOpen] = useState(false);
  // const [menudropdown, setOpen] = useState(false);
  const params = useParams<{ locale: string }>();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLang: string) => {
    // ตัด locale ปัจจุบันออกจาก path
    const segments = pathname.split("/");
    segments[1] = newLang; // แทนที่ segment แรกด้วยภาษาใหม่
    const newPath = segments.join("/");
    router.push(newPath);
  };
  
  const navbar = [
    { label: nav.navbar.home, href: `/${params.locale}/home` },
    { label: nav.navbar.product, href: `/${params.locale}/products` },
    { label: nav.navbar.aboutus, href: `/${params.locale}/aboutus` },
    { label: nav.navbar.contactus, href: `/${params.locale}/contactus` }
  ];
  const authen_navbar = [
    { label: nav.authen_navbar.signin, href: `/${params.locale}/signin` },
    { label: nav.authen_navbar.regis, href: `/${params.locale}/registration` }
    // { label: nav.authen_navbar.signin, href: `/${params.locale}/admin/signin` },
    // { label: nav.authen_navbar.regis, href: `/${params.locale}/admin/registration` }
  ];

  return (
    <header className="front-header bg-[#0874B6] dark:bg-gray-800  shadow  transition-colors px-6 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <a  key={params.locale} href={`/${params.locale}/home`} className="text-2xl hover:underline">
          <Image src="/front_images/Logo/sna_white_logo.png" alt="Logo" width={50} height={10} 
          className="object-cover logos focus:outline-none focus:ring-none focus:ring-offset-none w-full h-full"/>
        </a>
        
        <div className="hidden md:flex items-center w-full">
          <nav className="flex gap-6 ml-auto items-center">
            <div className="overflow-hidden">
              <div className="flex flex-row items-center">
                {navbar.map((menu, i) => (
                  <div className=" pl-6" key={`${menu.label}-${i}`}>
                    <a href={menu.href} className={ 
                      pathname.startsWith(menu.href)
                      ? 'text-[13px] nav-active-color no-underline font-bold text-[#474747]'
                      : 'text-[13px] text-[#fff] underline' 
                    }> {menu.label} </a>
                  </div>
                ))}
                {authen_navbar.map((menu, j) => (
                  <div className=" pl-6" key={`${menu.label}-${j}`}>
                    <a href={menu.href} className={ 
                      pathname.startsWith(menu.href)
                      ? 'text-[13px] nav-active-color no-underline font-bold text-[#474747]'
                      : 'text-[13px] text-[#fff] underline' 
                    }> {menu.label} </a>
                  </div>
                ))}
              </div>
            </div>
          </nav>
        </div>
        {/* <div className="flex items-center ml-auto">
          <div className="flex flex-row items-center"> */}
              {/* <ThemeToggle /> */}
          {/* </div>
        </div> */}
        
        <div className="flex items-center ml-auto">
          <div className="flex flex-row items-center">
            <div className="pl-2"> <ThemeToggle /></div>
            <div className=" pl-2">
              <DropdownMenu.Root>
                <DropdownMenu.Trigger className="flex flex-col cursor-pointer hover:bg-[#0874B6] transition-all items-center
                focus:outline-none focus:ring-none focus:ring-offset-none ">
                  {languages.map((lang, i) => ( lang.code === params.locale ? <Image key={`${lang.code}-${i}`} src={`${lang.icon}`} alt="Logo" width={24} height={24} className="object-cover rounded-[10px] w-full h-full"/>  : null)) }
                </DropdownMenu.Trigger>
                <DropdownMenu.Content side="bottom" align="end" className="relative bg-[#fff]/90 shadow-xl rounded-xl p-2 w-36  z-[9999]" >
                  <div className="absolute bg-[#fff]/80 -top-1 right-2 w-3 h-3 rotate-45 "></div>

                  {languages.map((lang, i) => (
                    <DropdownMenu.Item
                      key={`${lang.code}-${i}`}
                      className={`p-1 rounded-lg cursor-pointer hover:bg-[#fff] hover:text-[#0874B6] transition-colors ${
                        lang.code === params.locale ? "font-bold text-[#0874B6]" : "text-[#474747]"
                      }`} onClick={() => handleChange(lang.code)} >
                      <div className="flex items-center gap-2">
                        <div className="rounded-full flex items-center justify-center w-6 h-6 ">
                          <Image src={`${lang.icon}`} alt="Logo" width={20} height={20} className="object-cover rounded-[10px] w-full h-full"/> 
                        </div>
                        <span>{lang.label}</span>
                      </div>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </div>
          </div>
        </div>
        <div className="flex items-center pl-2">
          <button className="md:hidden flex flex-col gap-1.5 w-5" onClick={() => setIsOpen(!isOpen)} >
            <span className="block w-full h-0.5 bg-[#fff] dark:bg-[#fff]"></span>
            <span className="block w-full h-0.5 bg-[#fff] dark:bg-[#fff]"></span>
            <span className="block w-full h-0.5 bg-[#fff] dark:bg-[#fff]"></span>
          </button>
        </div>

        {isOpen && (
          <div className="fixed inset-0 
            bg-gray-900 dark:bg-gray-900
            flex flex-col items-center justify-center gap-8 z-40 transition-colors">
            <button className="absolute top-6 right-6 text-[#fff] dark:text-[#fff] text-xl" onClick={() => setIsOpen(false)} > &times; </button>
            {navbar.map((menu, i) => (
              <a key={`${i}`}  href={menu.href} className={ 
                pathname.startsWith(menu.href)
                ? 'text-[13px] nav-active-color no-underline font-bold text-[#474747]'
                : 'text-[13px] text-[#fff] underline' 
              }> {menu.label} </a>
            ))}
            <div className="w-full px-10"> <hr className="border-t border-white/90 dark:border-gray-600" /> </div>
            {authen_navbar.map((item,k) => (
              <a key={`${item.label}-${k}`}  href={item.href} className={ 
                pathname.startsWith(item.href)
                ? 'text-[13px] nav-active-color no-underline font-bold text-[#474747]'
                : 'text-[13px] text-[#fff] underline' 
              }>{item.label}</a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

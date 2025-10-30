"use client";

import Image from 'next/image';
interface NavbarProps {
  footer: {
    conpany: { conpany_name: string; address: string;};
    contact: { 
      label: string; 
      tel: {
        label: string; content: string;
      }[]
    }
  };
}

export default function Footer({ footer }: NavbarProps) {
  return (
    <footer className="bg-[#0874B6] dark:bg-gray-800 px-6 py-4 transition-colors">
        <div className="flex justify-start">
            <div className="flex-shrink-0">
              <Image src="/front_images/Logo/sna_white_logo.png" alt="Logo" width={400} height={200} className="object-cover logos w-full h-full"/>
            </div>
            <div  className="grid px-6 pt-0 w-[300px] sm:w-[400px] ">
                <span className="text-[10px] sm:text-[15px]  font-bold">{footer.conpany.conpany_name}</span>
                <label className="text-[7px] sm:text-[10px] ">{footer.conpany.address}</label>
                <span className="text-[10px] sm:text-[15px]  font-bold mt-2">{footer.contact.label}</span>
                <label className="text-[7px] sm:text-[10px] "> {footer.contact.tel[0].label}: {footer.contact.tel[0].content}</label>
            </div>
        </div>
    </footer>
  );
}

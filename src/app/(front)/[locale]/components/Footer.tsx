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
    },
    social: { 
      label: string; 
      desc: string;
      content: {
          label: string; content: string; link: string;
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
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-2 gap-4">
              <div className="grid pl-6 pt-0 w-full">
                  <span className="text-[15px] sm:text-[17px] font-bold">{footer.conpany.conpany_name}</span>
                  <label className="text-[11px] sm:text-[13px] ">{footer.conpany.address}</label>
                  {/* <span className="text-[10px] sm:text-[15px]  font-bold mt-2">{footer.contact.label}</span>
                  <label className="text-[7px] sm:text-[10px] "> {footer.contact.tel[0].label}: {footer.contact.tel[0].content}</label> */}
              </div>
              <div className="grid pl-6 pt-0 w-full ">
                  <span className="text-[15px] sm:text-[17px] font-bold">{footer.contact.label}</span>
                  <label className="text-[11px] sm:text-[13px]"> {footer.contact.tel[0].label}: {footer.contact.tel[0].content}</label>
                  <label className="text-[11px] sm:text-[13px]"> {footer.social.label}: {footer.social.content[0].label}</label>
              </div>
            </div>
        </div>
    </footer>
  );
}

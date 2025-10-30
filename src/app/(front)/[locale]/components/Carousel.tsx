"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from 'next/image';

import { Navigation, Pagination, Autoplay } from "swiper/modules";
interface CommonProps {
  button: {
    readmore: string;
  };
  // เพิ่ม properties อื่น ๆ ตามที่ใช้จริง
}
interface CarouselProps {
  common: CommonProps;
  locale: string;
}
export default function Carousel({ common, locale }: CarouselProps) {
  return (
    <div className="grid mt-0 sm:mt-4 md:mt-4 mb-4  ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        // navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="relative bg-[#e2e4e4] w-full rounded-[0] sm:rounded-[10px]">
        <SwiperSlide>
          <div className="h-[250px] sm:h-[300px] md:h-[500px] lg:h-[500px]">
            <Image src="/front_images/home/banner_home_satdish.png" alt="Logo" width={400} height={200} className="object-cover rounded-[10px] w-full h-full"/>
            <div className="absolute top-1/2 -translate-y-1/2
              left-3 sm:left-10 md:left-10 
              w-[60%] sm:w-[50%]">
              <div className="flex flex-col justify-center 
              bg-gradient-to-r from-black/90 via-black/80 to-black/70
              rounded-xl  
              p-3 sm:p-5 md:p-5 lg:p-5
              h-[200px] sm:h-[250px] md:h-[350px] lg:h-[350px] ">
                <div className='mt-1'><label className='text-white text-[11px] sm:text-[12px] md:text-[17px]'>KU-BAND SATELLITE DISH</label></div>
                <div className='mt-1'><label className='text-[#0874B6] dark:text-[#0874B6] text-[11px] sm:text-[12px] md:text-[17px]'>SOFTTECH M1</label></div>
                <div className='mt-1'><p className="text-white text-[9px] sm:text-[10px] md:text-[15px]">จานดาวเทียมที่รับสัญญาณได้อย่างมีประสิทธิภาพ  รองรับสัญญาณระบบ KU Band มีความยืดหยุ่นสูง แข็งแรงทนทาน</p></div>
                <div className='mt-2 mb-2'> 
                  <a type="button"  key={locale} href={`/${locale}/product-detail`} className="btn-primary w-auto bg-[#0874B6] text-white px-6 py-2 rounded-3xl mt-2
                  text-[11px] sm:text-[12px] md:text-[13px] hover:underline">{common.button.readmore}</a>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="  h-[250px] sm:h-[300px] md:h-[500px] lg:h-[500px]">
            <Image src="/front_images/home/banner_home_lnb.png" alt="Logo" width={400} height={200} className="object-cover rounded-[10px] w-full h-full"/>
            <div className="absolute top-1/2 -translate-y-1/2
              left-3 sm:left-10 md:left-10 
              w-[60%] sm:w-[50%]">
              <div className="flex flex-col justify-center 
              bg-gradient-to-r from-black/90 via-black/80 to-black/70
              rounded-xl  
              p-3 sm:p-5 md:p-5 lg:p-5
              h-[200px] sm:h-[250px] md:h-[350px] lg:h-[350px] ">
                <div className='mt-1'><label className='text-white text-[11px] sm:text-[12px] md:text-[17px]'>KU-BAND SATELLITE DISH</label></div>
                <div className='mt-1'><label className='text-[#0874B6] dark:text-[#0874B6] text-[11px] sm:text-[12px] md:text-[17px]'>SOFTTECH M1</label></div>
                <div className='mt-1'><p className="text-white text-[9px] sm:text-[10px] md:text-[15px]">จานดาวเทียมที่รับสัญญาณได้อย่างมีประสิทธิภาพ  รองรับสัญญาณระบบ KU Band มีความยืดหยุ่นสูง แข็งแรงทนทาน</p></div>
                <div className='mt-2 mb-2'> 
                <a type="button"  key={locale} href={`/${locale}/product-detail`} className="btn-primary w-auto bg-[#0874B6] text-white px-6 py-2 rounded-3xl mt-2
                  text-[11px] sm:text-[12px] md:text-[13px] hover:underline">{common.button.readmore}</a>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  ); 
}

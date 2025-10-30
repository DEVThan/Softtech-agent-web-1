import { loadLocale } from '@/lib/loadLocale';
import Carousel from "../components/Carousel";
import Image from 'next/image';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const common = loadLocale(locale, 'common');
  // const params = useParams<{ locale: string }>();

  return (<>
    <div className="content">
      {/* <div className="grid grid-cols-1 mt-0 sm:mt-4 md:mt-4 panel mb-4"> */}
        {/* <div>01</div> */}
        <Carousel common={common} locale={locale} />
      {/* </div> */}

      <div className="section mt-0 sm:mt-2 md:mt-8">
        <div className='text-center'><label htmlFor="" className='text-[#0874B6] dark:text-[#474747] font-bold'>OUR PRODUCTS</label></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-2 gap-4">
          
          <div className="panel mb-2" >
            <div className="flex flex-col items-center text-center p-5">
              <div className='mt-2 flex justify-center'>
                <Image src="/front_images/products/dish60.png" alt="Logo" width={400} height={200} className="object-cover our-product rounded-[10px] w-full h-full"/>
              </div>
              <div className='mt-2'><label className=''>KU-BAND SATELLITE DISH</label></div>
              <div className='mt-2'><label className='title text-[#0874B6] dark:text-[#474747] '>SOFTTECH M1</label></div>
              <div className='mt-2'><p>จานดาวเทียมที่รับสัญญาณได้อย่างมีประสิทธิภาพ  รองรับสัญญาณระบบ KU Band มีความยืดหยุ่นสูง แข็งแรงทนทาน</p></div>
              <div className='mt-2'> 
                <a type="button"  key={locale} href={`/${locale}/product-detail`} className="btn-primary bg-[#0874B6] dark:bg-gray-800 w-auto text-white px-6 py-2 rounded-3xl mt-2 hover:underline">{common.button.readmore}</a>
              </div>
            </div>
          </div>
          <div className="panel mb-2" >
            <div className="flex flex-col items-center text-center p-5">
              <div className='mt-2 flex justify-center'>
                <Image src="/front_images/products/receiver.png" alt="Logo" width={400} height={200} className="object-cover our-product rounded-[10px] w-full h-full"/>
              </div>
              <div className='mt-2'><label className=''>SET TOP BOX</label></div>
              <div className='mt-2'><label className='title text-[#0874B6] dark:text-[#474747] '>SOFTTECH M1</label></div>
              <div className='mt-2'><p>สามารถรับชมช่องรายการทีวีดาวเทียมใน ระบบ KU Band ทั้งช่องไทยและต่างประเทศ รองรับความละเอียดภาพระดับ Full HD 1080P</p></div>
              <div className='mt-2'> 
                <a type="button"  key={locale} href={`/${locale}/product-detail`} className="btn-primary bg-[#0874B6] dark:bg-gray-800 w-auto text-white px-6 py-2 rounded-3xl mt-2 hover:underline">{common.button.readmore}</a>
              </div>
            </div>
          </div>
          <div className="panel mb-2" >
            <div className="flex flex-col items-center text-center p-5">
              <div className='mt-2 flex justify-center'>
                <Image src="/front_images/products/lnb_m1.png" alt="Logo" width={400} height={200} className="object-cover our-product rounded-[10px] w-full h-full"/>
              </div>
              <div className='mt-2'><label className=''>LNB</label></div>
              <div className='mt-2'><label className='title text-[#0874B6] dark:text-[#474747] '>SOFTTECH M1</label></div>
              <div className='mt-2'><p>หัวรับสัญญาณดาวเทียม (LNB) รองรับการสัญญาณระบบ KU Band แข็งแรงทนแดดทนฝน</p></div>
              <div className='mt-2'> 
                <a type="button"  key={locale} href={`/${locale}/product-detail`} className="btn-primary bg-[#0874B6] dark:bg-gray-800 w-auto text-white px-6 py-2 rounded-3xl mt-2 hover:underline">{common.button.readmore}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className='text-center mt-3'><label htmlFor="" className='text-[#0874B6] dark:text-[#474747] font-bold'>ABOUT US</label></div>
        <div className="flex flex-col sm:flex-row gap-4 mt-2  panel  px-2 py-2 mb-4">
          <div className='basis-1/3'>
            <div  className='h-[150px] sm:h-[200px] md:h-[200px] lg:h-[200px]'>
              <Image src="/front_images/about/about_us.jpg" alt="Logo" width={400} height={200} className="object-cover rounded-[10px] w-full h-full"/>
            </div>
          </div>
          <div className="basis-2/3 flex">
            <div className="rounded-xl px-6 py-6 ">
              {/* <h2 className="text-lg font-bold mb-2">SOFTTECH NETWORK COMPANY LIMITED</h2> */}
              {/* <h2 className='title'>SOFTTECH NETWORK COMPANY LIMITED</h2> */}
              <p className="text-sm text-gray-600 indent-8  mb-4">
                  Softtech Network is a comprehensive technology company. We specialize in providing advanced software development and maintenance services, including AI systems. We are also a distributor of satellite dishes and set-top boxes. Our goal is to understand our clients needs and deliver the best and most suitable solutions.
              </p>
              <div className='text-center'>
                <a type="button"  key={locale} href={`/${locale}/aboutus`} className="btn-primary bg-[#0874B6] dark:bg-gray-800  w-auto text-white px-6 py-2 rounded-3xl mt-2 hover:underline">{common.button.readmore}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
}

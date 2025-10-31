import { loadLocale } from '@/lib/loadLocale';
// import Carousel from "../components/Carousel";
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

      <div className="section mt-0 sm:mt-2 md:mt-8">
        <div className='text-center'><label htmlFor="" className='title text-[#0874B6] dark:text-[#474747]  font-bold'>PRODUCTS</label></div>
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
                <a type="button"  key={locale} href={`/${locale}/product-detail`} className="btn-primary bg-[#0874B6] dark:bg-gray-800 w-auto  text-white px-6 py-2 rounded-3xl mt-2 hover:underline">{common.button.readmore}</a>
              </div>
            </div>
          </div>
          <div className="panel mb-2" >
            <div className="flex flex-col items-center text-center p-5">
              <div className='mt-2 flex justify-center'>
                <Image src="/front_images/products/lnb_m2.png" alt="Logo" width={400} height={200} className="object-cover our-product rounded-[10px] w-full h-full"/>
              </div>
              <div className='mt-2'><label className=''>TWIN UNIVERSAL KU-BAND LNBF</label></div>
              <div className='mt-2'><label className='title text-[#0874B6] dark:text-[#474747]'>SOFTTECH M2</label></div>
              <div className='mt-2'><p>A Ku-band universal LNB with two outputs, suitable for use in a dual-output satellite TV system to feed signals to two independent receivers.</p></div>
              <div className='mt-2'> 
                <a type="button"  key={locale} href={`/${locale}/product-detail`} className="btn-primary bg-[#0874B6] dark:bg-gray-800 w-auto text-white px-6 py-2 rounded-3xl mt-2 hover:underline">{common.button.readmore}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
}

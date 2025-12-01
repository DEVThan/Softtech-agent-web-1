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
  
  const our_products = [{
      "product_code":"20251100001",
      "path":"/front_images/products/satellite-dish.png",
      "name":"KU-BAND SATELLITE DISH",
      "model":"SOFTTECH M1",
      "decs":"A high-performance satellite dish that efficiently receives Ku-band signals. It is highly flexible, durable, and built to withstand harsh weather conditions.",
    },
    {
      "product_code":"20251100002",
      "path":"/front_images/products/stb-m1.png",
      "name":"SET TOP BOX",
      "model":"SOFTTECH M1",
      "decs":"You can watch both Thai and international satellite TV channels on the Ku-band system, with support for Full HD 1080p resolution.",
    },
    {
      "product_code":"20251100003",
      "path":"/front_images/products/lnb.png",
      "name":"SINGLE UNIVERSAL KU-BAND",
      "model":"SOFTTECH M1",
      "decs":"A Ku-Band Universal LNBF for satellite reception, along with its input and output frequency ranges.",
    }
  ];

  return (<>
  
    <div className="content">

      <div className="section mt-0 sm:mt-2 md:mt-8">
        <div className='text-center'>
          <label htmlFor="" className='title text-[#0874B6] dark:text-[#474747]  font-bold'>PRODUCTS</label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-2 gap-4">
          {our_products.map((item, index) => (
            <div  key={index} className="grid text-center rounded-[10px] mb-2 bg-white shadow-[0_1px_10px_rgba(180,181,181,1.3)]">
              <div className=" mb-2" >
                <div className="flex flex-col items-center text-center">
                  <div className="flex justify-center items-center w-full h-[150px] pt-4">
                    <div className="w-[150px] h-[150px] flex justify-center items-center">
                      <Image src={item.path} alt="Logo"
                        width={400} height={200}
                        className="rounded-tl-[10px] rounded-tr-[10px] object-contain w-full h-full" />
                    </div>
                  </div>
                  <div className="px-4 py-4">
                    <p className="text-gray-600">{item.name}</p>
                    <p className="text-[15px] md:text-[17px] text-[#0874B6]">{item.model}</p>
                    <p className="text-[11px] md:text-[13px] text-gray-600">{item.decs}</p>
                    <div className="mt-4">
                      <a type="button" href={`/${locale}/products/${item.product_code}`}
                        className="bg-[#0874B6] text-[15px] text-white px-4 py-2 rounded-3xl mt-2 hover:underline shadow-[0_1px_10px_rgba(180,181,181,1.3)]"
                      >{common.button.readmore} </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* <div className="panel mb-2" >
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
          </div> */}
        </div>
      </div>
    </div>
  </>);
}

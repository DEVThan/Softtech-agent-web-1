import { loadLocale } from '@/lib/loadLocale';
// import Carousel from "../components/Carousel";
import Image from 'next/image';

type Locale = "en" | "th" | "mm";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  const common = loadLocale(locale, 'common');
  // const params = useParams<{ locale: string }>();

  // const our_products = [{
  //     "product_code":"20251100001",
  //     "path":"/front_images/products/satellite-dish.png",
  //     "name":"KU-BAND SATELLITE DISH",
  //     "model":"SOFTTECH M1",
  //     "decs":"A high-performance satellite dish that efficiently receives Ku-band signals. It is highly flexible, durable, and built to withstand harsh weather conditions.",
  //   },
  //   {
  //     "product_code":"20251100002",
  //     "path":"/front_images/products/stb-m1.png",
  //     "name":"SET TOP BOX",
  //     "model":"SOFTTECH M1",
  //     "decs":"You can watch both Thai and international satellite TV channels on the Ku-band system, with support for Full HD 1080p resolution.",
  //   },
  //   {
  //     "product_code":"20251100003",
  //     "path":"/front_images/products/lnb.png",
  //     "name":"SINGLE UNIVERSAL KU-BAND",
  //     "model":"SOFTTECH M1",
  //     "decs":"A Ku-Band Universal LNBF for satellite reception, along with its input and output frequency ranges.",
  //   }
  // ];

  const json_conntent = {
    "product": {
      "header":{
        "en": "OUR PRODUCTS",
        "th": "สินค้าของเรา",
        "mm": "ကျွန်ုပ်တို့အရည်အသွေးများ"
      },
      "content":[{
          "product_code":"20251100001",
          "path":"/front_images/products/satellite-dish.png",
          "name":"KU-BAND SATELLITE DISH",
          "model":"SOFTTECH M1",
          "decs":{
            "en": "A high-performance satellite dish that efficiently receives Ku-band signals. It is highly flexible, durable, and built to withstand harsh weather conditions.",
            "th": "จานดาวเทียมที่มีประสิทธิภาพสูงซึ่งรับสัญญาณ Ku-band ได้อย่างมีประสิทธิภาพ จานดาวเทียมนี้มีความยืดหยุ่นสูง ทนทาน และออกแบบมาเพื่อทนต่อสภาพอากาศที่รุนแรง",
            "mm": "Ku-band အချက်အလက်များကို ထိရောက်စွာ လက်ခံနိုင်သော အရည်အသွေးမြင့် ဂြိုလ်တုချပ်ပြားတစ်ခု ဖြစ်ပါသည်။ ၎င်းသည် လိုက်လျောညီထွေမှုကောင်းပြီး ခိုင်ခံ့ကြံ့ခိုင်ကာ ပြင်းထန်သော မိုးလေဝသ အခြေအနေများကို ခံနိုင်ရည်ရှိစေရန် ဒီဇိုင်းပြုလုပ်ထားပါသည်။"
          }
        },
        {
          "product_code":"20251100002",
          "path":"/front_images/products/stb-m1.png",
          "name":"SET TOP BOX",
          "model":"SOFTTECH M1",
          "decs":{
            "en": "You can watch both Thai and international satellite TV channels on the Ku-band system, with support for Full HD 1080p resolution.",
            "th": "คุณสามารถรับชมช่องรายการทีวีดาวเทียมทั้งในประเทศและต่างประเทศบนระบบ Ku-band โดยรองรับความละเอียดระดับ Full HD 1080p",
            "mm": "Ku-band စနစ်ကို အသုံးပြု၍ ပြည်တွင်းနှင့် နိုင်ငံတကာ ဂြိုလ်တုရုပ်သံချန်နယ်များကို ကြည့်ရှုနိုင်ပြီး Full HD 1080p အရည်အသွေးကို ထောက်ပံ့ပေးပါသည်။"
          }
        },
        {
          "product_code":"20251100003",
          "path":"/front_images/products/lnb.png",
          "name":"SINGLE UNIVERSAL KU-BAND",
          "model":"SOFTTECH M1",
          "decs":{
            "en": "A Ku-Band Universal LNBF for satellite reception, along with its input and output frequency ranges.",
            "th": "หัวรับสัญญาณดาวเทียม (LNB) แบบยูนิเวอร์แซลสำหรับระบบ Ku-Band พร้อมช่วงความถี่ขาเข้าและขาออก",
            "mm": "Ku-band စနစ်အတွက် အသုံးပြုနိုင်သည့် LNB ဖြစ်ပြီး အငယ်ထည့်မည့်နည်းလမ်းနည်းလမ်းကနည့်ခတင់ အရညៈအពិត និង ထပ់ប្រាក់ការស្តាយ"
          }
        }
      ]
    },
    "aboutus": {
      "header":{
        "en": "ABOUT US",
        "th": "เกี่ยวกับเรา",
        "mm": "ကျွန်ုပ်တို့အကြောင်း"
      },
      "content":{
        "en": "As a company, we provide comprehensive software development, consultation, and maintenance services, including AI systems. We are also a distributor of satellite dishes and set-top boxes, with over 10 years of experience in the industry.",
        "th": "ในฐานะบริษัท เราให้บริการพัฒนาซอฟต์แวร์ การให้คำปรึกษา และการบำรุงรักษาอย่างครบวงจร รวมถึงระบบปัญญาประดิษฐ์ นอกจากนี้ เรายังเป็นผู้จัดจำหน่ายจานดาวเทียมและกล่องรับสัญญาณที่มีประสบการณ์มากกว่า 10 ปีในอุตสาหกรรมนี้",
        "mm": "ကုမ္ပဏီတစ်ခုအနေနှင့် ကျွန်ုပ်တို့သည် စနစ်တကျ ဆော့ဖ်ဝဲ ဖွံ့ဖြိုးရေး၊ အကြံပေးမှုနှင့် ပြုပြင်ထိန်းသိမ်းမှု ဝန်ဆောင်မှုများကို ပေးဆောင်ပါသည်၊ AI စနစ်များအပါအဝင်။ ကျွန်ုပ်တို့သည် ဂြိုလ်တုချပ်ပြားများနှင့် စက်တင်ဘောက်စ်များကိုလည်း ဖြန့်ဝေသူတစ်ဦးဖြစ်ပြီး စက်မှုလုပ်ငန်းတွင် 10 နှစ်ကျော် အတွေ့အကြုံရှိပါသည်။"
      }
    },
  };

  return (<>
    <div className="content">
      {/* <div className="grid grid-cols-1 mt-0 sm:mt-4 md:mt-4 panel mb-4"> */}
        {/* <div>01</div> */}
        {/* <Carousel common={common} locale={locale} /> */}
        <div className="section mt-0 sm:mt-2 md:mt-2">
          <div className="flex justify-center items-center w-full  pt-4">
            <div className="w-full flex justify-center items-center">
              <Image src="/front_images/banner/Banner_M1_website_2026.jpg" alt="Logo"
                width={100} height={200}
                className="rounded-[10px] object-contain w-full h-full" />
            </div>
          </div>
        </div>
      {/* </div> */}

      <div className="section mt-0 sm:mt-2 md:mt-8">
        <div className='text-center'>
          <label htmlFor="" className='title text-[21px] md:text-[21px] text-[#0874B6] dark:text-[#474747] font-bold'>
            {/* OUR PRODUCTS */}
            {json_conntent.product.header[locale]}
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-3 mt-2 gap-4">
          
          {json_conntent.product.content.map((item, index) => (
            <div  key={index} className="panel w-full grid text-center rounded-[10px] mb-2 bg-white shadow-[0_1px_10px_rgba(180,181,181,1.3)]">
              <div className=" mb-2" >
                <div className="flex flex-col product-card w-full items-center text-center">
                  <div className="product-card-header flex justify-center items-center w-full">
                      <Image src={item.path} alt="Logo"
                        width={400} height={200}
                        className="rounded-tl-[10px] rounded-tr-[10px] object-contain w-full h-full" />
                    </div>
                  <div className="product-card-content w-full text-center px-4 py-4">
                    <p className="text-[21px] md:text-[21px] text-gray-600">{item.name}</p>
                    <p className="text-[15px] md:text-[15px] text-[#0874B6]">{item.model}</p>
                    <p className="text-[13px] md:text-[13px] text-gray-500">{item.decs[locale]}</p>
                  </div>
                  <div className="product-card-footer py-4">
                    <a type="button" href={`/${locale}/products/${item.product_code}`}
                      className="btn-primary bg-[#0874B6] dark:bg-gray-800 
                      inline-block w-[200px] md:w-[200px]
                      text-white text-[13px] md:text-[13px] 
                      px-4 py-2 rounded-3xl mt-2 hover:underline shadow-[0_1px_10px_rgba(180,181,181,1.3)]"
                    >{common.button.readmore} </a>
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
                <a type="button"  key={locale} href={`/${locale}/product-detail`} className="btn-primary bg-[#0874B6] dark:bg-gray-800 w-auto text-white px-6 py-2 rounded-3xl mt-2 hover:underline">{common.button.readmore}</a>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="section mt-0 sm:mt-2 md:mt-8">
        <div className='text-center mt-3'>
          <label htmlFor="" className='title text-[21px] md:text-[21px] text-[#0874B6] dark:text-[#474747] font-bold'>
            {/* ABOUT US */}
            {json_conntent.aboutus.header[locale]}
          </label>
        </div>
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
              <p className="text-[13px] md:text-[13px] text-gray-500 indent-8  mb-4">
                {/* Softtech Network is a comprehensive technology company. We specialize in providing advanced software development and maintenance services, including AI systems. We are also a distributor of satellite dishes and set-top boxes. Our goal is to understand our clients needs and deliver the best and most suitable solutions. */}
                {json_conntent.aboutus.content[locale]}
              </p>
              <div className='text-center'>
                <a type="button"  key={locale} href={`/${locale}/aboutus`} 
                className="btn-primary bg-[#0874B6] dark:bg-gray-800  
                inline-block w-[200px] md:w-[200px]
                text-white text-[13px] md:text-[13px] 
                px-6 py-2 rounded-3xl mt-2 hover:underline">{common.button.readmore}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
}

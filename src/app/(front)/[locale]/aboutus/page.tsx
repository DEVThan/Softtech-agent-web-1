import Image from 'next/image';

type Locale = "en" | "th" | "mm";

interface AboutPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
const { locale } = await params;

  const json_conntent = {
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
      "mission": {
        "header":{
          "en": "OUR MISSION",
          "th": "พันธกิจของเรา",
          "mm": "ကျွန်ုပ်တို့၏ မစ်ရှင်"
        },
        "content":{
          "en": "We are committed to being a reliable business partner, growing alongside our clients by providing modern and effective technology solutions that enhance their competitive edge and drive their business towards success.",
          "th": "เรามุ่งมั่นที่จะเป็นพันธมิตรทางธุรกิจที่น่าเชื่อถือ เติบโตไปพร้อมกับลูกค้าของเรา โดยการให้โซลูชันเทคโนโลยีที่ทันสมัยและมีประสิทธิภาพ ซึ่งช่วยเพิ่มขีดความสามารถในการแข่งขันและขับเคลื่อนธุรกิจของพวกเขาไปสู่ความสำเร็จ",
          "mm": "ကျွန်ုပ်တို့သည် ယုံကြည်စိတ်ချရသော စီးပွားရေးမိတ်ဖက်တစ်ဦး ဖြစ်ရန် အတည်ပြုထားပြီး ဖောက်သည်များနှင့်အတူ တိုးတက်မှုရှိစေရန် မစ်ရှင်ရှိပါသည်။ ၎င်းတို့၏ ယှဉ်ပြိုင်နိုင်စွမ်းကို မြှင့်တင်ကာ ၎င်းတို့၏ စီးပွားရေးကို အောင်မြင်မှုဆီသို့ ဦးဆောင်သွားစေရန် ခေတ်မီပြီး ထိရောက်သော နည်းပညာဖြေရှင်းချက်များကို ပေးဆောင်ခြင်းဖြင့် ဖြစ်ပါသည်။"
        }
      },
      "products_offerings": {
        "header":{
          "en": "OUR PRODUCTS AND OFFERINGS",
          "th": "ผลิตภัณฑ์และข้อเสนอของเรา",
          "mm": "ကျွန်ုပ်တို့၏ ထုတ်ကုန်များနှင့် ကမ်းလှမ်းချက်များ"
        },
        "content":{
          "en": "We distribute high-quality satellite dishes and set-top boxes, along with complete ready-to-install kits, to ensure you can enjoy your favorite shows with clarity and convenience.",
          "th": "เราจำหน่ายจานดาวเทียมและกล่องรับสัญญาณคุณภาพสูง พร้อมชุดติดตั้งครบวงจร เพื่อให้คุณสามารถเพลิดเพลินกับรายการโปรดของคุณได้อย่างชัดเจนและสะดวกสบาย",
          "mm": "ကျွန်ုပ်တို့သည် အရည်အသွေးမြင့် ဂြိုလ်တုချပ်ပြားများနှင့် စက်တင်ဘောက်စ်များကို ဖြန့်ဝေပြီး တပ်ဆင်ရန် ပြင်ဆင်ထားသော ကစ်များကိုလည်း ပေးဆောင်ပါသည်၊ သင့်အကြိုက်ဆုံး ရုပ်သံအစီအစဉ်များကို ထိရောက်မှုနှင့် အဆင်ပြေမှုဖြင့် ခံစားနိုင်စေရန် ဖြစ်ပါသည်။"
        }
      },
      "services": {
        "header":{
          "en": "OUR SERVICES",
          "th": "บริการของเรา",
          "mm": "ကျွန်ုပ်တို့၏ ဝန်ဆောင်မှုများ" 
        },
        "content":[
          {
            "image": "/front_images/about/software.png",
            "title":{
              "en": "SOFTWARE DEVELOPMENT",
              "th": "พัฒนาซอฟต์แวร์",
              "mm": "ဆော့ဖ်ဝဲ ဖွံ့ဖြိုးရေး"
            },
            "decs":{
              "en": "We create specialized software solutions tailored to your business needs, such as CRM, HRM systems, and other unique applications.",
              "th": "เราสร้างโซลูชันซอฟต์แวร์เฉพาะทางที่ปรับให้เหมาะกับความต้องการทางธุรกิจของคุณ เช่น ระบบ CRM, HRM และแอปพลิเคชันเฉพาะอื่นๆ",
              "mm": "ကျွန်ုပ်တို့သည် သင့်စီးပွားရေးလိုအပ်ချက်များနှင့် ကိုက်ညီသော အထူးပြု ဆော့ဖ်ဝဲ ဖြေရှင်းချက်များကို ဖန်တီးပါသည်၊ CRM၊ HRM စနစ်များနှင့် အခြား ထူးခြားသော အပလီကေးရှင်းများကဲ့သို့။"
            }
          },
          {
            "image": "/front_images/about/application.png",
            "title":{
              "en": "APPLICATION DEVELOPMENT",
              "th": "พัฒนาแอปพลิเคชัน",
              "mm": "အပလီကေးရှင်း ဖွံ့ဖြိုးရေး"
            },
            "decs":{
              "en": "We develop user-friendly, beautiful, and high-performance applications for both iOS and Android platforms.",
              "th": "เราพัฒนาแอปพลิเคชันที่ใช้งานง่าย สวยงาม และมีประสิทธิภาพสูงสำหรับแพลตฟอร์ม iOS และ Android",
              "mm": "ကျွန်ုပ်တို့သည် iOS နှင့် Android ပလက်ဖောင်းများအတွက် အသုံးပြုရလွယ်ကူပြီး လှပသော၊ အမြင့်မားဆုံး စွမ်းဆောင်ရည်ရှိသော အပလီကေးရှင်းများကို ဖွံ့ဖြိုးတည်ဆောက်ပါသည်။"
            }
          },
          {
            "image": "/front_images/about/website.png",
            "title":{
              "en": "WEBSITE DEVELOPMENT",
              "th": "พัฒนาเว็บไซต์",
              "mm": "ဝဘ်ဆိုက် ဖွံ့ဖြိုးရေး"
            },
            "decs":{
              "en": "We build visually appealing and user-friendly websites, complete with secure e-commerce systems that help boost your business sales.",
              "th": "เราสร้างเว็บไซต์ที่น่าดึงดูดใจและใช้งานง่าย พร้อมระบบอีคอมเมิร์ซที่ปลอดภัย ซึ่งช่วยเพิ่มยอดขายธุรกิจของคุณ",
              "mm": "ကျွန်ုပ်တို့သည် မျက်နှာပြင်အလှဆင်မှုကောင်းပြီး အသုံးပြုရလွယ်သော ဝဘ်ဆိုက်များကို တည်ဆောက်ပြီး လုံခြုံသော အီကွန်မားစနစ်များဖြင့် ပြည့်စုံစေပါသည်၊ သင့်စီးပွားရေးရောင်းအားကို မြှင့်တင်ရန် ကူညီပေးပါသည်။"
            }
          }
        ]
      }
    };
  
  return (<>
    <div className="content">
      <div className="section mt-0 sm:mt-2 md:mt-8">
        <div className='text-center mt-3'>
          <label htmlFor="" className='title text-[21px] text-[#0874B6] dark:text-[#474747] font-bold'>
            {/* ABOUT US */}
            {json_conntent.aboutus.header[locale]}
          </label>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-2  panel  px-2 py-2 mb-4">
          <div className='basis-1/3'>
            <div className='h-[150px] sm:h-[200px] md:h-[200px] lg:h-[200px]'>
              <Image src="/front_images/about/about_us.jpg" alt="Logo" width={400} height={200} className="object-cover rounded-[10px] w-full h-full"/>
            </div>
          </div>
          <div className="basis-2/3 flex">
            <div className="rounded-xl px-6 py-6">
              <p className="text-[15px] md:text-[15px] lg:text-[15px] text-gray-500 indent-8 mb-4">
                {/* As a company, we provide comprehensive software development, consultation, and maintenance services, including AI systems. We are also a distributor of satellite dishes and set-top boxes, with over 10 years of experience in the industry. */}
                {json_conntent.aboutus.content[locale]}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section mt-0 sm:mt-2 md:mt-8">
        <div className='text-center mt-3'>
          <label htmlFor="" className='title text-[21px] text-[21px] text-[#0874B6] dark:text-[#474747] font-bold'>
            {/* OUR MISSION */}
            {json_conntent.mission.header[locale]}
          </label>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-2  panel  px-2 py-2 mb-4">
          <div className="basis-2/3 flex">
            <div className="rounded-xl px-6 py-6">
              <p className="text-[15px] md:text-[15px] lg:text-[15px] text-gray-500 indent-8 mb-4">
                {/* We are committed to being a reliable business partner, growing alongside our clients by providing modern and effective technology solutions that enhance their competitive edge and drive their business towards success. */}
                {json_conntent.mission.content[locale]}
              </p>
            </div>
          </div>
          <div className='basis-1/3'>
            <div className='h-[150px] sm:h-[200px] md:h-[200px] lg:h-[200px]'>
              <Image src="/front_images/about/our_mission.png" alt="Logo" width={400} height={200} className="object-cover rounded-[10px] w-full h-full"/>
            </div>
          </div>
         </div>
      </div>

      <div className="section mt-0 sm:mt-2 md:mt-8">
        <div className='text-center mt-3'>
          <label htmlFor="" className='title text-[21px] text-[#0874B6] dark:text-[#474747] font-bold'>
            {/* OUR PRODUCTS AND OFFERINGS */}
            {json_conntent.products_offerings.header[locale]}
          </label>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-2  panel  px-2 py-2 mb-4">
          <div className='basis-1/3'>
            <div className='h-[150px] sm:h-[200px] md:h-[200px] lg:h-[200px]'>
              <Image src="/front_images/about/our_products.jpg" alt="Logo" width={400} height={200} className="object-cover rounded-[10px] w-full h-full"/>
            </div>
          </div>
          <div className="basis-2/3 flex">
            <div className="rounded-xl px-6 py-6">
              <p className="text-[15px] md:text-[15px] lg:text-[15px] text-gray-500 indent-8 mb-4">
                {/* We distribute high-quality satellite dishes and set-top boxes, along with complete ready-to-install kits, to ensure you can enjoy your favorite shows with clarity and convenience. */}
                {json_conntent.products_offerings.content[locale]}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section mt-0 sm:mt-2 md:mt-8">
        <div className='text-center'>
          <label htmlFor="" className='title text-[21px] text-[#0874B6] dark:text-[#474747] font-bold'>
            {/* OUR SERVICES */}
            {json_conntent.services.header[locale]}
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 mt-2 gap-4">
          {json_conntent.services.content.map((item, index) => (
            <div key={index} className="panel mb-2" >
              <div className="flex flex-col items-center text-center p-5">
                <div className='mt-2 flex justify-center'>
                  <Image src={item.image} alt="Logo" width={120} height={120} className="object-cover w-[50%]"/>
                </div>
                <div className='mt-2'>
                  <label className='text-[21px] md:text-[21px] text-gray-600'>{item.title[locale]}</label>
                </div>
                <div className='mt-2'>
                  <p className='text-[13px] md:text-[13px] text-gray-500'>
                    {item.decs[locale]}
                  </p>
                </div>
              </div>
            </div>
            ))
          }
          {/* <div className="panel mb-2" >
            <div className="flex flex-col items-center text-center p-5">
              <div className='mt-2 flex justify-center'>
                <Image src="/front_images/about/software.png" alt="Logo" width={120} height={120} className="object-cover w-[50%]"/>
              </div>
              <div className='mt-2'><label className='text-[21px] md:text-[21px] text-gray-600'>SOFTWARE DEVELOPMENT</label></div>
              <div className='mt-2'><p className='text-[13px] md:text-[13px] text-gray-500'>We create specialized software solutions tailored to your business needs, such as CRM, HRM systems, and other unique applications.</p></div>
            </div>
          </div>
          <div className="panel mb-2" >
            <div className="flex flex-col items-center text-center p-5">
              <div className='mt-2 flex justify-center'>
                <Image src="/front_images/about/application.png" alt="Logo" width={120} height={120} className="object-cover w-[50%]"/>
              </div>
              <div className='mt-2'><label className='text-[21px] md:text-[21px] text-gray-600'>APPLICATION DEVELOPMENT</label></div>
              <div className='mt-2'><p className='text-[13px] md:text-[13px] text-gray-500'>We develop user-friendly, beautiful, and high-performance applications for both iOS and Android platforms.</p></div>
            </div>
          </div>
          <div className="panel mb-2" >
            <div className="flex flex-col items-center text-center p-5">
              <div className='mt-2 flex justify-center'>
                <Image src="/front_images/about/website.png" alt="Logo" width={120} height={120} className="object-cover w-[50%]"/>
              </div>
              <div className='mt-2'><label className='text-[21px] md:text-[21px] text-gray-600'>WEBSITE DEVELOPMENT</label></div>
              <div className='mt-2'><p className='text-[13px] md:text-[13px] text-gray-500'>We build visually appealing and user-friendly websites, complete with secure e-commerce systems that help boost your business sales.</p></div>
            </div>
          </div> */}
        </div>
      </div>
    </div> 
  </>);
}
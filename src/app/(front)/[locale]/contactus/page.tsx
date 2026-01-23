// import { loadLocale } from '@/lib/loadLocale';
// import Carousel from "../components/Carousel";
import Image from 'next/image';

// interface HomePageProps {
//   params: Promise<{ locale: string }>;
// }

type Locale = "en" | "th" | "mm";

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  //const common = loadLocale(locale, 'common');
  // const params = useParams<{ locale: string }>();

  const json_conntent = {
      "contact": {
        "header":{
          "en": "CONTACT US",
          "th": "ติดต่อเรา",
          "mm": "ဆက်သွယ်ရန်"
        },
        "content":{
          "image": {
            "en": "/front_images/contract/contract.jpg",
            "th": "/front_images/contract/contract.jpg",
            "mm": "/front_images/contract/contract.jpg"
          },
          "address": {
            "label": {
              "en": "ADDRESS",
              "th": "ที่อยู่",
              "mm": "လိပ်စာ"
            },
            "detail": {
              "en": "No. 735/4 Building D, Room no. D2 05 2nd floor, Srinakarindra road Suanluang, Bangkok, Thailand 10250",
              "th": "เลขที่ 735/4 อาคาร D ห้องเลขที่ D2 05 ชั้น 2 ถนนศรีนครินทร์ แขวงสวนหลวง กรุงเทพฯ 10250",
              "mm": "အမှတ် ၇၃၅/၄ အဆောက်အအုံ D အခန်းနံပါတ် D2 ၀၅ ဒုတိယထပ်၊ စရင်းနကရင်ဒရာလမ်း ဆွမ်လွှောင်၊ ဘန်ကောက်၊ ထိုင်းနိုင်ငံ ၁၀၂၅၀"
            }
          },
          "contact": {
            "label": {
              "en": "CONTACT",
              "th": "ติดต่อ",
              "mm": "ဆက်သွယ်ရန်"
            },
            "detail": {
              "en": "Phone (+66) 093-939-2636",
              "th": "โทรศัพท์ (+66) 093-939-2636",
              "mm": "ဖုန်း (+66) 093-939-2636"  
            }
          }
        }
      }
    };

  return (<>
    <div className="content">
      <div className="section mt-0 sm:mt-2 md:mt-8 min-h-screen">
        <div className='text-center mt-3'>
          <label htmlFor="" className='title text-[21px] text-[#0874B6] dark:text-[#474747] font-bold'>
            {/* CONTACT US */}
            {json_conntent.contact.header[locale]}
          </label>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-2  panel  px-2 py-2 mb-4">
          <div className='basis-1/2'>
            <div  className='h-[150px] sm:h-[200px] md:h-[400px] lg:h-[500px]'>
              <Image src={json_conntent.contact.content.image[locale]} alt="Logo" width={400} height={200} className="object-cover rounded-[10px] w-full h-full"/>
            </div>
          </div>
          <div className="basis-1/2 flex">
            <div className="rounded-xl px-6 py-6 ">
              {/* <h2 className="text-lg font-bold mb-2">SOFTTECH NETWORK COMPANY LIMITED</h2> */}
              <h2 className='title text-[#0874B6] dark:text-[#474747] '>
                {/* ADDRESS */}
                {json_conntent.contact.content.address.label[locale]}
              </h2>
              <p className="text-[13px] md:text-[13px] text-gray-500 mb-4">
                  {/* No. 735/4 Building D, Room no. D2 05
                  2nd floor, Srinakarindra road
                  Suanluang, Bangkok, Thailand 10250 */}
                  {json_conntent.contact.content.address.detail[locale]}
              </p>

              <h2 className='title text-[#0874B6] dark:text-[#474747] '>{json_conntent.contact.content.contact.label[locale]}</h2>
              <p className="text-[13px] md:text-[13px] text-gray-500 mb-4">
                  {/* Phone (+66) 093-939-2636 */}
                  {json_conntent.contact.content.contact.detail[locale]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
}

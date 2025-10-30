// import { loadLocale } from '@/lib/loadLocale';
// import Carousel from "../components/Carousel";
import Image from 'next/image';

// interface HomePageProps {
//   params: Promise<{ locale: string }>;
// }

export default async function HomePage() {
  //const { locale } = await params;
  //const common = loadLocale(locale, 'common');
  // const params = useParams<{ locale: string }>();

  return (<>
    <div className="content">
      <div className="section min-h-screen">
        <div className='text-center mt-3'><label htmlFor="" className='title text-[#0874B6] dark:text-[#474747]  font-bold'>CONTACT US</label></div>
        <div className="flex flex-col sm:flex-row gap-4 mt-2  panel  px-2 py-2 mb-4">
          <div className='basis-1/2'>
            <div  className='h-[150px] sm:h-[200px] md:h-[400px] lg:h-[500px]'>
              <Image src="/front_images/contract/contract.jpg" alt="Logo" width={400} height={200} className="object-cover rounded-[10px] w-full h-full"/>
            </div>
          </div>
          <div className="basis-1/2 flex">
            <div className="rounded-xl px-6 py-6 ">
              {/* <h2 className="text-lg font-bold mb-2">SOFTTECH NETWORK COMPANY LIMITED</h2> */}
              <h2 className='title text-[#0874B6] dark:text-[#474747] '>ADDRESS</h2>
              <p className="text-sm text-gray-600 mb-4">
                  No. 735/4 Building D, Room no. D2 05
                  2nd floor, Srinakarindra road
                  Suanluang, Bangkok, Thailand 10250
              </p>

              <h2 className='title text-[#0874B6] dark:text-[#474747] '>CONTRACT</h2>
              <p className="text-sm text-gray-600 mb-4">
                  Phone (+66) 093-939-2636
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>);
}

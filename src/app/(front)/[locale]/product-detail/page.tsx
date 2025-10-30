//import { loadLocale } from '@/lib/loadLocale';
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
      <div className="section mt-0 sm:mt-2 md:mt-8">
        {/* <div className='text-center'><label htmlFor="" className='title font-bold'>PRODUCTS</label></div> */}
        <div className="grid grid-cols-1 mt-2 gap-4">
          <Image src="/front_images/products/spec_dish60cm.jpg" alt="Logo" width={400} height={200} className="object-cover our-product rounded-[10px] w-full h-full"/>
        </div>
      </div>
    </div>
  </>);
}

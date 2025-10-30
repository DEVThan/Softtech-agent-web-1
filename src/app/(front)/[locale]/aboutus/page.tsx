import Image from 'next/image';


export default async function AboutPage() {
  
  return (<>
    <div className="content">
      <div className="section">
        <div className='text-center mt-3'><label htmlFor="" className='title text-[#0874B6] dark:text-[#474747]  font-bold'>ABOUT US</label></div>
        <div className="flex flex-col sm:flex-row gap-4 mt-2  panel  px-2 py-2 mb-4">
          <div className='basis-1/3'>
            <div className='h-[150px] sm:h-[200px] md:h-[200px] lg:h-[200px]'>
              <Image src="/front_images/about/about_us.jpg" alt="Logo" width={400} height={200} className="object-cover rounded-[10px] w-full h-full"/>
            </div>
          </div>
          <div className="basis-2/3 flex">
            <div className="rounded-xl px-6 py-6">
              <p className="text-sm text-gray-600 indent-8 mb-4">
                As a company, we provide comprehensive software development, consultation, and maintenance services, including AI systems. We are also a distributor of satellite dishes and set-top boxes, with over 10 years of experience in the industry.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className='text-center mt-3'><label htmlFor="" className='title text-[#0874B6] dark:text-[#474747]  font-bold'>OUR MISSION</label></div>
        <div className="flex flex-col sm:flex-row gap-4 mt-2  panel  px-2 py-2 mb-4">
          <div className="basis-2/3 flex">
            <div className="rounded-xl px-6 py-6">
              <p className="text-sm text-gray-600 indent-8 mb-4">
                We are committed to being a reliable business partner, growing alongside our clients by providing modern and effective technology solutions that enhance their competitive edge and drive their business towards success.
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

      <div className="section">
        <div className='text-center mt-3'><label htmlFor="" className='title text-[#0874B6] dark:text-[#474747]  font-bold'>OUR PRODUCTS AND OFFERINGS</label></div>
        <div className="flex flex-col sm:flex-row gap-4 mt-2  panel  px-2 py-2 mb-4">
          <div className='basis-1/3'>
            <div className='h-[150px] sm:h-[200px] md:h-[200px] lg:h-[200px]'>
              <Image src="/front_images/about/our_products.jpg" alt="Logo" width={400} height={200} className="object-cover rounded-[10px] w-full h-full"/>
            </div>
          </div>
          <div className="basis-2/3 flex">
            <div className="rounded-xl px-6 py-6">
              <p className="text-sm text-gray-600 indent-8 mb-4">
                We distribute high-quality satellite dishes and set-top boxes, along with complete ready-to-install kits, to ensure you can enjoy your favorite shows with clarity and convenience.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section mt-0 sm:mt-2 md:mt-8">
        <div className='text-center'><label htmlFor="" className='title text-[#0874B6] dark:text-[#474747]  font-bold'>OUR SERVICES</label></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 mt-2 gap-4">
          <div className="panel mb-2" >
            <div className="flex flex-col items-center text-center p-5">
              <div className='mt-2 flex justify-center'>
                <Image src="/front_images/about/software.png" alt="Logo" width={120} height={120} className="object-cover w-[50%]"/>
              </div>
              <div className='mt-2'><label className='text-[#0874B6] dark:text-[#474747] '>SOFTWARE DEVELOPMENT</label></div>
              <div className='mt-2'><p>We create specialized software solutions tailored to your business needs, such as CRM, HRM systems, and other unique applications.</p></div>
            </div>
          </div>
          <div className="panel mb-2" >
            <div className="flex flex-col items-center text-center p-5">
              <div className='mt-2 flex justify-center'>
                <Image src="/front_images/about/application.png" alt="Logo" width={120} height={120} className="object-cover w-[50%]"/>
              </div>
              <div className='mt-2'><label className='text-[#0874B6] dark:text-[#474747] '>APPLICATION DEVELOPMENT</label></div>
              <div className='mt-2'><p>We develop user-friendly, beautiful, and high-performance applications for both iOS and Android platforms.</p></div>
            </div>
          </div>
          <div className="panel mb-2" >
            <div className="flex flex-col items-center text-center p-5">
              <div className='mt-2 flex justify-center'>
                <Image src="/front_images/about/website.png" alt="Logo" width={120} height={120} className="object-cover w-[50%]"/>
              </div>
              <div className='mt-2'><label className='text-[#0874B6] dark:text-[#474747] '>WEBSITE DEVELOPMENT</label></div>
              <div className='mt-2'><p>We build visually appealing and user-friendly websites, complete with secure e-commerce systems that help boost your business sales.</p></div>
            </div>
          </div>
        </div>
      </div>
    </div> 
  </>);
}
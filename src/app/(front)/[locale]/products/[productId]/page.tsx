// "use client"
import Image from 'next/image';

export default async function Page({ params }: { params: { productId: string } }) {
  const { productId } = await params;
  let path = "/front_images/products/product_spec/spec_dish60cm.jpg";
  switch (productId) {
    case "20251100001": path = "/front_images/products/product_spec/spec_dish60.jpg"; break;
    case "20251100002": path = "/front_images/products/product_spec/spec_rec_m1.jpg"; break;
    case "20251100003": path = "/front_images/products/product_spec/spec_lnb_m1.jpg"; break;
    default: path = "/front_images/products/product_spec/spec_dish60cm.jpg"; break;
  }
  return (<>
    <div className="content">
      {/* <div className="section mt-0 sm:mt-2 md:mt-8"> */}
      <div className="px-[17px] sm:px-[0px] md:px-[0px] py-2 md:py-0 text-center">
        
        {/* <div className='text-center'><label htmlFor="" className='title font-bold'>PRODUCTS</label></div> */}
        <div className="grid grid-cols-1 mt-2 gap-4">
          <Image src={path} alt="Logo" width={400} height={200} className="object-cover our-product rounded-[10px] w-full h-full"/>
        </div>
      </div>
    </div>
  </>);
}

// import { NextResponse, type NextRequest } from "next/server";

// const supportedLocales = ["th", "en", "mm"];
// const defaultLocale = "th";


// export function middleware(req: NextRequest) {
//   const pathname = req.nextUrl.pathname;

//   // ถ้า path มี locale แล้ว ไม่ต้อง redirect
//   if (supportedLocales.some((locale) => pathname.startsWith(`/${locale}`))) {
//     return NextResponse.next();
//   }
  
//     const countryHeader = req.headers.get("x-test-country")?.toLowerCase();
//     const country = countryHeader || ((req as unknown as { geo?: { country?: string } })?.geo?.country?.toLowerCase() ?? defaultLocale);

//   let locale = defaultLocale;
//   switch (country) {
//     case "mm": locale = "mm"; break;
//     case "en": locale = "en"; break;
//     default: locale = "th"; break;
//   }

//   // redirect ไป path ตาม locale
//   console.log(pathname);
//   if (pathname === "/") {
//     const url = req.nextUrl.clone();
//     url.pathname = `/${locale}/home`;
//     console.log(url);
//     return NextResponse.redirect(url);
//   }

//   // สำหรับ path อื่น ๆ
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/:path*"],
// };



// middleware.ts
import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // ทำงานเฉพาะ root path
  if (pathname === "/") {
    // ตรวจสอบ x-test-country header
    const testCountry = req.headers.get("x-test-country")?.toLowerCase();

    // ตรวจสอบ accept-language
    const acceptLang = req.headers
      .get("accept-language")
      ?.split(",")[0]
      .slice(0, 2)
      .toLowerCase();

    // กำหนด locale
    let locale = "th"; // default
    if (testCountry === "mm") locale = "mm";
    else if (testCountry === "en") locale = "en";
    else if (acceptLang === "mm") locale = "mm";
    else if (acceptLang === "en") locale = "en";

    // redirect ไป locale/home
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/home`;
    console.log(url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // root path
};

"use client";

import { useState, useEffect } from "react";
import { 
  useParams, 
  usePathname
} from "next/navigation";
import Modal from "../components/Modal"; // import component modal
// import Alert from "../../../components/ui/alert/Alert";
import Alert from "../../../(admin)/[locale]/components/ui/alert/Alert";
import { motion, AnimatePresence } from "framer-motion";
// import { useUser } from "../../../(admin)/[locale]/context/UserContext";
// import { useParams } from "next/navigation";

export default function SigninPage() {
    
  // const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "th";
  const route = useParams<{ locale: string }>();

  const [showConfirmForm, setShowConfirmForm] = useState(false);

  // const { setUser } = useUser();
  // const router = useRouter();
  const registration = `/${route.locale}/registration`;
  // const forgotpassword = `/${route.locale}/forgotpassword`;

  const [idcard, setIdcard] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Alert states
  const [showAlert, setShowAlert] = useState(false);
  const [variantAlert, setVariantAlert] = useState<"success" | "error" | "warning" | "info">("info");
  const [titleAlert, setTitleAlert] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  // const [showFailAlert, setShowFailAlert] = useState(false);
  // const [error, setError] = useState("");

  useEffect(() => {
    setShowConfirmForm(false);
  },[]);

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setLoading(true);
    // setError("");

    try {
      const login = `${process.env.NEXT_PUBLIC_API_URL}/api/app/get_agent_idcard`;
      const res = await fetch(login, {
        method: "POST",
        headers: {
              "Content-Type": "application/json",
              "country" : locale,
          },
        body: JSON.stringify({ idcard }),
      });

      const data = await res.json();
      if (data.status == false) {
        setShowConfirmForm(false);
        // setModal({ title:data.message, message: "", details: [], remark: "Please contact the staff/officer.", type: "warnning" });
        setShowAlert(true);
        setVariantAlert("warning");
        setTitleAlert("Warnning");
        setMessageAlert(data.message);
        // setTimeout(() => setShowAlert(false), 3000); 
      }else{
        // show confirm password form
        setShowAlert(false);
        setShowConfirmForm(true);
      }
    } catch (err:unknown) {
      if (err instanceof Error) {
        // setError(err.message);
      } else {
        // setError("Unexpected error occurred");
      }
    } finally {
      // setLoading(false);
    }

  };

  const handleConfirmSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        setShowAlert(true);
        setVariantAlert("warning");
        setTitleAlert("Warnning");
        setMessageAlert("Password and Confirm Password do not match.");
        return; // หยุดการ submit
      }
      // const formData = new FormData(e.currentTarget);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/app/update_newpassword`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "country" : locale,
          },
          body: JSON.stringify({idcard, password}),
          //  body: formData,
      });
      const res = await response.json();
      // const res = { status: false, message : 'message' }; // ✅ สร้าง object ที่มี key 'status'
      if (res.status) {
        // setShowAlert(true); // ✅ แสดง Alert
        // setVariantAlert("success");
        // setTitleAlert("Success");
        // setMessageAlert("Password confirmation was successful");
        // setTimeout(() => setShowAlert(false), 3000);
        // closeModal();

        const result = res.result;
        setModal({ title:res.message, message: "", details: [
          { label: "Username", value: result.username },
          { label: "Password", value: result.password },
        ], remark: "Please save your Username and Password to access the system.", type: "success" });
        
      } else {
        setShowAlert(true);
        setVariantAlert("warning");
        setTitleAlert("Warnning");
        setMessageAlert("Password confirmation was unsuccessful. ");
        // setTimeout(() => setShowAlert(false), 3000); 
      }
    } catch (error) {
        console.error("Error submitting form:", error);
        setShowAlert(true);
        setVariantAlert("error");
        setTitleAlert("Warnning");
        setMessageAlert("Password confirmation was unsuccessful error.");
        // setTimeout(() => setShowAlert(false), 3000); 
    }

    return; // หยุดการ submit

  };

  const [modal, setModal] = useState<{ title: string; message: string;  details: { label: string; value: string }[];  remark: string; type: "success" | "warnning" | "error" } | null>(null)  ;


  return (<>
    <div className="content flex min-h-screen items-center justify-center px-6">
      {!showConfirmForm ? (
        <div className="panel w-full max-w-md rounded-xl shadow-lg p-8">
          <h5 className="title text-[#0874B6] dark:text-[#474747] text-2xl font-bold text-center "> Verify your identity document.  </h5>

          <form onSubmit={handleVerifySubmit} encType="multipart/form-data" className="mt-6 space-y-4">
            <div>
              <label htmlFor="idcard" className="block text-sm font-medium " > ID card / Passport </label>
              <input id="idcard" name="idcard" type="text" placeholder="Enter your ID card / Passport"
                onChange={(e) => setIdcard(e.target.value)}
                required
                className="input-elm mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                px-3 py-2 text-sm shadow-sm 
                focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                "/>
            </div>
            {/* ✅ Alert  showSuccess = true */}
            <AnimatePresence>
              {showAlert && ( 
                <motion.div
                  key="alert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 1 }}
                >
                  <Alert variant={variantAlert} title={titleAlert}  message={messageAlert} showLink={false} />
                </motion.div> 
              )}
            </AnimatePresence>
            <button type="submit"
              className="btn-primary text-white bg-[#0874B6] dark:bg-gray-800  w-full rounded-3xl  px-4 py-2 font-semibold shadow
              hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            > Verify </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              Don’t have an account?{" "}
              <a href={registration} className="title text-[#0874B6] dark:text-[#474747] text-indigo-600 hover:underline"> Register </a>
            </p>
          </div>
        </div>
      ) : (
        <div className="panel w-full max-w-md rounded-xl shadow-lg p-8">
          <h5 className="title text-[#0874B6] dark:text-[#474747] text-2xl font-bold text-center "> Confirm your password.  </h5>

          <form onSubmit={handleConfirmSubmit} encType="multipart/form-data" className="mt-6 space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium " >New password </label>
              <input id="idcard" name="idcard" type="hidden" defaultValue={idcard}/>
              <input id="password" name="password" type="password" placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-elm mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                px-3 py-2 text-sm shadow-sm 
                focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                "/>
            </div>
            <div>
              <label htmlFor="confirm" className="block text-sm font-medium " > Confirm Password </label>
              <input id="confirm" name="confirm" type="password" placeholder="Confirm your password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="input-elm mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
                px-3 py-2 text-sm shadow-sm 
                focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                "/>
            </div>
            {/* ✅ Alert  showSuccess = true */}
            <AnimatePresence>
              {showAlert && ( 
                <motion.div
                  key="alert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 1 }}
                >
                  <Alert variant={variantAlert} title={titleAlert}  message={messageAlert} showLink={false} />
                </motion.div> 
              )}
            </AnimatePresence>
            <button
              type="submit"
              className="btn-primary text-white bg-[#0874B6] dark:bg-gray-800  w-full rounded-3xl  px-4 py-2 font-semibold shadow
              hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            > Submit </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              Don’t have an account?{" "}
              <a href={registration} className="title text-[#0874B6] dark:text-[#474747] text-indigo-600 hover:underline"> Register </a>
            </p>
          </div>
        </div>
      )}
    </div>
    {/* Modal */}
    {modal && ( 
         <Modal 
          title={modal.title} 
          message={modal.message} 
          type={modal.type} 
          details={modal.details}
          remark={modal.remark} 
          onClose={() => {
              setModal(null);
              if(modal.type === "success"){
                  window.location.href = `/${locale}/signin`;
              } 
              // window.location.reload();
          }} /> 
    )}
    </>
  );
  
}

"use client";

import { useState } from "react";
import { 
  useParams, 
  // useRouter 
} from "next/navigation";
import Modal from "../components/Modal"; // import component modal
import { useUser } from "../../../(admin)/[locale]/context/UserContext";
// import { useParams } from "next/navigation";

export default function SigninPage() {
    
  const route = useParams<{ locale: string }>();

  const { setUser } = useUser();
  // const router = useRouter();
  const registration = `/${route.locale}/registration`;
  const forgotpassword = `/${route.locale}/forgotpassword`;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setLoading(true);
    // setError("");

    try {
      const login = `${process.env.NEXT_PUBLIC_API_URL}/admin/login`;
      const res = await fetch(login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.status == false) {
         setModal({ title:data.message, message: "", details: [], remark: "Please contact the staff/officer.", type: "warnning" });
      }else{

        localStorage.setItem("token", data.result.token);
        localStorage.setItem("agentcode", data.result.agentcode);
        localStorage.setItem("agentname", data.result.agentname);
        localStorage.setItem("agentsurname", data.result.agentsurname);
        localStorage.setItem("emailaddress", data.result.emailaddress);
        localStorage.setItem("profilethumnal", data.result.thumnal);
        // localStorage.setItem("agenttelephone", data.result.telephone);
        // localStorage.setItem("agentprovince", data.result.province);
        localStorage.setItem("username", data.result.username);

        setUser(data.result.agentname, data.result.agentsurname, data.result.telephone, data.result.emailaddress, data.result.province, data.result.thumnal );
        
        // router.push(`/${route.locale}/admin/profile`);
        window.location.href = `/${route.locale}/admin/profile`;
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

  // const [modal, setModal] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [modal, setModal] = useState<{ title: string; message: string;  details: { label: string; value: string }[];  remark: string; type: "success" | "warnning" | "error" } | null>(null)  ;


  return (<>
    <div className="content flex min-h-screen items-center justify-center px-6">
      <div className="panel w-full max-w-md rounded-xl shadow-lg p-8">
        <h2 className="title text-[#0874B6] dark:text-[#474747] text-2xl font-bold text-center "> Signin </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium " > Username </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input-elm mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 
              px-3 py-2 text-sm shadow-sm 
              focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
              "
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium " > Password </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-elm mt-1 block w-full  border border-gray-300 dark:border-gray-600 
              px-3 py-2 text-sm shadow-sm 
              focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
              "
            />
          </div>

          {/* Signin Button */}
          <button
            type="submit"
            className="btn-primary text-white bg-[#0874B6] dark:bg-gray-800  w-full rounded-3xl  px-4 py-2 font-semibold shadow
            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          > Sign In </button>
        </form>

        {/* Extra links */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Don’t have an account?{" "}
            <a href={registration} className="title text-[#0874B6] dark:text-[#474747] text-indigo-600 hover:underline"> Register </a>
          </p>

          <p> <a href={forgotpassword} className="title text-[#0874B6] dark:text-[#474747] hover:underline"  > Forgot Password? </a> </p>
        </div>
      </div>
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
            if(modal.type === "success") window.location.reload();
            // window.location.reload();
          }} />  
    )}
    </>
  );
  
}

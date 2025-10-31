"use client";
// import UserAddressCard from "./UserAddressCard";
// import UserInfoCard from "./UserInfoCard";
// import UserMetaCard from "./UserMetaCard";

// import { Metadata } from "next";
import React from "react";
import { useUser } from "../../../context/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect} from "react";
import { useRouter, usePathname } from "next/navigation";

import { useModal } from "../../../hooks/useModal";
import { Modal } from  "../../../components/ui/modal";
import AgentModel  from "./agent-model";
import Alert from "../../../components/ui/alert/Alert";

import Button from "../../../components/ui/button/Button";
import Label from "../../../components/form/Label";

import Image from "next/image";


// export const metadata: Metadata = {
//   title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };


export default function Profile() {
  const { setUser } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "th";


  const { isOpen, openModal, closeModal } = useModal();
  const [agent, setAgent] = useState<AgentModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);
  // const [editformData, setEditFormData] = useState<AgentModel | null>(null);

  async function fetchProfile() {
    try {
      const token = localStorage.getItem("token");
      const agentcode = localStorage.getItem("agentcode");
      if (!token || !agentcode) {
        console.warn("No token or agentcode found");
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/get_profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "country" : locale,
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ agentcode }),
      });

      const data = await response.json();
      if (data.status) {
        setAgent(data.result[0]);

        // const storedName = data.result[0].agentname;
        // if (storedName) setAgentName(storedName);
        // const storedSurName = data.result[0].agentsurname;
        // if (storedSurName) setAgentSurName(storedSurName);
        // const storedEmailAddress = data.result[0].emailaddress;
        // if (storedEmailAddress) setEmailAddress(storedEmailAddress);

      } else {
        if (!data.status && data.message === "Invalid token") { router.push(`/${locale}/signin`); return;  }
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const tokenStorage = localStorage.getItem("token");
    const agentcodeStorage = localStorage.getItem("agentcode");
    if (!tokenStorage) { router.push(`/${locale}/signin`);  return; }
    if (tokenStorage && agentcodeStorage) {
      fetchProfile();
    }
  },[router, locale]);

  if (loading) return <p>Loading profile...</p>;
  if (!agent) return <p>No profile data.</p>;
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  // const onSubmit = async (data: AgentModel) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/update_profile`, {
          method: "POST",
          headers: {
              // "Content-Type": "application/json",
              "country" : locale,
              "Authorization": `Bearer ${token}`,
          },
          // body: JSON.stringify(data),
           body: formData,
      });
      const res = await response.json();
      if (res.status) {
        // setAgent(responsive.result[0]);
        // console.log(res);
        const agentResult = res.result[0];

       // update localStorage
        // localStorage.setItem("agentname", res.result.agentname);
        // localStorage.setItem("agentsurname", res.result.agentsurname);
        // localStorage.setItem("emailaddress", res.result.emailaddress);
        // localStorage.setItem("profilethumnal", res.result.thumnal);
        // setLocalStorageAgentName(localStorage.getItem("agentname") || "");
        // setLocalStorageAgentsurname(localStorage.getItem("agentsurname") || "");
        // setLocalStorageAgentemailaddress(localStorage.getItem("emailaddress") || "");
        // setLocalStorageProfileThumnal(localStorage.getItem("profilethumnal") || "");

        setUser(agentResult.agentname, agentResult.agentsurname, agentResult.telephone, agentResult.emailaddress, agentResult.province, agentResult.thumnal );
        


        await fetchProfile();// ✅ reload profile


        // const storedName = localStorage.getItem("agentname");
        // if (storedName) setAgentName(storedName);
        // const storedSurName = localStorage.getItem("agentsurname");
        // if (storedSurName) setAgentSurName(storedSurName);
        // const storedEmailAddress = localStorage.getItem("emailaddress");
        // if (storedEmailAddress) setEmailAddress(storedEmailAddress);

        setShowFailAlert(false);
        setShowSuccessAlert(true); // ✅ แสดง Alert
        setTimeout(() => setShowSuccessAlert(false), 3000);
        // closeModal();
      } else {
        console.error("API Error:", res.message);
        setShowSuccessAlert(false);
        setShowFailAlert(true);
        setTimeout(() => setShowFailAlert(false), 3000); 
      }
    } catch (error) {
        console.error("Error submitting form:", error);
        setShowSuccessAlert(false);
        setShowFailAlert(true);
        setTimeout(() => setShowFailAlert(false), 3000); 
    }
    closeModal();
  };

  
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          
          {/* ✅ Alert  showSuccess = true */}
          <AnimatePresence>
            {showSuccessAlert && ( 
              <motion.div
                key="alert"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1 }}
              >
                <Alert variant="success" title="Success"  message="Data has been updated successfully." showLink={false} />
              </motion.div> 
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showFailAlert && ( 
              <motion.div
                key="alert"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 1 }}
              >
                <Alert variant="warning" title="Warning Message"  message="Data has been updated un successfully." showLink={false} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* <UserMetaCard agent={agent} /> */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
                <div className="w-20 h-20 flex items-center justify-center overflow-hidden border-2 border-gray-900 dark:border-[#0874B6] rounded-full ">
                  <Image
                    width={80}
                    height={80}
                    src={
                      agent?.thumnal
                        ? `${process.env.NEXT_PUBLIC_API_URL}/${agent.thumnal}`
                        : "/images/user/owner.jpg"
                    }
                    alt="user"
                    className="object-cover object-center w-full h-full"
                  />
                </div>

                <div className="order-3 xl:order-2">
                  <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left"> {agent.agentname} {agent.agentsurname} </h4>
                  <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Team Manager
                    </p>
                    <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                    <p className="text-sm text-gray-500 dark:text-gray-400"> {agent.country} </p>
                  </div>
                </div>
              </div>
              <button
                onClick={openModal}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
              >
                <svg
                  className="fill-current"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206ZM12.9698 3.84272C13.2627 3.54982 13.7376 3.54982 14.0305 3.84272L14.6934 4.50563C14.9863 4.79852 14.9863 5.2734 14.6934 5.56629L14.044 6.21573L12.3204 4.49215L12.9698 3.84272ZM11.2597 5.55281L5.6359 11.1766C5.53309 11.2794 5.46238 11.4099 5.43238 11.5522L5.01758 13.5185L6.98394 13.1037C7.1262 13.0737 7.25666 13.003 7.35947 12.9002L12.9833 7.27639L11.2597 5.55281Z"
                    fill=""
                  />
                </svg>
                Edit
              </button>
            </div>
          </div>

          {/* <UserInfoCard  agent={agent}/> */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
                  Personal Information
                </h4>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"> First Name </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90"> {agent.agentname ?agent.agentname : "-" } </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"> Last Name </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90"> {agent.agentsurname ?agent.agentsurname : "-" }</p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">  Email address </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90"> {agent.emailaddress ?agent.emailaddress : "-" }</p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"> Phone </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90"> {agent.telephone ?agent.telephone : "-" }</p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"> Bio </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90"> Team Manager </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <UserAddressCard  agent={agent}/> */}
          <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6"> Address </h4>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1 mb-3">
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"> Address </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90"> {agent.addr1 ?agent.addr1 : "-" } </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"> Country </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90"> {agent.country ?agent.addr1 : "-"} </p>
                  </div>

                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"> Street </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90"> {agent.street ?agent.street : "-"} </p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"> Sub district </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90"> {agent.subdistrict ? agent.subdistrict : "-" } </p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"> District </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90"> {agent.district?agent.district :  "-"} </p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"> Province </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90"> {agent.province ?agent.province : "-"} </p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400"> Postal Code </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90"> {agent.postalcode ?agent.postalcode : "-"} </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Modal */}
          <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
            <div className="relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 max-h-[70vh]">
              <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90"> Edit Personal Information </h4>
                <p className="mb-1 text-sm text-gray-500 dark:text-gray-400 lg:mb-1"> Update your details to keep your profile up-to-date. </p>
              </div>
              <form onSubmit={onSubmit} encType="multipart/form-data"  className="flex flex-col gap-4 p-4">
                <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
                  <div className="mt-1">
                    <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-1"> Personal Information </h5>
                    {/* <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1  mb-3">
                      <div>
                        <Label>Id Card</Label>
                        <p className="text-sm text-gray-500 dark:text-gray-400"> {agent.cardno} </p>
                      </div>
                    </div> */}

                    {/* <Input type="hidden" name="agentcode" defaultValue={agent.agentcode}/> */}
                    <input  type="hidden" name="agentcode" defaultValue={agent.agentcode}/>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1">{/* ✅ Browse Image File */}
                      <div className="col-span-1 lg:col-span-1">
                        <Label htmlFor="image">Thumnal</Label>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-5 xl:grid-cols-5 mt-3">
                            <div className="relative inline-block group">
                              <Image
                                // src={`${process.env.NEXT_PUBLIC_API_URL}/${agent.thumnal}`}
                                src={
                                  agent?.thumnal
                                    ? `${process.env.NEXT_PUBLIC_API_URL}/${agent.thumnal}`
                                    : "/images/user/owner.jpg"
                                }
                                alt=" grid"
                                className=" w-full border border-gray-200 rounded-xl dark:border-gray-800"
                                width={338}
                                height={192}
                              />
                            </div>
                        </div>
                        <input
                          id="thumnal"
                          type="file"
                          name="thumnal"
                          accept="image/*"
                          // multiple
                          max={1}
                          className="mt-1 mb-3 block w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-400 
                          file:mr-4 file:rounded-md file:border-0 file:bg-brand-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white 
                          hover:file:bg-brand-700 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10
                          dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:file:bg-brand-800"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">{/* ✅ Browse Image File */}
                      
                      <div className="col-span-2 lg:col-span-1">
                        <Label>First Name</Label>
                         <input type="text" name="agentname" defaultValue={agent.agentname || ""} required
                          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                        />
                      </div>

                      <div className="col-span-2 lg:col-span-1">
                        <Label>Last Name</Label>
                        <input type="text" name="agentsurname" defaultValue={agent.agentsurname || ""} required
                          // className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                        />
                      </div>

                      <div className="col-span-2 lg:col-span-1">
                        <Label>Email Address</Label>
                        {/* <Input type="text" name="emailaddress" defaultValue={agent.emailaddress} /> */}
                        <input  type="text" name="emailaddress"  className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                        defaultValue={agent.emailaddress}/>
                      </div>

                      <div className="col-span-2 lg:col-span-1">
                        <Label>Phone</Label>
                        {/* <Input type="text" name="telephone" defaultValue={agent.telephone} {...{ required: true }}/> */}
                        <input type="text" name="telephone" defaultValue={agent.telephone || ""} required
                          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                        />
                      </div>

                      {/* <div className="col-span-2">
                        <Label>Bio</Label>
                        <Input type="text" name="Bio" defaultValue="Team Manager" />
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="px-2 overflow-y-auto custom-scrollbar mt-5">
                  
                    <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-1"> Address </h5>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1  mb-3">
                      <div>
                        <Label>Address</Label>
                        <textarea rows={2} name="addr1" defaultValue={agent.addr1 || ""} required
                          // className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm"
                          className="w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs 
                          focus:outline-hidden  bg-transparent text-gray-400 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 
                          dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                      <div>
                        <Label>Country</Label>
                        {/* <Input type="text" name="country" defaultValue={agent.country} /> */}
                        <input  type="text" name="country" className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                        defaultValue={agent.country}/>
                      </div>

                      <div>
                        <Label>Street</Label>
                        {/* <Input type="text" name="street" defaultValue={agent.street} /> */}
                        <input  type="text" name="street" className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                        defaultValue={agent.street}/>
                      </div>
                      <div>
                        <Label>Sub district</Label>
                        {/* <Input type="text" name="subdistrict" defaultValue={agent.subdistrict} /> */}
                        <input  type="text" name="subdistrict" className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                        defaultValue={agent.subdistrict}/>
                      </div>
                      <div>
                        <Label>District</Label>
                        {/* <Input type="text" name="district" defaultValue={agent.district} {...{ required: true }}/> */}
                        <input type="text" name="district" defaultValue={agent.district || ""} required
                          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                        />
                      </div>
                      <div>
                        <Label>Province</Label>
                        {/* <Input type="text" name="province" defaultValue={agent.province} {...{ required: true }}/> */}
                        <input type="text" name="province" defaultValue={agent.province || ""} required
                          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                        />
                        </div>
                      <div>
                        <Label>Postal Code</Label>
                        {/* <Input type="text" name="postalcode" defaultValue={agent.postalcode} {...{ required: true }}/> */}
                        <input type="text" name="postalcode" defaultValue={agent.postalcode || ""} required
                          className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                        />
                        </div>

                      {/* <div>
                        <Label>TAX ID</Label>
                        <Input type="text" defaultValue="AS4568384" />
                      </div> */}
                    </div>
                </div>
                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                  <Button size="sm" variant="outline" onClick={closeModal}> Close </Button>
                  {/* <Button size="sm"> <button type="submit"> Save Changes  </button> </Button> */}
                  <button type="submit" className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition  
                  px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 ">  {loading ? "Save..." : "Save"} </button>
              
                </div>
              </form>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}


"use client";
// import ComponentCard from "../../../components/common/ComponentCard";
// import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
// import BasicTableOne from "../../../components/tables/BasicTableOne";
// import { Metadata } from "next";
import React from "react";
import { useState, useEffect } from "react";
import { Eye, Trash2 } from "lucide-react";
// import { useRouter } from "next/router";
// import { useRouter } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";


import { useModal } from "../../../hooks/useModal";
import { Modal } from  "../../../components/ui/modal";

import PerformanceModel  from "./model";
import { motion, AnimatePresence } from "framer-motion";
import Alert from "../../../components/ui/alert/Alert";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/form/input/InputField";
// import Textarea from "../../../components/form/input/TextArea";
import Label from "../../../components/form/Label";

//table
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

import Pagination  from "./Pagination";

// import Badge from "../ui/badge/Badge";
// import Badge from "../../../components/ui/badge/Badge";
import Image from "next/image";


// export const metadata: Metadata = {
//   title: "Next.js Basic Table | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Basic Table  page for TailAdmin  Tailwind CSS Admin Dashboard Template",
//   // other metadata
// };

export default function PerfomancePage() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "th";

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [agentcode, setAgentcode] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 50;
  const [perefomanceResult, setPerformance] = useState<PerformanceModel[] | null>(null);
  const [EditformData, setEditFormData] = useState<PerformanceModel | null>(null);

  //Modal
  const { isOpen: isAddModalOpen, openModal: openAddModal, closeModal: closeAddModal, } = useModal();
  const { isOpen: isEditModalOpen, openModal: openEditModal, closeModal: closeEditModal, } = useModal();
  const { isOpen: isViewModalOpen, openModal: openViewModal, closeModal: closeViewModal, } = useModal();
  // const { isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal, } = useModal();

  const [showInsertSuccessAlert, setShowInsertSuccessAlert] = useState(false);
  const [showInsertFailAlert, setShowInsertFailAlert] = useState(false);
  const [showUpdateSuccessAlert, setShowUpdateSuccessAlert] = useState(false);
  const [showUpdateFailAlert, setShowUpdateFailAlert] = useState(false);

  // File
  const [addMaxFile, setAddMaxFile] = useState(5);
  const [addFileWarningAlert, setAddFileWarningAlert] = useState(false);
  const [addFileWarningAlertMessage, setAddFileWarningAlertMessage] = useState("");
  const [editMaxFile, setEditMaxFile] = useState(5);
  const [editFileWarningAlert, setEditFileWarningAlert] = useState(false);
  const [editFileWarningAlertMessage, setEditFileWarningAlertMessage] = useState("");
  const [viewFilePath, setViewFilePath] = useState("");


  useEffect(() => {
    const tokenStorage = localStorage.getItem("token");
    const agentcodeStorage = localStorage.getItem("agentcode");
    if (!tokenStorage) { router.push(`/${locale}/signin`);  return; }
    if (tokenStorage && agentcodeStorage) {
      setToken(tokenStorage);
      setAgentcode(agentcodeStorage);
      fetchProfile(tokenStorage, agentcodeStorage);
    }
  },[currentPage]);
  
  //get result
  async function fetchProfile(token: string, agentcode: string) {
      try {
        if (!token || !agentcode) { console.warn("No token or agentcode found"); return; }else{}
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/all_performance`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "country" : locale,
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ 
            agentcode : agentcode,
            page: currentPage,
            limit: itemsPerPage, 
          }),
        });
  
        const data = await response.json();
        if (data.status) {
          setPerformance(data.result);
          setTotalPages(data.totalPages);
        } else {
          if (!data.status && data.message === "Invalid token") { router.push(`/${locale}/signin`); return;  }
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
  }
  // if (loading){ return <p>Loading profile...</p>;}
  // if (!agent) return <p>No profile data.</p>;
  

  function handleAddFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const maxFiles = 5;
    setAddMaxFile(maxFiles);
    if (files.length > maxFiles) {
      setAddFileWarningAlertMessage(`Maximum upload limit is ${maxFiles} image(s).`); // ✅ set ข้อความ
      setAddFileWarningAlert(true);
      e.target.value = ""; // ล้างค่า

      setTimeout(() => {
        setAddMaxFile(maxFiles);
        setAddFileWarningAlert(false);
        setAddFileWarningAlertMessage("");
      }, 5000);
      return;
    }
    console.log("เลือกไฟล์แล้ว:", files);
  }
  function handleEditFileChange(e: React.ChangeEvent<HTMLInputElement>, alertCount: number) {
    const files = e.target.files;
    if (!files) return;

    if(alertCount >= 5){
      setEditMaxFile(alertCount);
      setEditFileWarningAlertMessage(`You can’t upload more files.`);
      setEditFileWarningAlert(true);
      e.target.value = ""; // ล้างค่า
      return;
    }

    if(alertCount < 5){
      const maxFiles = (5 - alertCount);
      setEditMaxFile(maxFiles);
      if (files.length > maxFiles) {
        setEditFileWarningAlertMessage(`Maximum upload limit is ${maxFiles} image(s).`); // ✅ set ข้อความ
        setEditFileWarningAlert(true);
        e.target.value = ""; // ล้างค่า

        setTimeout(() => {
          setEditMaxFile(5);
          setEditFileWarningAlert(false);
          setEditFileWarningAlertMessage("");
        }, 5000);
        return;
      }
    }
  }


  // Modal add form
  const handleAddSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/create_performance`, {
          method: "POST",
          headers: {
              // "Content-Type": "application/json",
               "country" : locale,
              "Authorization": `Bearer ${token}`,
          },
          body: formData,
      });
      const res = await response.json();
      if (res.status) {
        await fetchProfile(token, agentcode);// ✅ reload profile

        setShowInsertFailAlert(false);
        setShowInsertSuccessAlert(true); // ✅ แสดง Alert
        setTimeout(() => setShowInsertSuccessAlert(false), 3000);
        closeAddModal();
      } else {
        if (!res.status && res.message === "Invalid token") { router.push(`/${locale}/signin`); return;  }
        console.error("API Error:", res.message);
        setShowInsertSuccessAlert(false);
        setShowInsertFailAlert(true);
        setTimeout(() => setShowInsertFailAlert(false), 3000); 
      }
    } catch (error) {
        console.error("Error submitting form:", error);
        setShowInsertSuccessAlert(false);
        setShowInsertFailAlert(true);
        setTimeout(() => setShowInsertFailAlert(false), 3000); 
    } finally {
      setLoading(false);
    }
    // closeAddModal();
  };
  function EditModal(item: PerformanceModel) { openEditModal(); setEditFormData(item);  }
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/update_performance`, {
          method: "POST",
          headers: {
              // "Content-Type": "application/json",
              "country" : locale,
              "Authorization": `Bearer ${token}`,
          },
          body: formData,
      });
      const res = await response.json();
      if (res.status) {
        await fetchProfile(token, agentcode);

        setShowUpdateFailAlert(false);
        setShowUpdateSuccessAlert(true);
        setTimeout(() => setShowUpdateSuccessAlert(false), 3000);
        closeEditModal();
      } else {
        if (!res.status && res.message === "Invalid token") { router.push(`/${locale}/signin`); return;  }
        
        console.error("API Error:", res.message);
        setShowUpdateSuccessAlert(false);
        setShowUpdateFailAlert(true);
        setTimeout(() => setShowUpdateFailAlert(false), 3000); 
      }
    } catch (error) {
        console.error("Error submitting form:", error);
        setShowUpdateSuccessAlert(false);
        setShowUpdateFailAlert(true);
        setTimeout(() => setShowUpdateFailAlert(false), 3000); 
    } finally {
      setLoading(false);
    }
    // closeEditModal();
  };
  function fileOnViewModal(id: number,path:string) { 
    setViewFilePath(path);
    openViewModal(); 
    console.log(path);
    // setEditFormData(item);  
  }
  const handleDeleteFile = async (performancecode:string,  fileid: number, path:string) => { 
    const isConfirmed = window.confirm("Are you sure you want to delete this file?");
    if (isConfirmed) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/delete_performance_file`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              "country" : locale,
              "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ performancecode:performancecode, fileid: fileid, filepath: path }),
      });
      const res = await response.json();
      if (res.status) {
        await fetchProfile(token, agentcode);

        // setShowUpdateFailAlert(false);
        // setShowUpdateSuccessAlert(true);
        // setTimeout(() => setShowUpdateSuccessAlert(false), 3000);
        closeEditModal();
        // openEditModal();
      } else {
        if (!res.status && res.message === "Invalid token") { router.push(`/${locale}/signin`); return;  }
        
        // console.error("API Error:", res.message);
        // setShowUpdateSuccessAlert(false);
        // setShowUpdateFailAlert(true);
        // setTimeout(() => setShowUpdateFailAlert(false), 3000); 
      }

      // setEditformData((prev) => ({
      //   ...prev,
      //   files: prev.files.filter((f) => f.id !== fileId),
      // }));
      // ถ้าต้องการ, ต่อ API delete file ด้วย
    }
    // setViewFilePath(path);
    // openViewModal(); 
    // console.log(path);
    // setEditFormData(item);  
  }

  // Pagination
  const handlePageChange = async (page: number) => { setCurrentPage(page); }; 

  return (
    <div>
      {/* <PageBreadcrumb pageTitle="Basic Table" /> */}
      {/* <ComponentCard title="Performance"> */}
      {/* </ComponentCard> */}

      <div className="space-y-6">
        <div className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]`} >
          <div className="px-6 py-5">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <h3 className="text-base font-medium text-gray-800 dark:text-white/90 text-center xl:text-lef"> Jobs </h3>
              <button
                onClick={openAddModal}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
              >
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z"
                  />
                </svg>
                Add
              </button>
            </div>

            {/* ✅ Alert  showSuccess = true */}
            <AnimatePresence>
              {showInsertSuccessAlert && ( 
                <motion.div
                  key="alert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 1 }}
                  className="mt-3"
                >
                  <Alert variant="success" title="Success" message="Data has been insert successfully." showLink={false} />
                </motion.div> 
              )}

              {showInsertFailAlert && ( 
                <motion.div
                  key="alert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 1 }}
                  className="mt-3"
                >
                  <Alert variant="warning" title="Warning Message"  message="Data has been insert un successfully." showLink={false} />
                </motion.div>
              )}

              {showUpdateSuccessAlert && ( 
                <motion.div
                  key="alert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 1 }}
                  className="mt-3"
                >
                  <Alert variant="success" title="Success"  message="Data has been updated successfully." showLink={false} />
                </motion.div> 
              )}

              {showUpdateFailAlert && ( 
                <motion.div
                  key="alert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 1 }}
                  className="mt-3"
                >
                  <Alert variant="warning" title="Warning Message"  message="Data has been updated un successfully." showLink={false} />
                </motion.div>
              )}
            </AnimatePresence>

          </div>
          <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
            <div className="space-y-6">

              {/* Table */}
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                <div className="max-w-full overflow-x-auto">
                  <div className="min-w-[1102px]">
                    <Table>
                      {/* Table Header */}
                      <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                        <TableRow>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            Job
                          </TableCell>
                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            File
                          </TableCell>

                          <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                          >
                            Edit
                          </TableCell>
                        </TableRow>
                      </TableHeader>

                      {/* Table Body */}
                      <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {perefomanceResult?.map((item, index) => (
                          
                          <TableRow key={index}>
                            <TableCell className="px-5 py-4 sm:px-6 text-start">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 ">
                                  {item.files.length ? (
                                    <div className="relative mr-3 overflow-hidden border-2 border-gray-900 dark:border-[#0874B6] rounded-full w-10 h-10 flex items-center justify-center bg-gray-100">
                                    <button onClick={() => fileOnViewModal(0, item.files[0].path)} className="flex -space-x-2 items-center" >
                                      <Image
                                        width={40}
                                        height={40}
                                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item.files[0].path}`}
                                        alt={item.name}
                                        className="object-cover object-center w-full h-full"
                                      />
                                    </button>
                                    </div>
                                  ) : null}
                                </div>
                                <div>
                                  <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90"> {item.name} </span>
                                  <span className="block text-gray-500 text-theme-xs dark:text-gray-400"> {item.description} </span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              <div className="flex -space-x-2">
                                {item.files.map((item, index) => (
                                  <div key={index} className="w-6 h-6 overflow-hidden border-2 border-gray-900 dark:border-[#0874B6] rounded-full " >
                                    <button onClick={() => fileOnViewModal(item.id, item.path)} className="flex -space-x-2 items-center" >
                                      <div className="w-6 h-6 items-center  justify-center">
                                        <Image width={40} height={40}
                                          src={`${process.env.NEXT_PUBLIC_API_URL}/${item.path}`}
                                            alt=""
                                          className="object-cover object-center w-full h-full"
                                        />
                                      </div>
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              <div className="flex -space-x-2">
                                <button
                                  // onClick={openEditModal}
                                  onClick={() => EditModal(item)}
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
                                  
                                </button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
              {/* Pagination Component */}
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </div>
        </div>

        {/* Add Modal */}
        <Modal isOpen={isAddModalOpen} onClose={closeAddModal} className="max-w-[700px] m-4">
          <div className="relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 max-h-[70vh]">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90"> Add Job </h4>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7"> Insert your Job. </p>
            </div>
            <form onSubmit={handleAddSubmit} encType="multipart/form-data"  className="flex flex-col">
              <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
                <div className="mt-1">
                  <Input type="hidden" name="agentcode"  defaultValue={agentcode || ""} />
                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1  mb-3">
                    <div className="col-span-2 lg:col-span-1">
                      <Label>Job name</Label>
                      <Input type="text" name="name"  {...{ required: true }} />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                      <Label>Description</Label>
                      <textarea
                        rows={2}
                        name="desc"
                        placeholder=""
                        required
                        // defaultValue={}
                        className="w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs 
                        focus:outline-hidden  bg-transparent text-gray-400 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 
                        dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                      />
                    </div>

                    {/* ✅ Browse Image File */}
                    <div className="col-span-2 lg:col-span-1">
                      <Label htmlFor="image">Image</Label>
                      <AnimatePresence>
                        {addFileWarningAlert && ( 
                          <motion.div
                            key="alert"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 1 }}
                          >
                            <Alert variant="warning" title="Warning Message"  message={addFileWarningAlertMessage} showLink={false} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <input
                        id="image"
                        type="file"
                        name="files"
                        accept="image/*"
                        multiple
                        onChange={handleAddFileChange}
                        max={addMaxFile}
                        className="mt-1 block w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-400 
                        file:mr-4 file:rounded-md file:border-0 file:bg-brand-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white 
                        hover:file:bg-brand-700 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10
                        dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:file:bg-brand-800"
                      />
                      <p className="text-sm">kcsodksdo</p>
                    </div>

                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button size="sm" variant="outline" onClick={closeAddModal}> Close </Button>
                <button type="submit" className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition  
                px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 ">  {loading ? "Save..." : "Save"} </button>
              </div>
            </form>
          </div>
        </Modal>

        {/* Edit Modal */}
        <Modal isOpen={isEditModalOpen} onClose={closeEditModal} className="max-w-[700px] m-4">
          <div className="relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11 max-h-[70vh]">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90"> Edit Job </h4>
              <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7"> Edit your Job. </p>
            </div>
            <form onSubmit={handleEditSubmit} encType="multipart/form-data"  className="flex flex-col">
              <div className="custom-scrollbar overflow-y-auto px-2 pb-3">
                <div className="mt-1">
                  <Input type="hidden" name="agentcode" defaultValue={EditformData?.agentcode || ""}/>
                  <Input type="hidden" name="performancecode" defaultValue={EditformData?.performancecode || ""}/>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-1  mb-3">
                    <div className="col-span-2 lg:col-span-1">
                      <Label>Job name</Label>
                      <Input type="text" name="name"  
                        defaultValue={EditformData?.name || ""} 
                        onChange={(e) => setEditFormData({ ...EditformData!, name: e.target.value }) }
                        {...{ required: true }} 
                      />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                      <Label>Description</Label>
                      <textarea
                        rows={2}
                        name="desc"
                        placeholder=""
                        required
                        defaultValue={EditformData?.description || ""} 
                        onChange={(e) => setEditFormData({ ...EditformData!, description: e.target.value }) }
                        className="w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs 
                        focus:outline-hidden  bg-transparent text-gray-400 border-gray-300 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 
                        dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800"
                      />
                    </div>
                    {/* ✅ Browse Image File */}
                    <div className="col-span-2 lg:col-span-1">
                      <Label htmlFor="image">Image</Label>
                      
                      {/* ✅ Alert  showSuccess = true */}
                      <AnimatePresence>
                        {editFileWarningAlert && ( 
                          <motion.div
                            key="alert"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 1 }}
                          >
                            <Alert variant="warning" title="Warning Message"  message={editFileWarningAlertMessage} showLink={false} />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-5 xl:grid-cols-5 mt-3">
                        {EditformData?.files?.map((item) => (
                          <div key={item.id} className="relative inline-block group ">
                            <Image
                              src={`${process.env.NEXT_PUBLIC_API_URL}/${item.path}`}
                              alt=" grid"
                              className=" w-full border-2 border-gray-900 dark:border-[#0874B6] rounded-xl "
                              width={338}
                              height={192}
                            />

                            {/* ปุ่ม Overlay */}
                            <div
                              className=" absolute inset-0 flex items-center justify-center gap-3 rounded-xl transition-opacity duration-300  opacity-100  " >
                              {/* ปุ่ม View */}
                              <button type="button"
                                onClick={() => fileOnViewModal(item.id, item.path)}
                                className="flex items-center gap-1 px-2 py-2 text-sm font-medium text-white bg-black/50  rounded-full hover:bg-blue-700">
                                <Eye size={18} />
                              </button>

                              {/* ปุ่ม Delete */}
                              <button type="button"
                                onClick={() => handleDeleteFile(EditformData?.performancecode, item.id, item.path)}
                                className="flex items-center gap-1 px-2 py-2 text-sm font-medium text-white bg-black/50  rounded-full hover:bg-red-700">
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                          
                        ))}
                      </div>
                      <input
                        id="image"
                        type="file"
                        name="files"
                        accept="image/*"
                        multiple
                        // onChange={handleEditFileChange}
                        onChange={(e) => handleEditFileChange(e, EditformData?.files?.length ?? 0)}
                        max={editMaxFile}
                        className="mt-1 block w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-400 
                        file:mr-4 file:rounded-md file:border-0 file:bg-brand-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white 
                        hover:file:bg-brand-700 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10
                        dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:file:bg-brand-800"
                      />
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-400">You can upload a maximum of 5 images.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                <Button size="sm" variant="outline" onClick={closeEditModal}> Close </Button>
                {/* <Button size="sm"> <button type="submit"> Save </button> </Button> */}
                <button type="submit" className="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition  
                px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300 ">  {loading ? "Save..." : "Save"} </button>
              
              </div>
            </form>
          </div>
        </Modal>

        {/* Viwe Performance Modal */}
        <Modal isOpen={isViewModalOpen} onClose={closeViewModal} className="max-w-[700px] m-4">
          <div className="relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-6 max-h-[70vh]">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90"> View Job </h4>
              {/* <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7"> Insert your performance. </p> */}
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-1 xl:grid-cols-1 mt-3">
              <div className="relative inline-block group">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${viewFilePath}`}
                  alt=" grid"
                  className=" w-full border border-gray-200 rounded-xl dark:border-gray-800"
                  width={338}
                  height={192}
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

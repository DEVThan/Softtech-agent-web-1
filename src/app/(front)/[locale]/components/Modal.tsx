// "use client";
// import React from "react";

// type ModalProps = {
//   message: string;
//   type: "success" | "error";
//   onClose: () => void;
// };

// const Modal: React.FC<ModalProps> = ({ message, type, onClose }) => {
//   const bgColor = type === "success" ? "bg-green-100" : "bg-red-100";
//   const textColor = type === "success" ? "text-green-700" : "text-red-700";

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className={`p-6 rounded shadow-lg w-80 ${bgColor} animate-fadeIn`}>
//         <p className={`text-center font-semibold ${textColor}`}>{message}</p>
//         <button
//           onClick={onClose}
//           className="mt-4 w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Modal;


"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, X, MessageCircleWarning } from "lucide-react";

type ModalProps = {
  title?: string;
  type: "success" | "warnning" | "error";
  message?: string;
  details: { label: string; value: string }[];
  remark?: string;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({
  title,
  type,
  message,
  details,
  remark,
  onClose,
}) => {
  const isSuccess = type === "success";
  const isWarnning = type === "warnning";
  const isFails = type === "error";

  let icon = <CheckCircle2 className="w-12 h-12 text-green-700" />
  let titleColor = "text-green-600";
  let buttonColor = "bg-green-500 hover:bg-green-600";

  if (isSuccess) {
    icon = <CheckCircle2 className="w-12 h-12 text-green-700" /> ; 
    titleColor = "text-green-600";
    buttonColor = "bg-green-600 hover:bg-green-700";
  } else if (isWarnning) {
    icon = <MessageCircleWarning className="w-12 h-12 text-orange-500" />; 
    titleColor = "text-orange-600";
    buttonColor = "bg-orange-500 hover:bg-orange-600";
  } else if (isFails) {
    icon = <XCircle className="w-12 h-12 text-red-500" />;
    titleColor = "text-red-600";
    buttonColor = "bg-red-500 hover:bg-red-600";
  }
  
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-[400px] rounded-2xl bg-white dark:bg-gray-900 shadow-2xl p-6 text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          {/* close buttton */}
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition" > <X className="w-5 h-5" /> </button>

          {/* icon, message, details */}
          <div className="flex flex-col items-center space-y-4">
            {icon}
            <h2 className={`text-lg font-semibold ${titleColor}`} >  {title} </h2>
            {message && ( <p className="text-gray-700 dark:text-gray-300 text-sm">  {message} </p>  )}
            {details && (
              (details.length > 0)?
              <div className="w-full text-left bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mt-3">
                <table className="w-full text-sm">
                  <tbody>
                    {Array.isArray(details)
                      ? details.map((item, index) => (
                          <tr key={index}>
                            <td className="font-medium capitalize text-gray-600 dark:text-gray-400 py-1 w-1/3">
                              {item.label}
                            </td>
                            <td className="text-gray-900 dark:text-gray-100 py-1 break-all">
                              {/* {item.value} */}
                              <span>{item.value}</span>
                              {/* ปุ่มคัดลอก */}
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(item.value);
                                  // หรือเพิ่มการแจ้งเตือน (alert) หรือ state feedback ได้
                                  alert(`Copied: ${item.value}`);
                                }}
                                className="text-gray-500 hover:text-blue-600 focus:outline-none transition-colors ml-1"
                                aria-label={`Copy ${item.value}`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </table>
              </div>
              : "")}

            {/* remark */}
            {remark && (
              <p className="text-[#e16600] dark:text-[#e16600] text-sm">
                {remark}
              </p>
            )}

            {/* OK button */}
            <button onClick={onClose} className={`mt-4 w-full py-2 rounded-xl text-white font-medium shadow-md transition ${buttonColor}`} > OK </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;

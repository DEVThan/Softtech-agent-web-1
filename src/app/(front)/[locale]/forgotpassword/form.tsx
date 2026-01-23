"use client";
import { useState} from "react";
import Modal from "../components/Modal"; // import component modal
import  { getLocaleFromSubdomain }  from "@/lib/function";

interface FormLabels {
  idcard: string;
  firstname: string;
  surname: string;
  phonenumber: string;
  email: string;
}

interface AddressLabels {
  address: string;
  street: string;
  subdistrict: string;
  district: string;
  province: string;
  country: string;
  postalcode: string;
}

interface WorkLocationLabels {
  label: string;
  address: string;
  street: string;
  subdistrict: string;
  district: string;
  province: string;
  country: string;
  postalcode: string;
}

interface RegistrationJson {
  title: string;
  form: {
    personal: FormLabels;
    address: AddressLabels;
    Work_location: WorkLocationLabels;
  };
}

interface CommonLabels {
  button: {
    register: string;
  };
}

interface RegistrationFormProps {
  regisjson: RegistrationJson;
  common: CommonLabels;
  locale: string;
}

export default function RegistrationForm({ regisjson, common, locale }: RegistrationFormProps) {
    const personal = regisjson.form.personal;
    const address = regisjson.form.address;

    const [formData, setFormData] = useState({
        idcard: "",
        firstName: "",
        surname: "",
        phonenumber: "",
        email: "",
        address: "",
        street: "",
        subdistrict: "",
        district: "",
        province: "",
        country: "",
        postalcode: "",

        work_address: "",
        work_building:"",
        work_street: "",
        work_subdistrict: "",
        work_district: "",
        work_province: "",
        work_country: "",
        work_postalcode: "",

    });
    const [modal, setModal] = useState<{ title: string; message: string;  details: { label: string; value: string }[];  remark: string; type: "success" | "warnning" | "error" } | null>(null)  ;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/app/create_agent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "country": await getLocaleFromSubdomain(),
                },
                body: JSON.stringify(formData), // ส่งข้อมูล formData เป็น JSON
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if(data.status == true){
                const result = data.result.result;
                setModal({ title:data.message, message: "", details: [
                    { label: "Username", value: result.username },
                    { label: "Password", value: result.username },
                ], remark: "Please save your Username and Password to access the system.", type: "success" });
            }else{
                setModal({ title:data.message, message: "", details: [], remark: "Please contact the staff/officer.", type: "warnning" });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setModal({ title:"Failed to registation.", message: "",  details: [], remark: "Please contact the staff/officer.", type: "error" });
        }
    };

   
    // useEffect(() => {

    //     setModal({ title:"Form submitted successfully!", message: "", 
    //     details: [
    //         { label: "Username", value: "202510004" },
    //         { label: "Password", value: "202510004" },
    //     ], 
    //     remark: "Please save your Username and Password to access the system.",
    //     type: "success" });

    // },[]);

    return (
        <>
            <div className="title grid  grid-cols-1 text-center text-[#0874B6] dark:text-[#474747] mb-3">
                <h1>{regisjson.title}</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="mt-6 max-w registration-form" >
                <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-3">
                    <div className="flex flex-col">
                        <label htmlFor="idcard">{personal.idcard} <span className="text-[red]">*</span></label>
                        <input type="text" id="idcard" name="idcard" className="input-elm border rounded px-4 py-1 mt-1
                        focus-visible:outline-none
                        focus-visible:border-[#871212]" 
                        required
                        value={formData.idcard}
                        onChange={handleChange}
                        />
                    </div>
                </div>
                
                <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-3">
                    <div className="flex flex-col">
                        <label htmlFor="firstName">{personal.firstname} <span className="text-[red]">*</span></label>
                        <input type="text" id="firstName" name="firstName" className="input-elm border rounded px-4 py-1 mt-1
                        focus-visible:outline-none
                        focus-visible:border-[#871212]" 
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        />
                    </div>
                    
                    <div className="flex flex-col">
                        <label htmlFor="surname">{personal.surname}<span className="text-[red]">*</span></label>
                        <input type="text" id="surname" name="surname" className="input-elm border rounded px-4 py-1 mt-1
                        focus-visible:outline-none
                        focus-visible:border-[#871212]" 
                        required
                        value={formData.surname}
                        onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4  mb-3">
                    <div className="flex flex-col">
                        <label htmlFor="phonenumber">{personal.phonenumber} <span className="text-[red]">*</span></label>
                        <input type="text" id="phonenumber" name="phonenumber" className="input-elm border rounded px-4 py-1 mt-1
                        focus-visible:outline-none
                        focus-visible:border-[#871212]" 
                        required
                        value={formData.phonenumber}
                        onChange={handleChange}
                        />
                    </div>
                    
                    <div className="flex flex-col">
                        <label htmlFor="email">{personal.email} </label>
                        <input type="email" id="email" name="email" className="input-elm border rounded px-4 py-1 mt-1
                        focus-visible:outline-none
                        focus-visible:border-[#871212]" 
                        value={formData.email}
                        onChange={handleChange}
                        />
                    </div>
                </div>

                {/* <div className="grid  grid-cols-1 gap-1 mt-10 mb-3">
                    <div className="flex flex-col">
                        <label className="flex items-center gap-2">{work_location.label} <span className="text-[red]">*</span> <hr className="flex-1 border-t border-gray-300"></hr></label>
                    </div>
                </div> */}

                <div className="grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-1  mb-3">
                    <div className="flex flex-col">
                        <label htmlFor="address">{address.address} <span className="text-[red]">*</span></label>
                        {/* <input type="text" id="work-address" name="address" className="input-elm border rounded px-4 py-1 mt-1
                        focus-visible:outline-none
                        focus-visible:border-[#871212]" 
                        required
                        value={formData.address}
                        onChange={handleChange}
                        /> */}
                        
                        <textarea
                            id="address"
                            name="address"
                            rows={3} 
                            className="textarea-elm border rounded-3 px-4 py-2 mt-1
                                    focus-visible:outline-none
                                    focus-visible:border-[#871212]"
                            value={formData.address}
                            required
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="grid  grid-cols-2 gap-4  mb-3">
                    <div className="flex flex-col">
                        <label htmlFor="street">{address.street}</label>
                        <input type="text" id="street" name="street" className="input-elm border rounded px-4 py-1 mt-1
                        focus-visible:outline-none
                        focus-visible:border-[#871212]" 
                        value={formData.street}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="country">{address.country}</label>
                        <input type="text" id="country" name="country" className="input-elm border rounded px-4 py-1 mt-1
                        focus-visible:outline-none
                        focus-visible:border-[#871212]" 
                        value={formData.work_country}
                        onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="grid  grid-cols-2 gap-4  mb-3">
                    <div className="flex flex-col">
                        <label htmlFor="subdistrict">{address.subdistrict}</label>
                        <input type="text" id="subdistrict" name="subdistrict" className="input-elm border rounded px-4 py-1 mt-1
                        focus-visible:outline-none
                        focus-visible:border-[#871212]" 
                        value={formData.subdistrict}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="district">{address.district} <span className="text-[red]">*</span></label>
                        <input type="text" id="district" name="district" className="input-elm border rounded px-4 py-1 mt-1
                        focus-visible:outline-none
                        focus-visible:border-[#871212]" 
                        required
                        value={formData.district}
                        onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="grid  grid-cols-2 gap-4  mb-3">
                    <div className="flex flex-col">
                        <label htmlFor="province">{address.province}<span className="text-[red]">*</span></label>
                        <input type="text" id="province" name="province" className="input-elm border rounded px-4 py-1 mt-1
                        focus-visible:outline-none
                        focus-visible:border-[#871212]" 
                        required
                        value={formData.province}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="postalcode">{address.postalcode}<span className="text-[red]">*</span></label>
                        <input type="text" id="postalcode" name="postalcode" className="input-elm border rounded px-4 py-1 mt-1
                        focus-visible:outline-none
                        focus-visible:border-[#871212]" 
                        required
                        value={formData.postalcode}
                        onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <button type="submit" className=" btn-primary bg-[#0874B6] dark:bg-gray-800 w-60 text-white px-6 py-2 rounded-3xl mt-2">
                    {common.button.register}
                    </button>
                    {/* <button type="submit"
                    className="mt-4 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                    > xxxx
                    </button> */}
                </div>
            </form>

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

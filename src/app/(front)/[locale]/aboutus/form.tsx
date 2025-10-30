"use client";
import { useState } from "react";

interface FormLabels {
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
    work_location: WorkLocationLabels;
  };
}

interface RegistrationFormProps {
  regisjson: RegistrationJson;
}

export default function RegistrationForm({ regisjson }: RegistrationFormProps) {
    const personal = regisjson.form.personal;
    const work_location = regisjson.form.work_location;

    const [formData, setFormData] = useState({
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Form submitted!");
    };

    return (
        <>
            <div className="grid  grid-cols-1 text-center mb-3">
                <h1>{regisjson.title}</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="mt-6 max-w registration-form" >
                
                <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4  mb-3">
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

                <div className="grid  grid-cols-1 gap-1 mt-10 mb-3">
                    <div className="flex flex-col">
                        <label className="flex items-center gap-2">{work_location.label} <span className="text-[red]">*</span> <hr className="flex-1 border-t border-gray-300"></hr></label>
                    </div>
                </div>

                <div className="grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-1  mb-3">
                    <div className="flex flex-col">
                        <label htmlFor="work_address">{work_location.address} <span className="text-[red]">*</span></label>
                        {/* <input type="text" id="work-work_address" name="work_address" className="input-elm border rounded px-4 py-1 mt-1
                        focus-visible:outline-none
                        focus-visible:border-[#871212]" 
                        required
                        value={formData.work_address}
                        onChange={handleChange}
                        /> */}
                        
                        <textarea
                            id="work_address"
                            name="work_address"
                            rows={3} 
                            className="textarea-elm border rounded-3 px-4 py-2 mt-1
                                    focus-visible:outline-none
                                    focus-visible:border-[#871212]"
                            value={formData.work_address}
                            onChange={handleChange}
                        />

                    </div>
                </div>
                <div className="grid  grid-cols-2 gap-4  mb-3">
                    <div className="flex flex-col">
                        <label htmlFor="work_street">{work_location.street}</label>
                        <input type="text" id="work_street" name="work_street" className="input-elm border rounded px-4 py-1 mt-1
                        focus-visible:outline-none
                        focus-visible:border-[#871212]" 
                        value={formData.work_street}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="work_country">{work_location.country}</label>
                        <input type="text" id="work_country" name="work_country" className="input-elm border rounded px-4 py-1 mt-1
                        focus-visible:outline-none
                        focus-visible:border-[#871212]" 
                        value={formData.work_country}
                        onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="grid  grid-cols-2 gap-4  mb-3">
                    <div className="flex flex-col">
                        <label htmlFor="work_subdistrict">{work_location.subdistrict}</label>
                        <input type="text" id="work_subdistrict" name="work_subdistrict" className="input-elm border rounded px-4 py-1 mt-1
                        focus-visible:outline-none
                        focus-visible:border-[#871212]" 
                        value={formData.work_subdistrict}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="work_district">{work_location.district} <span className="text-[red]">*</span></label>
                        <input type="text" id="work_district" name="work_district" className="input-elm border rounded px-4 py-1 mt-1
                        focus-visible:outline-none
                        focus-visible:border-[#871212]" 
                        required
                        value={formData.work_district}
                        onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="grid  grid-cols-2 gap-4  mb-3">
                    <div className="flex flex-col">
                        <label htmlFor="work_province">{work_location.province}<span className="text-[red]">*</span></label>
                        <input type="text" id="work_province" name="work_province" className="input-elm border rounded px-4 py-1 mt-1
                        focus-visible:outline-none
                        focus-visible:border-[#871212]" 
                        required
                        value={formData.work_province}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="work_postalcode">{work_location.postalcode}<span className="text-[red]">*</span></label>
                        <input type="text" id="work_postalcode" name="work_postalcode" className="input-elm border rounded px-4 py-1 mt-1
                        focus-visible:outline-none
                        focus-visible:border-[#871212]" 
                        required
                        value={formData.work_postalcode}
                        onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <button type="submit" className=" btn-submit w-60 bg-[#0874B6] text-white px-6 py-2 rounded-3xl mt-2">
                    Responsive Button
                    </button>
                    {/* <button type="submit"
                    className="mt-4 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
                    > xxxx
                    </button> */}
                </div>
            </form>
        </>
    );
}

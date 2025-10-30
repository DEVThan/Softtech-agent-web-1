"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface UserContextType {
  agentName: string;
  agentSurName: string;
  agentTelephone: string;
  agentEmailaddress: string;
  agentProvince: string;
  agentThumnal: string;
  setUser: (
    name: string,
    surname: string,
    telephone: string,
    email: string,
    province: string,
    thumnal: string
  ) => void;
  isLoaded: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [agentName, setAgentName] = useState("");
  const [agentSurName, setAgentSurName] = useState("");
  const [agentTelephone, setAgentTelephone] = useState("");
  const [agentEmailaddress, setAgentEmailaddress] = useState("");
  const [agentProvince, setAgentProvince] = useState("");
  const [agentThumnal, setAgentThumnal] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAgentName(localStorage.getItem("agentname") || "");
      setAgentSurName(localStorage.getItem("agentsurname") || "");
      setAgentTelephone(localStorage.getItem("agenttelephone") || "");
      setAgentEmailaddress(localStorage.getItem("agentemailaddress") || "");
      setAgentProvince(localStorage.getItem("agentprovince") || "");
      setAgentThumnal(localStorage.getItem("profilethumnal") || "");
      setIsLoaded(true);
    }
  }, []);

  const setUser = (
    name: string,
    surname: string,
    telephone: string,
    email: string,
    province: string,
    thumnal: string
  ) => {
    setAgentName(name);
    setAgentSurName(surname);
    setAgentTelephone(telephone);
    setAgentEmailaddress(email);
    setAgentProvince(province);
    setAgentThumnal(thumnal);

    localStorage.setItem("agentname", name);
    localStorage.setItem("agentsurname", surname);
    localStorage.setItem("agenttelephone", telephone);
    localStorage.setItem("agentemailaddress", email);
    localStorage.setItem("agentprovince", province);
    localStorage.setItem("profilethumnal", thumnal);
  };

  return (
    <UserContext.Provider
      value={{
        agentName,
        agentSurName,
        agentTelephone,
        agentEmailaddress,
        agentProvince,
        agentThumnal,
        setUser,
        isLoaded,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};

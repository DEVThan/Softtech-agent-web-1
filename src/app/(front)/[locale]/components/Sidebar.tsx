"use client";

import { useState } from "react";
import Link from "next/link";
//import { ChevronDown, ChevronRight } from "lucide-react";
//import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/outline";


export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg h-full">
      <div className="p-4 text-xl font-bold text-gray-700 dark:text-gray-200">
        Admin Panel
      </div>
      <nav className="px-2">
        {/* Dashboard */}
        <Link
          href="/admin/dashboard"
          className="block px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
        >
          Dashboard
        </Link>

        {/* User Management */}
        <button
          onClick={() => toggleMenu("users")}
          className="flex w-full items-center justify-between px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
        >
          Users
          {/* {openMenu === "users" ? <ChevronDown size={16} /> : <ChevronRight size={16} />} */}
        </button>
        {openMenu === "users" && (
          <div className="ml-6">
            <Link
              href="/admin/users/list"
              className="block px-4 py-2 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              User List
            </Link>
            <Link
              href="/admin/users/roles"
              className="block px-4 py-2 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Roles & Permissions
            </Link>
          </div>
        )}

        {/* Reports */}
        <button
          onClick={() => toggleMenu("reports")}
          className="flex w-full items-center justify-between px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
        >
          Reports
          {/* {openMenu === "reports" ? <ChevronDown size={16} /> : <ChevronRight size={16} />} */}
        </button>
        {openMenu === "reports" && (
          <div className="ml-6">
            <Link
              href="/admin/reports/sales"
              className="block px-4 py-2 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Sales Report
            </Link>
            <Link
              href="/admin/reports/finance"
              className="block px-4 py-2 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Finance Report
            </Link>
          </div>
        )}
      </nav>
    </aside>
  );
}

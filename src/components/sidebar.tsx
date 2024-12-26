"use client";
import Link from "next/link";
import { Button } from "@components/ui/button";
import { UserIcon } from "@heroicons/react/24/outline";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-500 shadow-lg">
      <div className="flex justify-around  items-center p-4 text-2xl text-white font-bold border-b-4 border-zinc-300">
       <div className="flex items-center justify-center border-2 border-black rounded-full p-1">
          <UserIcon className="h-9 w-9 text-black" />
        </div>
        Hi Bharath!
      </div>
      <nav className="flex flex-col gap-8 mt-4 px-4 text-black text-xl">
        <Link href="/customer-management">
          <Button
            variant="outline"
            color="zinc-300"
            className="text-base w-full py-5 bg-[#D9D9D9] font-bold text-black"
          >
            Customer Management
          </Button>
        </Link>
        <Link href="/sales-management">
          <Button
            variant="outline"
            color="zinc-300"
            className="text-base w-full py-5 bg-[#D9D9D9] font-bold text-black"
          >
            Sales Management
          </Button>
        </Link>
        <Link href="/campaign-management">
          <Button
            variant="outline"
            color="zinc-300"
            className="text-base w-full py-5 bg-[#D9D9D9] font-bold text-black"
          >
	  	Campaign Management
          </Button>
        </Link>
        <Link href="/analytics-management">
          <Button
            variant="outline"
            color="zinc-300"
            className="text-base w-full py-5 bg-[#D9D9D9] font-bold text-black"
          >
            Analytics & Management
          </Button>
        </Link>
        <Link href="/ticket-management">
          <Button
            variant="outline"
            color="zinc-300"
            className="text-base w-full py-5 bg-[#D9D9D9] font-bold text-black"
          >
            Ticket Management
          </Button>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;


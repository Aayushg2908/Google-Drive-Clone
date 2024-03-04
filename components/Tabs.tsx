"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Clock4, HardDrive, Users } from "lucide-react";
import Link from "next/link";

const Tabs = () => {
  const pathname = usePathname();

  const tabs = [
    {
      id: 1,
      label: "My Drive",
      icon: <HardDrive className="w-5 h-5 text-slate-800" />,
      active: pathname === "/dashboard",
      url: "/dashboard",
    },
    {
      id: 2,
      label: "Shared with me",
      icon: <Users className="w-5 h-5 text-slate-800" />,
      active: pathname === "/dashboard/shared",
      url: "/dashboard/shared",
    },
    {
      id: 3,
      label: "Recents",
      icon: <Clock4 className="w-5 h-5 text-slate-800" />,
      active: pathname === "/dashboard/recents",
      url: "/dashboard/recents",
    },
  ];
  return (
    <div className="mt-5 flex flex-col gap-3">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.url}
          className={cn(
            "flex text-sm gap-2 p-3 rounded-xl cursor-pointer",
            tab.active ? "bg-blue-200" : "cursor-pointer hover:bg-slate-200"
          )}
        >
          {tab.icon}

          <p>{tab.label}</p>
        </Link>
      ))}
    </div>
  );
};

export default Tabs;

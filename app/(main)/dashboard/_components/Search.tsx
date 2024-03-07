"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const debounceFn = setTimeout(() => {
      let newUrl = "";
      if (search) {
        newUrl = `/dashboard/search?query=${search}`;
      } else {
        newUrl = "/dashboard";
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(debounceFn);
  }, [router, search]);

  return (
    <div className="relative w-[60%] sm:w-[50%] lg:w-[40%]">
      <SearchIcon className="h-5 w-5 absolute top-[0.65rem] left-3 text-slate-500" />
      <Input
        className="bg-[#EDF2FC] rounded-3xl pl-10 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;

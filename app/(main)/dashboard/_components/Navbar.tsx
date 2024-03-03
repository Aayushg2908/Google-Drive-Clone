import SidebarWrapper from "@/components/SidebarWrapper";
import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  return (
    <div className="w-full bg-[#F7F9FC] p-4 flex justify-between items-center">
      <Link href="/dashboard" className="flex justify-start items-center gap-2">
        <Image
          src="/assets/logo.svg"
          alt="logo"
          width={40}
          height={40}
          className="h-6 sm:h-9 w-6 sm:w-9"
        />
        <h1 className="hidden sm:block text-lg sm:text-xl font-semibold text-slate-700/80">
          Drive
        </h1>
      </Link>
      <div className="relative w-[60%] sm:w-[50%] lg:w-[40%]">
        <Search className="h-5 w-5 absolute top-[0.65rem] left-3 text-slate-500" />
        <Input
          className="bg-[#EDF2FC] rounded-3xl pl-10 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          type="text"
          placeholder="Search"
        />
      </div>
      <div className="flex items-center gap-x-2">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-[40px] w-[40px]",
            },
          }}
          afterSignOutUrl="/"
        />
        <Sheet>
          <SheetTrigger>
            <Menu className="text-slate-600/80 lg:hidden" />
          </SheetTrigger>

          <SheetContent side={"left"}>
            <SidebarWrapper isMenu={true} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;

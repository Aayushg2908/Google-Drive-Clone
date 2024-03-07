import SidebarWrapper from "@/components/SidebarWrapper";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Search from "./Search";

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
      <Search />
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

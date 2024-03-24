import SidebarWrapper from "@/components/SidebarWrapper";
import Navbar from "./_components/Navbar";
import ModalProvider from "@/components/provider/modal-provider";
import { Toaster } from "sonner";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="w-full h-full flex">
        <SidebarWrapper isMenu={false} />
        {children}
        <Toaster richColors />
        <ModalProvider />
      </div>
    </div>
  );
};

export default MainLayout;

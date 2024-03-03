import SidebarWrapper from "@/components/SidebarWrapper";
import Navbar from "./_components/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <div className="w-full h-full flex">
        <SidebarWrapper isMenu={false} />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;

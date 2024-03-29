import Sidebar from "@/components/Sidebar";

const SidebarWrapper = ({ isMenu }: { isMenu: boolean }) => {
  if (isMenu) {
    return <Sidebar />;
  }

  return (
    <div className="w-[20%] 2xl:w-[20%] 3xl:w-[10%] bg-[#F7F9FC] hidden lg:flex flex-col p-2 lg:p-2 xl:p-4">
      <Sidebar />
    </div>
  );
};

export default SidebarWrapper;

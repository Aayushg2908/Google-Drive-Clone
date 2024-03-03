import { Separator } from "./ui/separator";
import Tabs from "./Tabs";
import SidebarActions from "./SidebarActions";
import Pricing from "./Pricing";

const Sidebar = () => {
  return (
    <>
      <SidebarActions />
      <Tabs />
      <Separator className="mt-4" />
      <Pricing />
    </>
  );
};

export default Sidebar;

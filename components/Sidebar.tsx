import { Separator } from "./ui/separator";
import Tabs from "./Tabs";
import SidebarActions from "./SidebarActions";
import Pricing from "./Pricing";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Sidebar = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: {
      userId,
    },
  });
  if (!user) {
    return redirect("/dashboard");
  }

  return (
    <>
      <SidebarActions filesUploaded={user.freeTierFiles} />
      <Tabs />
      <Separator className="mt-4" />
      <Pricing
        tier={user.tier}
        filesUploaded={user.freeTierFiles}
        folderCreated={user.freeTierFolder}
      />
    </>
  );
};

export default Sidebar;

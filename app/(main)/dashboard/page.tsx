import { getRootFolders } from "@/actions/folder";
import Nodata from "@/components/Empty";
import { isEmpty } from "lodash";
import { redirect } from "next/navigation";
import Folder from "./_components/Folder";

const HomePage = async () => {
  const data = await getRootFolders();
  if (data.status === 403) {
    return redirect("/dashboard");
  }

  if (isEmpty(data.folders)) {
    return <Nodata />;
  }

  return (
    <div className="w-full">
      <div className="p-4 w-full h-full mb-20">
        {!isEmpty(data.folders) && (
          <h1 className="text-slate-900 text-md font-semibold">Folders</h1>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6">
          {data.folders.map((folder) => (
            <div className="p-4 w-full" key={folder.id}>
              <Folder name={folder.name} id={folder.id} />
            </div>
          ))}
        </div>
        <h1 className="text-slate-900 text-md font-semibold">Files</h1>
      </div>
    </div>
  );
};

export default HomePage;

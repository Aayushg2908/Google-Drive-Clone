import { isEmpty } from "lodash";
import React from "react";
import Folder from "../../_components/Folder";
import { redirect } from "next/navigation";
import Nodata from "@/components/Empty";
import { getFolderById } from "@/actions/folder";

const FolderPage = async ({ params }: { params: { folderId: string } }) => {
  const { folderId } = params;
  const data = await getFolderById(folderId);
  if (data.status === 404) {
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

export default FolderPage;

import { isEmpty } from "lodash";
import React from "react";
import Folder from "../../_components/Folder";
import { redirect } from "next/navigation";
import Nodata from "@/components/Empty";
import { getFolderById } from "@/actions/folder";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import File from "@/components/File";

const FolderPage = async ({ params }: { params: { folderId: string } }) => {
  const { folderId } = params;
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
    return null;
  }

  const data = await getFolderById(folderId);
  if (data.status === 404) {
    return redirect("/dashboard");
  }

  if (isEmpty(data.folder?.folders) && isEmpty(data.folder?.files)) {
    return <Nodata />;
  }

  return (
    <div className="w-full">
      <div className="p-4 w-full h-full mb-20">
        {!isEmpty(data.folder?.folders) && (
          <h1 className="text-slate-900 text-md font-semibold">Folders</h1>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6">
          {data.folder?.folders.map((folder) => (
            <div className="p-4 w-full" key={folder.id}>
              <Folder name={folder.name} id={folder.id} />
            </div>
          ))}
        </div>
        {!isEmpty(data.folder?.files) && (
          <h1 className="text-slate-900 text-md font-semibold">Files</h1>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6">
          {data.folder?.files.map((file) => (
            <div className="p-4 w-full" key={file.id}>
              <File file={file} isOwner={file.userId === user.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FolderPage;

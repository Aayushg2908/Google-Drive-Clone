import { isEmpty } from "lodash";
import React from "react";
import Folder from "../../_components/Folder";
import { redirect } from "next/navigation";
import Nodata from "@/components/Empty";
import { getBreadcrumb, getFolderById } from "@/actions/folder";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import File from "@/components/File";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

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
  const breadcrumb = await getBreadcrumb(folderId);
  if (data.status === 404) {
    return redirect("/dashboard");
  }

  if (isEmpty(data.folder?.folders) && isEmpty(data.folder?.files)) {
    return (
      <div className="flex flex-col p-4">
        <div className="flex gap-x-1 items-center my-8">
          {breadcrumb.map((item: { name: string; id: string | null }) => (
            <div key={item.id || "home"} className="flex items-center gap-x-1">
              <Link
                href={
                  item.id === null
                    ? "/dashboard"
                    : `/dashboard/folder/${item.id}`
                }
              >
                {item.name}
              </Link>
              <ChevronRight />
            </div>
          ))}
          <div className="text-blue-500 font-bold">{data.folder?.name}</div>
        </div>
        <Nodata />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="p-4 w-full h-full mb-20">
        <div className="flex gap-x-1 items-center my-8">
          {breadcrumb.map((item: { name: string; id: string | null }) => (
            <div key={item.id || "home"} className="flex items-center gap-x-1">
              <Link
                href={
                  item.id === null
                    ? "/dashboard"
                    : `/dashboard/folder/${folderId}`
                }
              >
                {item.name}
              </Link>
              <ChevronRight />
            </div>
          ))}
          <div className="text-blue-500 font-bold">{data.folder?.name}</div>
        </div>
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

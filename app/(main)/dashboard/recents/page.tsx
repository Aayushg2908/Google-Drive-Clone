import { getRecentFiles } from "@/actions/file";
import Nodata from "@/components/Empty";
import File from "@/components/File";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { isEmpty } from "lodash";
import { redirect } from "next/navigation";
import React from "react";

const RecentsPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const data = await getRecentFiles();
  if (data.status === 404) {
    return null;
  }

  const user = await db.user.findUnique({
    where: {
      userId,
    },
  });
  if (!user) {
    return null;
  }

  if (isEmpty(data.files)) {
    return <Nodata />;
  }

  return (
    <div className="p-4 w-full h-full mb-20">
      {!isEmpty(data.files) && (
        <h1 className="text-slate-900 text-md font-semibold">Recent Files</h1>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6">
        {data.files.map((file) => (
          <div className="p-4 w-full" key={file.id}>
            <File
              file={file}
              isOwner={file.userId === user.id}
              folderId={file.folderId}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentsPage;

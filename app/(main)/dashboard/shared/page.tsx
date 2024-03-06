import { getSharedFiles } from "@/actions/file";
import Nodata from "@/components/Empty";
import File from "@/components/File";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { isEmpty } from "lodash";
import { redirect } from "next/navigation";

const SharedFilesPage = async () => {
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

  const data = await getSharedFiles();

  if (isEmpty(data.files)) {
    return <Nodata />;
  }

  return (
    <div className="p-4 w-full h-full mb-20">
      {!isEmpty(data.files) && (
        <h1 className="text-slate-900 text-md font-semibold">Shared Files</h1>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6">
        {data.files.map((file) => (
          <div className="p-4 w-full" key={file.id}>
            <File file={file} isOwner={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharedFilesPage;

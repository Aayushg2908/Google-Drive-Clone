import { getData } from "@/actions/folder";
import File from "@/components/File";
import { isEmpty } from "lodash";
import { redirect } from "next/navigation";
import Folder from "../_components/Folder";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import GoBack from "./_components/goBack";
import Nodata from "@/components/Empty";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query: string };
}) => {
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

  const data = await getData(searchParams.query);
  if (data.status === 404) {
    return redirect("/dashboard");
  }

  if (isEmpty(data.folders) && isEmpty(data.files)) {
    return (
      <div className="flex flex-col p-4">
        <GoBack />
        <Nodata />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="p-4 w-full h-full mb-20">
        <GoBack />
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
        {!isEmpty(data.files) && (
          <h1 className="text-slate-900 text-md font-semibold">Files</h1>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6">
          {data.files.map((file) => (
            <div className="p-4 w-full" key={file.id}>
              <File file={file} isOwner={file.userId === user.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

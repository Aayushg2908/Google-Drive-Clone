"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export const uploadFile = async ({
  name,
  url,
  folderId,
}: {
  name: string;
  url: string;
  folderId: string;
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
    return { status: 404 };
  }

  const folder = await db.folder.findUnique({
    where: {
      userId: user.id,
      id: folderId,
    },
  });
  if (!folder) {
    return { status: 400 };
  }

  await db.file.create({
    data: {
      name,
      url,
      folderId,
      userId: user.id,
      inviteCode: uuidv4(),
    },
  });

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      freeTierFiles: {
        increment: 1,
      },
    },
  });

  revalidatePath(`/dashboard/folder/${folderId}`);

  return { status: 200 };
};

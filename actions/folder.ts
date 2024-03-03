"use server";

import { FREE_TIER_LIMIT } from "@/constants";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createFolder = async (
  name: string,
  parentId: string | undefined
) => {
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

  if (user.tier === "FREE" && user.freeTierFolder >= FREE_TIER_LIMIT) {
    return { status: 403 };
  }

  if (!parentId) {
    await db.folder.create({
      data: {
        name,
        userId: user.id,
      },
    });
  }

  await db.folder.create({
    data: {
      name,
      userId: user.id,
      parentId,
    },
  });

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      freeTierFolder: {
        increment: 1,
      },
    },
  });

  revalidatePath("/dashboard");
  if (!parentId) {
    revalidatePath(`/dashboard/folder/${parentId}`);
  }

  return { status: 200 };
};

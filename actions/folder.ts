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
  } else {
    await db.folder.create({
      data: {
        name,
        userId: user.id,
        parentId,
      },
    });
  }

  if (user.tier === "FREE") {
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
  }

  revalidatePath("/dashboard");
  if (!parentId) {
    revalidatePath(`/dashboard/folder/${parentId}`);
  }

  return { status: 200 };
};

export const getRootFolders = async () => {
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
    return {
      status: 404,
      folders: [],
    };
  }

  const folders = await db.folder.findMany({
    where: {
      userId: user.id,
      parentId: null,
    },
  });

  return {
    status: 200,
    folders,
  };
};

export const updateFolder = async (id: string, name: string) => {
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

  await db.folder.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/folder/${id}`);

  return { status: 200 };
};

export const deleteFolder = async (id: string) => {
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

  const folder = await db.folder.delete({
    where: {
      id,
    },
  });

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      freeTierFolder: {
        decrement: 1,
      },
    },
  });

  revalidatePath("/dashboard");
  if (folder.parentId) {
    revalidatePath(`/dashboard/folder/${folder.parentId}`);
  }

  return { status: 200 };
};

export const getFolderById = async (id: string) => {
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
    return {
      status: 404,
      folder: null,
    };
  }

  const folder = await db.folder.findUnique({
    where: {
      userId: user.id,
      id: id,
    },
    include: {
      files: true,
      folders: true,
    },
  });

  return {
    status: 200,
    folder,
  };
};

"use server";

import { FREE_TIER_LIMIT } from "@/constants";
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

  if (user.tier === "FREE" && user.freeTierFiles >= FREE_TIER_LIMIT) {
    return { status: 403 };
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

  if (user.tier === "FREE") {
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
  }

  revalidatePath(`/dashboard/folder/${folderId}`);

  return { status: 200 };
};

export const deleteFile = async (fileId: string, folderId: string) => {
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

  const file = await db.file.findUnique({
    where: {
      id: fileId,
    },
  });
  if (!file) {
    return { status: 403 };
  }

  await db.file.delete({
    where: {
      id: fileId,
    },
  });

  if (user.tier === "FREE") {
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        freeTierFiles: {
          decrement: 1,
        },
      },
    });
  }

  revalidatePath(`/dashboard/folder/${folderId}`);

  return { status: 200 };
};

export const getRecentFiles = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: {
      userId,
    },
    include: {
      files: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  if (!user) {
    return { status: 404, files: [] };
  }

  return { status: 200, files: user.files };
};

export const generateNewInviteCode = async (
  fileId: string,
  pathname: string
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
    return { status: 404, code: null };
  }

  const file = await db.file.findUnique({
    where: {
      id: fileId,
      userId: user.id,
    },
  });
  if (!file) {
    return { status: 403, code: null };
  }

  const updatedFile = await db.file.update({
    where: {
      id: fileId,
      userId: user.id,
    },
    data: {
      inviteCode: uuidv4(),
    },
  });

  revalidatePath(pathname);

  return { status: 200, code: updatedFile.inviteCode };
};

export const handleShare = async (inviteCode: string) => {
  if (!inviteCode) return redirect("/dashboard");

  const { userId } = auth();
  if (!userId) return redirect("/sign-in");

  const user = await db.user.findUnique({
    where: {
      userId,
    },
  });
  if (!user) return null;

  const fileExists = await db.file.findFirst({
    where: { inviteCode },
  });
  if (!fileExists) return redirect("/dashboard");

  const userExists = fileExists.sharedWith.includes(user.id);
  const userIsOwner = fileExists.userId === user.id;
  if (userExists && userIsOwner) return redirect("/dashboard/shared");

  const file = await db.file.update({
    where: {
      id: fileExists.id,
    },
    data: {
      sharedWith: {
        push: user.id,
      },
    },
  });
  if (file) {
    return redirect("/dashboard/shared");
  }
};

export const getSharedFiles = async () => {
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
    return { status: 404, files: [] };
  }

  const files = await db.file.findMany({
    where: {
      sharedWith: {
        has: user.id,
      },
    },
  });

  return { status: 200, files };
};

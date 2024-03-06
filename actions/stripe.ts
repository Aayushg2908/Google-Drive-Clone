"use server";

import { db } from "@/lib/db";
import { stripeInstance } from "@/lib/stripe";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const stripeSession = async (amount: number) => {
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
    return "";
  }

  const stripe = stripeInstance;
  const date = new Date().toISOString();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "CLOUD_PREMIUM" + date,
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    billing_address_collection: "auto",
    shipping_address_collection: {
      allowed_countries: [],
    },
    cancel_url: `https://google-drive-clone-sable.vercel.app/dashboard`,
    success_url: `https://google-drive-clone-sable.vercel.app/stripe/success/{CHECKOUT_SESSION_ID}`,
  });

  return session.id;
};

export const upgradeUserPlan = async (sessionId: string) => {
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
    throw new Error("User not found");
  }

  if (!sessionId) {
    throw new Error("Invalid session ID");
  }

  const session = await stripeInstance.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== "paid") {
    throw new Error("Payment not completed");
  }

  await db.user.update({
    where: {
      userId,
    },
    data: {
      tier: "PREMIUM",
    },
  });

  revalidatePath("/dashboard");

  return { status: 200 };
};

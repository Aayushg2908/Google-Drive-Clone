"use client";

import { upgradeUserPlan } from "@/actions/stripe";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const StripeSuccessPage = ({ params }: { params: { sessionId: string } }) => {
  const { sessionId } = params;
  const router = useRouter();

  useEffect(() => {
    if (!sessionId) return;

    const updateUser = async () => {
      try {
        const data = await upgradeUserPlan(sessionId);
        if (data.status === 200) {
          toast.success("Payment successful! Upgraded to Premium account!");
        } else {
          toast.error("Payment failed!");
        }
      } catch (err) {
        toast.error("Invalid session ID!");
      } finally {
        router.push("/dashboard");
      }
    };

    updateUser();
  }, [router, sessionId]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="font-bold text-3xl sm:text-4xl md:text-5xl">
        Your payment is in progress. Please do not close this window.
      </p>
    </div>
  );
};

export default StripeSuccessPage;

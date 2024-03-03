"use client";

import { FREE_TIER_LIMIT } from "@/constants";
import { cn } from "@/lib/utils";
import { Crown, User } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

const Pricing = ({
  tier,
  filesUploaded,
  folderCreated,
}: {
  tier: string;
  filesUploaded: number;
  folderCreated: number;
}) => {
  return (
    <div className="flex flex-col p-4 space-y-4">
      <h2
        className={cn(
          "flex justify-center items-center gap-2 text-sm p-2 font-bold rounded-xl",
          tier == "FREE"
            ? " text-white bg-blue-200"
            : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
        )}
      >
        {tier == "FREE" ? (
          <User className="h-4 w-4" />
        ) : (
          <Crown className="h-4 w-4" />
        )}
        <p>{tier} PLAN</p>
      </h2>
      <div className="flex flex-col">
        <p className="text-xs">
          {tier !== "FREE"
            ? "Unlimited file uploads"
            : `${filesUploaded} / ${FREE_TIER_LIMIT} files uploaded`}
        </p>
        <div className="w-full">
          <Progress
            value={(filesUploaded / FREE_TIER_LIMIT) * 100}
            className="w-full h-2"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-xs">
          {tier !== "FREE"
            ? "Unlimited folder creation"
            : `${folderCreated} / ${FREE_TIER_LIMIT} folders created`}
        </p>
        <div className="w-full">
          <Progress
            value={(folderCreated / FREE_TIER_LIMIT) * 100}
            className="w-full h-2"
          />
        </div>
      </div>
      {tier == "FREE" && (
        <Button
          className="hover:bg-blue-500 gap-2 hover:text-white focus:outline-none focus:ring focus:border-blue-300 transition duration-300 ease-in-out transform hover:scale-105 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-md py-2 px-4"
          variant={"outline"}
        >
          <Crown className="h-4 w-4" />
          Premium
        </Button>
      )}
    </div>
  );
};

export default Pricing;

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const MarketingPage = () => {
  const { userId } = auth();
  if (userId) {
    return redirect("/dashboard");
  }

  return (
    <div className="h-screen">
      <div className="flex p-3 h-[10%]">
        <div className="flex h-fit justify-between w-full">
          <div className="flex justify-center items-center gap-1">
            <Image src="/assets/logo.svg" alt="logo" height={40} width={40} />
            <h2 className="max-sm:hidden text-lg sm:text-xl font-semibold text-slate-800/90 dark:text-white">
              Store
            </h2>
            <h4 className="max-sm:hidden text-lg sm:text-xl dark:text-white/50">
              Drive
            </h4>
          </div>
          <div className="flex gap-2">
            <Link
              className={cn(
                buttonVariants({
                  variant: "outline",
                })
              )}
              href="/sign-in"
            >
              Sign In
            </Link>
            <Link href="/dashboard" className={cn(buttonVariants())}>
              Go to Drive
            </Link>
          </div>
        </div>
      </div>
      <div className="h-[80%] flex justify-center items-center mt-4">
        <div className="flex h-full justify-center items-center gap-12 flex-col lg:flex-row w-full lg:w-[80%]">
          <div className="w-[90%] lg:w-[30%] flex justify-center items-start flex-col gap-3 lg:gap-7 2xl:gap-12">
            <h1 className="text-2xl lg:text-3xl 2xl:text-5xl">
              Easy and secure access to your content
            </h1>
            <h3 className="text-lg lg:text-xl 2xl:text-2xl text-slate-600/90">
              Store, share, and collaborate on files and folders from your
              mobile device, tablet, or computer
            </h3>
            <Link href="/dashboard" className={cn(buttonVariants())}>
              Go to Drive
            </Link>
          </div>
          <Image
            src="/assets/mainpage.jpg"
            width={800}
            height={800}
            className="h-[500px] w-[500px] 2xl:w-[700px] object-contain "
            alt="main image"
          />
        </div>
      </div>
    </div>
  );
};

export default MarketingPage;

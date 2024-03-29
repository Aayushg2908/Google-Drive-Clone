import Image from "next/image";

const Nodata = () => {
  return (
    <div className="h-screen w-screen absolute top-0 left-0 flex justify-center items-center -z-10">
      <div className="flex flex-col items-center">
        <Image
          src="/assets/Nodata.svg"
          alt=""
          className="brightness-120"
          width={200}
          height={200}
        />
        <div className="text-[#4f9cfd] w-full flex flex-col gap-2 justify-center items-center">
          <h1 className="text-2xl font-semibold ">No Data Found !</h1>
          <p className="xs:text-xs hidden sm:text-sm lg:flex justify-center items-center">
            Click the upload button to begin sharing and organizing your
            information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Nodata;

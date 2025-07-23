import Image from "next/image";
import React from "react";
import thumbImg from "@/../public/thumb_img.png";
import { FaChevronRight } from "react-icons/fa";
export default function Thumbnail() {
  return (
    <div className="flex z-10 flex-col-reverse md:flex-row items-center justify-between bg-[#E6E9F2] py-8 md:px-14 px-5 mt-6 rounded-xl min-w-full">
      <div className="md:pl-8 mt-10 md:mt-0">
        <p className="md:text-base text-orange-600 pb-1">
          Limited Time Offer 30% Off
        </p>
        <h1 className="max-w-lg md:text-[40px] md:leading-[48px] text-2xl font-semibold">
          Experience Pure Sound - Your Perfect Headphones Awaits!
        </h1>
        <div className="flex items-center mt-4 md:mt-6 gap-3">
          <button className="px-8 py-2 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-300 hover:shadow-2xl hover:shadow-orange-500 text-base cursor-pointer rounded-full">
            Shop now
          </button>
          <button className="flex items-center cursor-pointer hover:transform group gap-2 text-sm font-medium text-gray-900">
            Find More
            <FaChevronRight
              className="group-hover:translate-x-1 transition-transform"
              size={12}
            />
          </button>
        </div>
      </div>
      <div className="flex items-center flex-1 justify-center">
        <Image src={thumbImg} alt="thumbnail" className="md:w-72 w-48" />
      </div>
    </div>
  );
}

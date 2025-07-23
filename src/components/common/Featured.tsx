import Image from "next/image";
import React from "react";
import feat_img_1 from "@/../public/feat_img_1.png";
import feat_img_2 from "@/../public/feat_img_2.png";
import feat_img_3 from "@/../public/feat_img_3.png";
import { LuArrowUpRight } from "react-icons/lu";
export default function Featured() {
  return (
    <>
      <h2 className="mt-14 text-3xl text-center text-gray-700 font-semibold">
        Featured Products
      </h2>
      <div className="flex items-center justify-center">
        <div className="w-28 h-0.5   bg-orange-600 mt-2"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14 mt-12 md:px-14 px-4">
        <div className="relative group">
          <Image
            className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover"
            src={feat_img_1}
            alt="thumbnail"
          />
          <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
            <p className="font-medium text-xl lg:text-2xl">
              Unparalleled Sound
            </p>
            <p className="text-sm lg:text-base leading-5 max-w-60">
              Experience crystal-clear audio with premium headphones.
            </p>
            <button className="flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded">
              Buy now
              <LuArrowUpRight />
            </button>
          </div>
        </div>
        <div className="relative group">
          <Image
            className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover"
            src={feat_img_2}
            alt="thumbnail"
          />
          <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
            <p className="font-medium text-xl lg:text-2xl">Stay Connected</p>
            <p className="text-sm lg:text-base leading-5 max-w-60">
              Compact and stylish earphones for every occasion.
            </p>
            <button className="flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded">
              Buy now
              <LuArrowUpRight />
            </button>
          </div>
        </div>
        <div className="relative group">
          <Image
            className="group-hover:brightness-75 transition duration-300 w-full h-auto object-cover"
            src={feat_img_3}
            alt="thumbnail"
          />
          <div className="group-hover:-translate-y-4 transition duration-300 absolute bottom-8 left-8 text-white space-y-2">
            <p className="font-medium text-xl lg:text-2xl">
              Power in Every Pixel
            </p>
            <p className="text-sm lg:text-base leading-5 max-w-60">
              Shop the latest laptops for work, gaming, and more.
            </p>
            <button className="flex items-center gap-1.5 bg-orange-600 px-4 py-2 rounded ">
              Buy now
              <LuArrowUpRight />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-14">
        <h3 className="text-4xl font-semibold text-gray-900 text-center">
          Subscribe now & get 20% off
        </h3>
        <p className="text-sm text-gray-400 mt-2 text-center">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <div className="flex items-center justify-center mt-10">
          <div className="flex items-center justify-between max-w-2xl w-full md:h-14 h-12">
            <input
              type="text"
              placeholder="Enter your email"
              className="border border-gray-500/30 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
            />
            <button className="md:px-12 px-8 h-full text-white bg-orange-600 rounded-md rounded-l-none">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

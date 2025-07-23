import React from "react";
import Logo from "../ui/Logo";

export default function Footer() {
  return (
    <footer className=" px-6 md:px-16 lg:px-24 mt-24 pb-5">
      <div className="flex flex-col md:flex-row items-start justify-center gap-10">
        <div className="w-4/5">
          <Logo />
          <p className="text-sm text-gray-500 mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&lsquo;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-semibold text-gray-900 text-base">Company</h2>
            <ul className="flex items-start flex-col gap-2 text-sm text-gray-500 mt-3">
              <li className="cursor-pointer hover:underline">Home</li>
              <li className="cursor-pointer hover:underline">About us</li>
              <li className="cursor-pointer hover:underline">Contact us</li>
              <li className="cursor-pointer hover:underline">Privacy policy</li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
            <h2 className="font-semibold text-gray-900 text-base">
              Get in touch
            </h2>
            <ul className="flex items-start flex-col gap-2 text-sm text-gray-500 mt-3">
              <li className="cursor-pointer hover:underline">
                +1-234-567-890{" "}
              </li>
              <li className="cursor-pointer hover:underline">
                contact@tranhuuthanh.dev
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="border-b border-t-gray-50 border-b-gray-300 my-6" />
      <p className="text-sm text-center text-gray-500">
        &copy; {new Date().getFullYear()} QuickCart Ecommerce. All rights
        reserved.
      </p>
    </footer>
  );
}

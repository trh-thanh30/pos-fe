import React from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { AiOutlineClose } from "react-icons/ai";
import Logo from "../ui/Logo";

interface ModalProps {
  isOpen?: boolean;
  close: () => void;
  children?: React.ReactNode;
  size: "md" | "xl" | "2xl" | "3xl" | "4xl";
}
export default function Modal({ isOpen, close, children, size }: ModalProps) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none "
      onClose={close}>
      <div className="fixed inset-0 z-50 w-screen overflow-y-auto bg-gray-400/50 backdrop-blur-xs">
        <div className="flex min-h-full items-center justify-center p-4 ">
          <DialogPanel
            transition
            className={`w-full ${size === "md" && "max-w-md p-10"} 
              ${size === "xl" && "max-w-xl p-6"}   
              ${size === "2xl" && "max-w-2xl p-6"} ${
              size === "3xl" && "max-w-3xl p-6"
            }
              ${
                size === "4xl" && "max-w-4xl p-6"
              } rounded-xl bg-gray-50 backdrop-blur-2xl duration-200 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0`}>
            <div className="flex items-center justify-end ">
              <button
                onClick={close}
                className=" text-gray-400  hover:text-gray-900 duration-300 transition-colors hover:cursor-pointer">
                <AiOutlineClose className="w-fit" size={20} />
              </button>
            </div>
            <div className="flex items-center justify-center">
              <Logo />
            </div>

            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

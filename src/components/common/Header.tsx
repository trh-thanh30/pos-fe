"use client";
import React, { useState } from "react";

import Logo from "../ui/Logo";
import NavLink from "./NavLink";
import Modal from "./Modal";
import ModalSignIn from "../auth/ModalSignIn";
import ModalSignup from "../auth/ModalSignup";
import AvatarUser from "./AvatarUser";
import { usePathname } from "next/navigation";
import InputSearch from "../ui/InputSearch";
import ModalCart from "../carts/ModalCart";
import ModalOrders from "../orders/ModalOrders";

export default function Header() {
  const pathName = usePathname();
  const [changeModalForm, setChangeModalForm] = useState<string>("signIn");

  const [openModalManageAccount, setIsOpenModalManageAccount] =
    useState<boolean>(false);
  const [openModalCart, setOpenModalCart] = useState<boolean>(false);
  const [openModalOrder, setOpenModalOrder] = useState<boolean>(false);
  return (
    <>
      <header className="flex items-center justify-between border-b border-b-gray-300 py-3 md:px-16 lg:px-24 ">
        <Logo />
        {pathName !== "/dashboard" && (
          <nav className="flex items-center gap-10">
            <NavLink title="Home" link="/" />
            <NavLink title="Products" link="/products" />
            <NavLink title="About" link="/about" />
            <NavLink title="Contact" link="/contact" />
          </nav>
        )}
        <div className="flex items-center gap-10">
          {pathName !== "/dashboard" && <InputSearch />}

          <AvatarUser
            setIsOpenModalManageAccount={setIsOpenModalManageAccount}
            setOpenModalCart={setOpenModalCart}
            setOpenModalOrder={setOpenModalOrder}
          />
        </div>
      </header>

      {/* Modal sign in and sign up */}

      <Modal
        size="md"
        isOpen={openModalManageAccount}
        close={() => setIsOpenModalManageAccount(false)}>
        {changeModalForm === "signIn" ? (
          <ModalSignIn
            onCloses={() => setIsOpenModalManageAccount(false)}
            setChangeModalForm={() => setChangeModalForm("signUp")}
          />
        ) : (
          <ModalSignup
            setChangeModalForm={() => setChangeModalForm("signIn")}
          />
        )}
      </Modal>
      {/* Modal Cart */}
      <Modal
        size="4xl"
        isOpen={openModalCart}
        close={() => setOpenModalCart(false)}>
        <ModalCart close={() => setOpenModalCart(false)} />
      </Modal>

      {/* Modal Order */}
      <Modal
        size="4xl"
        isOpen={openModalOrder}
        close={() => setOpenModalOrder(false)}>
        <ModalOrders />
      </Modal>
    </>
  );
}

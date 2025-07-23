import Featured from "@/components/common/Featured";
import Thumbnail from "@/components/common/Thumbnail";
import Link from "next/link";
import ClientLayout from "./(client)/layout";
import Products from "@/components/pos/Products";

export default function Home() {
  return (
    <>
      <ClientLayout>
        <Thumbnail />
        <h1 className="text-2xl text-gray-900 font-semibold  mt-20 mb-8">
          Popular products
        </h1>
        <Products />
        <div className="flex items-center justify-center">
          <Link
            href="/products"
            className="   text-gray-500  border border-gray-200 rounded-md text-base hover:bg-gray-100 cursor-pointer transition-colors duration-300 py-2 px-12 mt-16 ">
            See More
          </Link>
        </div>
        <Featured />
      </ClientLayout>
    </>
  );
}

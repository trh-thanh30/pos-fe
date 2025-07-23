import ProductDetails from "@/components/pos/ProductDetails";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;

  return (
    <>
      <ProductDetails productId={productId} />
    </>
  );
}

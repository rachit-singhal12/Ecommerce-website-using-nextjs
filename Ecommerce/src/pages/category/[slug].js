import React from "react";
import { useRouter } from "next/router";
import Breadcrumb from "@/components/cards/layout/Breadcrumb";
import ProductCart from "@/components/cards/ProductCart"; // Make sure to import ProductCart
import Head from "next/head";

function CategoryProducts({ products }) {
  const router = useRouter();
  const categoryNam = router?.query?.slug;
  
  return (
    <>
    <Head>{categoryNam}</Head>
      <main className="mb-4">
        <Breadcrumb title={`${categoryNam?.toLocaleUpperCase()} - Products`} />
        <div className="row">
          {products &&
            products.map((item) => {
              return (
                <div key={item.id} className="col-md-4">
                  <div className="mt-4">
                    <ProductCart product={item} />
                  </div>
                </div>
              );
            })}
        </div>
      </main>
    </>
  );
}

export default CategoryProducts;

export async function getServerSideProps(context) {
  const category = context.params.slug;
  let products = [];
  try {
    const response = await fetch(`https://dummyjson.com/products/category/${category}`);
    const result = await response.json();
    products = result.products;
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }

  return {
    props: {
      products,
    },
  };
}
 
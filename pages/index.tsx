import type { NextPage } from "next";
import FloatButton from "@components/float-button";
import Item from "@components/item";
import Layout from "@components/layouts/layout";
import useUser from "@libs/client/useUser";
import Head from "next/head";
import useSWR from "swr";
import { Product } from "@prisma/client";
import "react-loading-skeleton/dist/skeleton.css";

interface ProductResponse {
  ok: boolean;
  products: Product[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data, isValidating } = useSWR<ProductResponse>("/api/products");
  return (
    <Layout title="홈" hasTabBar>
      <Head>
        <title>Home</title>
      </Head>
      <div className="flex flex-col space-y-5 justify-center">
        {isValidating
          ? new Array(7).fill(1).map((_, i) => (
              <div key={i} className="w-5/6 h-1/6 rounded-md mx-auto mt-6">
                <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
                  <div className="w-1/4 aspect-square bg-gray-300 rounded-md "></div>
                  <div className="flex flex-col w-3/4 space-y-3">
                    <div className="w-full bg-gray-300 h-6 rounded-md "></div>
                    <div className="w-3/4 bg-gray-300 h-6 rounded-md "></div>
                  </div>
                </div>
              </div>
            ))
          : data?.products?.map((product) => (
              <Item
                id={product.id}
                key={product.id}
                title={product.name}
                price={product.price}
                comments={1}
                hearts={product.wishCount}
              />
            ))}
        <FloatButton href="/products/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatButton>
      </div>
    </Layout>
  );
};
export default Home;

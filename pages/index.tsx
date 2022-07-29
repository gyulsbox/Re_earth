import type { NextPage } from "next";
import FloatButton from "@components/float-button";
import Item from "@components/item";
import Layout from "@components/layouts/layout";
import useSWR, { SWRConfig } from "swr";
import { Product } from "@prisma/client";
import "react-loading-skeleton/dist/skeleton.css";
import { formatTime } from "@libs/client/utils";
import Skeleton from "react-loading-skeleton";
import ItemSkeleton from "@components/Skeletons/item-skeleton";

interface ProductResponse {
  ok: boolean;
  products: Product[];
}

const Home: NextPage = () => {
  const { data, error } = useSWR<ProductResponse>("/api/products");
  const isLoading = !data && !error;
  return (
    <Layout seoTitle="Products" title="홈" hasTabBar>
      <div className="flex flex-col space-y-5 justify-center">
        {isLoading
          ? new Array(12).fill(0).map((num) => <ItemSkeleton key={num} />)
          : data?.products?.map((product) => (
              <Item
                id={product.id}
                key={product.id}
                photo={product.image}
                title={product.name}
                price={product.price}
                comments={product.commentsCount}
                hearts={product.wishCount}
                create={formatTime(product.createdAt)}
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

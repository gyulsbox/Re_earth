import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layouts/layout";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Product, User } from "@prisma/client";
import useMutation from "@libs/client/useMutation";
import { setClassName } from "@libs/client/utils";
import useUser from "@libs/client/useUser";

interface ProductWithUser extends Product {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  isLiked: boolean;
  relatedProducts: Product[];
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { data, isValidating, mutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null,
  );
  const [toggleWish] = useMutation(`/api/products/${router.query.id}/wish`);
  const onWishClick = () => {
    toggleWish({});
    if (!data) return;
    mutate({ ...data, isLiked: !data.isLiked }, false);
  };
  return (
    <Layout canGoBack>
      <div className="px-4  py-4">
        <div className="mb-8">
          <img
            className="w-full bg-slate-300"
            src={`https://imagedelivery.net/w46l_DmHQSMJLI8NrmR8QQ/${data?.product.image}/public`}
          />
          <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
            <img
              className="w-12 h-12 rounded-full bg-slate-300"
              src={`https://imagedelivery.net/w46l_DmHQSMJLI8NrmR8QQ/${data?.product?.user?.avatar}/public`}
            />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {isValidating ? <Skeleton /> : data?.product?.user?.name}
              </p>
              <Link href={`/users/profiles/${data?.product?.user?.id}`}>
                <a className="text-xs font-medium text-gray-500">
                  View profile &rarr;
                </a>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {isValidating ? <Skeleton /> : data?.product?.name}
            </h1>
            <span className="text-2xl block mt-3 text-gray-900">
              {isValidating ? (
                <Skeleton />
              ) : (
                `${data?.product?.price.toLocaleString("ko-KR")}원`
              )}
            </span>
            <p className=" my-6 text-gray-700">
              {isValidating ? <Skeleton /> : data?.product?.description}
            </p>
            <div className="flex items-center justify-between space-x-2">
              <Button large text="Talk to seller" />
              <button
                onClick={onWishClick}
                className={setClassName(
                  "p-3 rounded-md flex items-center justify-center",
                  data?.isLiked
                    ? "text-red-500 hover:text-red-600 hover:bg-gray-100"
                    : "text-gray-400 hover:text-gray-500 hover:bg-gray-100",
                )}
              >
                {data?.isLiked ? (
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 "
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className=" mt-6 grid grid-cols-2 gap-4">
            {data?.relatedProducts.map((product) => (
              <div key={product.id}>
                <div className="h-56 w-full mb-4 bg-slate-300" />
                <h3 className="text-gray-700 -mb-1">
                  {isValidating ? <Skeleton /> : product?.name}
                </h3>
                <span className="text-sm font-medium text-gray-900">
                  {isValidating ? (
                    <Skeleton />
                  ) : (
                    `${product?.price.toLocaleString("ko-KR")}원`
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default ItemDetail;

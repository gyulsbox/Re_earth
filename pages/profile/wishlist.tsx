import type { NextPage } from "next";
import Layout from "@components/layouts/layout";
import ProductList from "@components/product-list";

const Wishlist: NextPage = () => {
  return (
    <Layout title="관심목록" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        <ProductList kind="wishs" />
      </div>
    </Layout>
  );
};

export default Wishlist;

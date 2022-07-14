import { Product } from "@prisma/client";
import useSWR from "swr";
import Item from "./item";

interface ProductListProps {
  kind: "wishs" | "sales" | "purchases";
}

interface RecordKind {
  id: number;
  product: Product;
}

interface ProductListResponse {
  [key: string]: RecordKind[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(
    `/api/users/me/record?kind=${kind}`,
  );
  return data ? (
    <>
      {data[kind]?.map((record) => (
        <Item
          key={record.id}
          id={record.product.id}
          title={record.product.name}
          price={record.product.price}
          hearts={record.product.wishCount}
          comments={record.product.commentsCount}
          photo={record.product.image}
          create={record.product.createdAt.toString()}
        />
      ))}
    </>
  ) : null;
}

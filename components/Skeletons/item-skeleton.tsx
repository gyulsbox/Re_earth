import Skeleton from "react-loading-skeleton";

export default function ItemSkeleton() {
  return (
    <div className="flex px-4 pt-3 justify-between w-full z-0">
      <div className="w-20 h-20">
        <Skeleton className="w-20 h-20 bg-gray-400 rounded-md" />
      </div>
      <div className="pt-1 pl-0.5 flex flex-col space-y-1 w-9/12">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
}

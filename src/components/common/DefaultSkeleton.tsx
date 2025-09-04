import { Skeleton } from "@/components/common";

export default function DefaultSkeleton() {
  return (
    <div className="w-full flex flex-col gap-10 lg:flex-row justify-center">
      <div className="w-full p-5 shadow-sm border border-gray-100 flex flex-col md:flex-row rounded-xl items-center gap-5 md:gap-10">
        <div className="flex flex-col md:flex-row justify-between w-full gap-4">
          <div className="flex flex-col gap-2 w-full md:w-2/3">
            <Skeleton height="h-6" width="w-24" rounded="rounded-lg" />
            <Skeleton height="h-7" width="w-full max-w-[400px]" />
            <div className="flex items-center gap-2 opacity-60">
              <Skeleton height="h-4" width="w-5" />
              <Skeleton height="h-4" width="w-[200px]" />
            </div>
          </div>
          <div className="flex flex-row md:flex-col items-center gap-1 w-full md:w-1/3">
            <Skeleton height="h-6" width="w-24" />
            <Skeleton height="h-4" width="w-16" />
          </div>
        </div>
        <Skeleton height="h-10" width="w-full md:w-32" rounded="rounded-lg" />
      </div>
    </div>
  );
}

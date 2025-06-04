"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = () => {
  return (
    <div className="space-y-4 mt-8">
      {/* Simulate table header */}
      <div className="grid grid-cols-6 gap-4">
        <Skeleton className="h-6 col-span-1 rounded" />
        <Skeleton className="h-6 col-span-1 rounded" />
        <Skeleton className="h-6 col-span-1 rounded" />
        <Skeleton className="h-6 col-span-1 rounded" />
        <Skeleton className="h-6 col-span-1 rounded" />
        <Skeleton className="h-6 col-span-1 rounded" />
      </div>

      {/* Simulate multiple table rows */}
      {[...Array(5)].map((_, index) => (
        <div key={index} className="grid grid-cols-6 gap-4">
          <Skeleton className="h-6 col-span-1 rounded" />
          <Skeleton className="h-6 col-span-1 rounded" />
          <Skeleton className="h-6 col-span-1 rounded" />
          <Skeleton className="h-6 col-span-1 rounded" />
          <Skeleton className="h-6 col-span-1 rounded" />
          <Skeleton className="h-6 col-span-1 rounded" />
        </div>
      ))}
    </div>
  );
};

export default TableSkeleton;

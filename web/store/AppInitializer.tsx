"use client";

import { useGetMeQuery } from "./api/authApi";


export default function AppInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading}=useGetMeQuery();
  if (isLoading) {
    return <div>Loading</div>
  }
  return <>{children}</>;
}
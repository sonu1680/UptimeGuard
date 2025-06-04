"use client"
import MonitorDetail from "@/pagess/monitor-detail";
import { useSearchParams } from "next/navigation";

export default function MonitorDetailPage() {
  const searchParams = useSearchParams();
   const name = searchParams.get("website");
   console.log(name, "sonuuju");

  return <MonitorDetail />;
}

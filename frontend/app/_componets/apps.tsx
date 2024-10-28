"use client";
import AppCard from "@/components/apps/app-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { APP_INFO_LIST } from "@/lib/constants/apps";
import { useAppStore } from "@/stores/app-store";
import { GetAppSourceList } from "@/wailsjs/go/controller/AppSource";
import React, { useEffect } from "react";

const AppsPage = () => {
  const { fetchAppSourceList, appSourceList } = useAppStore();

  useEffect(() => {
    fetchAppSourceList().then((res) => {
      console.log("fetchAppSourceList success");
    });
  }, [fetchAppSourceList]);

  return (
    <div className="flex w-full flex-col">
      {/* header */}
      <div className="flex w-full items-center justify-start py-4">
        <p className="text-xl font-medium">Apps</p>
      </div>

      {/* container */}
      {/* <ScrollArea> */}
      <div className="grid grid-cols-3 grid-rows-1 gap-4">
        {APP_INFO_LIST.map((app_info, index) => {
          return <AppCard key={index} appInfo={app_info} />;
        })}
      </div>
      {/* </ScrollArea> */}
    </div>
  );
};

export default AppsPage;

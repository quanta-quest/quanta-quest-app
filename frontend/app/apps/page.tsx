import { AppSidebar } from "@/components/app-sidebar";
import AppCard from "@/components/apps/app-card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import React from "react";

const page = () => (
  <div className="flex w-full flex-col">
    {/* header */}
    <div className="flex w-full items-center justify-start py-4">
      <p className="text-xl font-medium">Apps</p>
    </div>

    {/* container */}
    {/* <ScrollArea>
      <div className="grid grid-cols-3 grid-rows-1 gap-4">
        <AppCard />
        <AppCard />
        <AppCard />
        <AppCard />
        <AppCard />
        <AppCard />
        <AppCard />
        <AppCard />
        <AppCard />
        <AppCard />
        <AppCard />
        <AppCard />
        <AppCard />
      </div>
    </ScrollArea> */}
  </div>
);

export default page;

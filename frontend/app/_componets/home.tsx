"use client";
import { AppSidebar } from "@/components/app-sidebar";
import AppCard from "@/components/apps/app-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppStore } from "@/stores/app-store";
import React from "react";
import AppsPage from "./apps";
import AppManagementPage from "./app-manage";
import GuidesPage from "./guides";

const Home = () => {
  const { currentPage } = useAppStore();

  return (
    <>
      {currentPage === "apps" && <AppsPage />}
      {currentPage.startsWith("apps/") && <AppManagementPage />}
      {currentPage === "guides" && <GuidesPage />}
    </>
  );
};

export default Home;

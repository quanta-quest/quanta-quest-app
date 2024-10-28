"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Input } from "../ui/input";

import { useAppStore } from "@/stores/app-store";
import AppSourceDataImportModal from "./app-source-data-import-modal";
import { AppInfo } from "@/lib/constants/apps";

interface AppCardProps {
  appInfo: AppInfo;
}

const AppCard = ({ appInfo }: AppCardProps) => {
  const { setCurrentPage, appSourceList } = useAppStore();

  const isConnect = () => {
    return appSourceList.find((appSource) => appSource.appKey === appInfo.key);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{appInfo.name}</CardTitle>
          <CardDescription>{appInfo.description}</CardDescription>
        </CardHeader>
        {/* <CardContent>
          <div>{isConnect() ? "Connected" : "Not Connected"}</div>
        </CardContent> */}
        <CardFooter className="flex justify-between">
          {isConnect() ? (
            <>
              <AppSourceDataImportModal
                appKey={appInfo.key}
                appName={appInfo.name}
              />
              {/* <Button
            variant="outline"
            size={"sm"}
            onClick={async (e) => {
              e.preventDefault();
              const result: string = await Greet("app button");
            }}
          >Import</Button> */}

              <Button
                size={"sm"}
                onClick={() => {
                  setCurrentPage("apps/" + appInfo.key);
                }}
              >
                Management
              </Button>
            </>
          ) : (
            <AppSourceDataImportModal
              buttonClassName="w-full"
              appKey={appInfo.key}
              appName={appInfo.name}
            />
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default AppCard;

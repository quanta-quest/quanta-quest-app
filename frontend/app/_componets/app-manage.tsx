import ClearAppDataModal from "@/components/apps/app-clear-data-modal";
import AppDocumentTable from "@/components/apps/app-document-table";
import AppSourceDataImportModal from "@/components/apps/app-source-data-import-modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { APP_INFO_LIST } from "@/lib/constants/apps";
import { useAppStore } from "@/stores/app-store";
import React from "react";

const AppManagementPage = () => {
  const { appKey } = useAppStore();

  const getApp = () => {
    return APP_INFO_LIST.find((app) => app.key === appKey);
  };

  return (
    <div className="flex h-full w-full flex-col gap-4">
      {/* header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {getApp()?.name ?? appKey}
          </CardTitle>
          <CardDescription>{getApp()?.description ?? ""}</CardDescription>
        </CardHeader>
        <CardFooter className="w-ful flex items-center justify-end gap-4">
          <AppSourceDataImportModal
            appKey={appKey}
            appName={getApp()?.name ?? appKey}
          />
          <ClearAppDataModal appKey={appKey} />
        </CardFooter>
      </Card>

      {/* container */}
      <div className="flex">
        <AppDocumentTable />
      </div>
    </div>
  );
};

export default AppManagementPage;

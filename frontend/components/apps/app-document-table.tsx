"use client";

import { GetAppDocuments } from "@/wailsjs/go/controller/AppSource";
import React, { useEffect, useState } from "react";
import { columns, AppDocument } from "./app-document-column";
import { toast } from "sonner";
import { DataTable } from "../data-table";
import { useDebounce } from "@/hooks/use-debounce";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useAppStore } from "@/stores/app-store";

const AppDocumentTable = () => {
  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);

  // const [loading, setLoading] = useState(false);
  // const [data, setData] = useState<DocumentsResponse | null>(null);
  // const [search, setSearch] = useState("");

  const {
    appDocumentTablePage,
    appDocumentTableSearch,
    appDocumentTableLoading,
    appDocumentTableData,
    setAppDocumentTableLoading,
    setAppDocumentTableSearch,
    setAppDocumentTablePage,
    fetchAppDocumentTableData,
  } = useAppStore();

  const debouncedSearch = useDebounce(appDocumentTableSearch, 500); // 防抖处理

  useEffect(() => {
    fetchDocuments();
  }, [appDocumentTablePage, debouncedSearch]);

  const fetchDocuments = async () => {
    setAppDocumentTableLoading(true);
    fetchAppDocumentTableData()
      .then((res) => {
        if (res.code != 200) {
          toast.error(res.message);
        }
      })
      .catch((err: any) => {
        console.log(err);
      })
      .finally(() => {
        setAppDocumentTableLoading(false);
      });
  };

  return (
    <div className="container mx-auto flex flex-col gap-4 py-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-2">
          <Input
            placeholder="Search"
            onChange={(e) => setAppDocumentTableSearch(e.target.value)}
          />
        </div>
        <Badge variant="outline">
          Total: {appDocumentTableData?.total ?? 0}
        </Badge>
      </div>
      <DataTable
        columns={columns}
        data={appDocumentTableData?.items ?? []}
        pageCount={Math.ceil(appDocumentTableData?.total ?? 0) / 10}
        page={appDocumentTablePage}
        onPageChange={(page) => {
          setAppDocumentTablePage(page);
        }}
        isLoading={appDocumentTableLoading}
      />
    </div>
  );
};

export default AppDocumentTable;

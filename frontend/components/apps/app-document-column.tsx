import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useAppStore } from "@/stores/app-store";
import { Trash } from "lucide-react";
import { DeleteAppDocument } from "@/wailsjs/go/controller/AppDocumentController";
import AppDocumentDeleteModal from "../app-document/app-document-delete-modal";

export interface AppDocument {
  id: number;
  title: string;
  documentType: string;
  sourceId: string;

  status: number;
  createdAt: string;
  updatedAt: string;
}

export const columns: ColumnDef<AppDocument>[] = [
  {
    accessorKey: "title",
    header: "Subject",
  },
  // {
  //   accessorKey: "sourceId",
  //   header: "来源ID",
  // },
  // {
  //   accessorKey: "documentType",
  //   header: "文档类型",
  // },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <Badge variant={"outline"}>Imported</Badge>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return date.toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      //   return new Date().toLocaleString();
      // return row.getValue("createdAt");
    },
  },
  {
    id: "actions",
    header: "Actions",
    // cell: ({ row }) => (
    //   <Button
    //     variant={"destructive"}
    //     size={"sm"}
    //     onClick={() => {
    //       console.log("delete", row.getValue("sourceId"));
    //     }}
    //   >
    //     Delete
    cell: ({ row }) => {
      // const sourceId = row.getValue("id");
      // console.log(row);

      const id = row.original.id;

      return (
        <div className="flex items-center justify-center">
          <AppDocumentDeleteModal id={id} title={row.original.title} />
        </div>
      );
    },
  },
];

import React from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// 定义可能的 appKey 值
export function generateStaticParams() {
  // 返回所有可能的 appKey 值
  return [
    { appKey: "gmail" },
    // ... 添加其他可能的 appKey
  ];
}

// 页面组件
interface PageProps {
  params: {
    appKey: string;
  };
}
const Page = ({ params }: PageProps) => {
  const { appKey } = params;

  return (
    <div className="flex h-full w-full flex-col gap-4">
      {/* header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{appKey}</CardTitle>
          <CardDescription>Desc</CardDescription>
        </CardHeader>
        <CardFooter className="w-ful flex items-center justify-end gap-4">
          <Button size={"sm"}>Import</Button>
          <Button size={"sm"} variant={"destructive"}>
            Delete app
          </Button>
        </CardFooter>
      </Card>

      {/* container */}
      <div className="flex">Table</div>
    </div>
  );
};

export default Page;

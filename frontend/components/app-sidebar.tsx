"use client";
import { BookOpenText, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";
import { Button } from "./ui/button";

const sidebarLinks = [
  {
    label: "Apps",
    icon: <LayoutGrid size={18} />,
    pageKey: "apps",
  },
  {
    label: "Guide",
    icon: <BookOpenText size={18} />,
    pageKey: "guides",
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { currentPage, setCurrentPage } = useAppStore();

  const isCurrentNav = (pageKey: string) => {
    if (currentPage.startsWith(pageKey)) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className="flex min-h-screen w-60 flex-grow-0 flex-col justify-start bg-slate-100 p-4">
      <div className="pb-8 pt-4">
        <h1 className="text-2xl font-extrabold">Quanta Quest</h1>
      </div>
      <div className="flex h-full w-full flex-col gap-4">
        {/* <ScrollArea> */}
        {sidebarLinks.map((item) => {
          return (
            <Button
              className="flex items-center justify-start text-start"
              size={"sm"}
              variant={"ghost"}
              key={item.pageKey}
              onClick={() => {
                setCurrentPage(item.pageKey);
              }}
            >
              <div className="flex items-center justify-start gap-4">
                <span
                  className={cn("text-zinc-500", {
                    "text-foreground": isCurrentNav(item.pageKey), //pathname.startsWith(item.link)
                  })}
                >
                  {item.icon}
                </span>
                <span
                  className={cn("text-md font-normal text-zinc-500", {
                    "font-medium text-foreground": isCurrentNav(item.pageKey),
                  })}
                >
                  {item.label}
                </span>
              </div>
            </Button>
          );
        })}
        {/* </ScrollArea> */}
      </div>
    </div>
  );
}

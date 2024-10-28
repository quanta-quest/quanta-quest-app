import Faq from "@/components/guides/faq";
import React from "react";

const GuidesPage = () => {
  return (
    <div className="flex w-full flex-col">
      {/* header */}
      <div className="flex w-full items-center justify-start py-4">
        <p className="text-xl font-medium">Guides</p>
      </div>

      {/* container */}
      {/* <ScrollArea> */}
      <div className="flex flex-col items-center justify-start gap-4">
        <Faq />
      </div>
      {/* </ScrollArea> */}
    </div>
  );
};

export default GuidesPage;

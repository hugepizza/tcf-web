import UniversalHeader from "@/components/Header/Universal";

import Side from "./Side";

function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <UniversalHeader />
      <div className="flex flex-row w-full h-[calc(100vh-var(--header-height))]">
        <Side />
        <div className="sm:w-5/6 w-full h-full bg-white">{children}</div>
      </div>
    </div>
  );
}

export default ResourcesLayout;

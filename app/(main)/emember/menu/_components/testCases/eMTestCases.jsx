"use client";
import PageHeader from "@/components/myUi/PageHeader";
import { useState } from "react";
import EmTCTables from "./testCasesTables";
import emTCColumns from "./testCasesColumns";

const EmTCPage = ({ tcData, menuId }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full">
      <PageHeader
        pageTitle="Emember Test Cases"
        pageDesc="Manage your emember test cases here"
      />

      {/* Table */}
      <div className="grid grid-cols-1 gap-4 ">
        <EmTCTables data={tcData} columns={emTCColumns()} loading={loading} />
      </div>
    </div>
  );
};

export default EmTCPage;

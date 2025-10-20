"use client";
import PageHeader from "@/components/myUi/PageHeader";
import { useState } from "react";
import TestCasesTables from "./testCasesTables";
import xpsTCColumns from "./testCasesColumns";
const XpsTCPage = ({ tcData, menuId }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <PageHeader
        pageTitle="Test Cases"
        pageDesc="Manage your test cases here"
      />

      {/* Table */}
      <div className="grid grid-cols-1 gap-4 ">
        <TestCasesTables
          data={tcData}
          columns={xpsTCColumns({ onEdit: () => {}, onDelete: () => {} })}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default XpsTCPage;

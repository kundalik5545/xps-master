"use client";
import PageHeader from "@/components/myUi/PageHeader";
import React, { useEffect, useState } from "react";
import TestCasesTables from "./_components/testCasesTables";
import { getXpsTestCases } from "@/actions/xps/xpsTestCases";
import xpsTCColumns from "./_components/testCasesColumns";

const XpsTestCasesPage = () => {
  const [testCasesData, setTestCasesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTestCasesData = async () => {
      setLoading(true);
      const res = await getXpsTestCases();
      console.log("xps test cases data", res);
      setTestCasesData(res.resData);
      setLoading(false);
    };
    fetchTestCasesData();
  }, []);

  return (
    <div>
      <PageHeader
        pageTitle="Test Cases"
        pageDesc="Manage your test cases here"
      />

      <div className="grid grid-cols-1 gap-4 ">
        <TestCasesTables
          data={testCasesData}
          columns={xpsTCColumns({ onEdit: () => {}, onDelete: () => {} })}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default XpsTestCasesPage;

"use client";
import { getEmTestCases } from "@/actions/emember/em_TestCases";
import PageHeader from "@/components/myUi/PageHeader";
import { useEffect, useState } from "react";
import emTCColumns from "./_components/testCasesColumns";
import EmTCTables from "./_components/EmTCTables";

const EmTestCasesPage = () => {
  const [testCasesData, setTestCasesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTestCasesData = async () => {
      setLoading(true);
      const res = await getEmTestCases();
      setTestCasesData(res.resData);
      setLoading(false);
    };
    fetchTestCasesData();
  }, []);

  return (
    <div>
      <PageHeader
        pageTitle="Emember Test Cases"
        pageDesc="Manage your emember test cases here"
      />

      <div className="grid grid-cols-1 gap-4 ">
        <EmTCTables
          data={testCasesData}
          columns={emTCColumns({ onEdit: () => {}, onDelete: () => {} })}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default EmTestCasesPage;

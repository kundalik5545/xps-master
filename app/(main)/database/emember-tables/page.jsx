"use client";
import { getEmTables } from "@/actions/database/em_databaseReq";
import PageHeader from "@/components/myUi/PageHeader";
import { useEffect, useState } from "react";
import { emTablesColumns } from "./_components/tableColumns";
import EmDbTables from "./_components/emDbTables";

const EmTablesPage = () => {
  const [emTablesData, setEmTablesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmTables = async () => {
      setLoading(true);
      const res = await getEmTables();
      setEmTablesData(res.resData);
      setLoading(false);
    };
    fetchEmTables();
  }, []);

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        pageTitle="Emember Tables"
        pageDesc="Manage your emember tables here"
      />

      {/* Table */}
      <div className="grid grid-cols-1 gap-4 ">
        <EmDbTables
          data={emTablesData}
          columns={emTablesColumns()}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default EmTablesPage;

"use client";
import React, { useEffect, useState } from "react";
import { getXpsTables } from "@/actions/database/xps_databaseReq";
import PageHeader from "@/components/myUi/PageHeader";
import DbTables from "./_components/dbTables";
import dbTablesColumns from "./_components/tableColumns";

const XPSTablesPage = () => {
  const [xpsTablesData, setXpsTablesData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchXpsTables = async () => {
      setLoading(true);
      const res = await getXpsTables();
      setXpsTablesData(res.resData);
      setLoading(false);
    };
    fetchXpsTables();
  }, []);

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        pageTitle="Xps Tables"
        pageDesc="Manage your xps tables here"
      />

      {/* Table */}
      <div className="grid grid-cols-1 gap-4 ">
        <DbTables
          data={xpsTablesData}
          columns={dbTablesColumns()}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default XPSTablesPage;

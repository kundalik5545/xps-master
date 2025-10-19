"use client";
import PageHeader from "@/components/myUi/PageHeader";
import React, { useEffect, useState } from "react";
import UserGuideTable from "./_components/UserGuideTables";
import userGuideColumns from "./_components/userGuideColumns";
import { getXpsUserGuides } from "@/actions/xps/getXpsReq";

const XpsUserGuidesPage = () => {
  const [userGuideData, setUserGuideData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserGuideData = async () => {
      setLoading(true);
      const res = await getXpsUserGuides();
      setUserGuideData(res.resData);
      setLoading(false);
    };
    fetchUserGuideData();
  }, []);

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        pageTitle="Xps User Guides"
        pageDesc="Manage your xps user guides here"
      />

      {/* Table */}
      <div className="grid grid-cols-1 gap-4 ">
        <UserGuideTable
          data={userGuideData}
          columns={userGuideColumns()}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default XpsUserGuidesPage;

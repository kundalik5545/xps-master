"use client";
import React, { useEffect, useState } from "react";
import { xpsMenuColumns } from "./_components/menuColumns";
import { getXpsMenus } from "@/actions/xps/getXpsReq";
import MenuTables from "./_components/menuTables";
import PageHeader from "@/components/myUi/PageHeader";

const XpsMenuPage = () => {
  const [xpsMenuData, setXpsMenuData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchXpsMenuData = async () => {
      setLoading(true);
      const res = await getXpsMenus();
      setXpsMenuData(res.resData);
      setLoading(false);
    };
    fetchXpsMenuData();
  }, []);

  return (
    <div>
      {/* Page Header */}
      <PageHeader pageTitle="Xps Menu" pageDesc="Manage your xps menu here" />

      {/* Table */}
      <div className="grid grid-cols-1 gap-4 ">
        <MenuTables
          data={xpsMenuData}
          columns={xpsMenuColumns()}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default XpsMenuPage;

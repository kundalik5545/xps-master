"use client";
import { getEmMenus } from "@/actions/emember/getEmReq";
import PageHeader from "@/components/myUi/PageHeader";
import { useEffect, useState } from "react";
import emMenuColumns from "./_components/menuColumns";
import MenuTables from "./_components/menuTables";

const EmMenuPage = () => {
  const [emMenuData, setEmMenuData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmMenuData = async () => {
      setLoading(true);
      const res = await getEmMenus();
      setEmMenuData(res.resData);
      setLoading(false);
    };
    fetchEmMenuData();
  }, []);

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        pageTitle="Emember Menu"
        pageDesc="Manage your emember menu here"
      />

      {/* Table */}
      <div className="grid grid-cols-1 gap-4 ">
        <MenuTables
          data={emMenuData}
          columns={emMenuColumns()}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default EmMenuPage;

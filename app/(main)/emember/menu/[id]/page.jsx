"use client";
import { getAllEmMenuDetailsById } from "@/actions/emember/getEmReq";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import EmScripts from "../_components/scripts/EmScripts";
import EmUserGuide from "../_components/EmUserGuide";
import EmMenuTables from "../_components/EmMenuTables";
import emTablesColumns from "@/app/(main)/database/emember-tables/_components/tableColumns";
import EmTCPage from "../_components/testCases/XpsTestCases";

const SingleMenuPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [menuDetail, setMenuDetail] = useState([]);
  const [activeTab, setActiveTab] = useState("information");

  useEffect(() => {
    setLoading(true);
    const fetchMenuDetails = async () => {
      const res = await getAllEmMenuDetailsById(id);
      setMenuDetail(res.resData[0]);
      setLoading(false);
    };
    fetchMenuDetails();
  }, [id]);

  // Page details
  const pageTitle = menuDetail?.emMenuName || "Emember Menu Details";

  console.log("menuDetail is", menuDetail);
  return (
    <div>
      {/* Page Heading */}
      <div className="flex items-center justify-between  mt-5 mb-5">
        <h2 className="text-2xl font-bold">
          {`{ ${pageTitle} } `}
          <sup className="mr-2">
            <Badge className={"bg-purple-500 text-xs"}>
              {menuDetail?.portalName}
            </Badge>
          </sup>

          <sup className="mr-2">
            <Badge
              className={
                menuDetail?.automationStatus === "Automated"
                  ? "bg-green-500 text-xs"
                  : "bg-red-500 text-xs"
              }
            >
              {menuDetail?.automationStatus}
            </Badge>
          </sup>
        </h2>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>

      {/* Tab section with 7 tabs using shadcn */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="">
        <TabsList>
          <TabsTrigger className={"w-[130px]"} value="information">
            Information
          </TabsTrigger>
          <TabsTrigger className={"w-[130px]"} value="scripts">
            Scripts
          </TabsTrigger>
          <TabsTrigger className={"w-[130px]"} value="test-cases">
            Test Cases
          </TabsTrigger>
          <TabsTrigger className={"w-[130px]"} value="tables">
            Tables
          </TabsTrigger>
          <TabsTrigger className={"w-[130px]"} value="user-guides">
            User Guides
          </TabsTrigger>
          <TabsTrigger className={"w-[130px]"} value="task-list">
            Task List
          </TabsTrigger>
        </TabsList>
        <TabsContent value="information">Xps Menu Desc</TabsContent>
        <TabsContent value="scripts">
          <TabsContent value="scripts">
            <EmScripts scriptsData={menuDetail} menuId={id} />
          </TabsContent>
        </TabsContent>
        <TabsContent value="test-cases">
          <EmTCPage tcData={menuDetail?.emTestCases} menuId={id} />
        </TabsContent>
        <TabsContent value="tables">
          <EmMenuTables emTablesData={menuDetail?.emTables} />
        </TabsContent>
        <TabsContent value="user-guides">
          <EmUserGuide userGuideDetails={menuDetail?.emUserGuides} />
        </TabsContent>
        <TabsContent value="task-list">
          <div className="p-4">
            <p className="text-sm text-muted-foreground">
              Task list content will load here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SingleMenuPage;

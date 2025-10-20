"use client";
import { getAllXpeMenuDetailsById } from "@/actions/xps/getXpsReq";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import XpsTables from "../_components/XpsTables";
import XpsUserGuide from "../_components/XpsUserGuide";
import XpsTCPage from "../_components/testCases/XpsTestCases";
import XpsScripts from "../_components/scripts/XpsScripts";

const SingleMenuPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [menuDetail, setMenuDetail] = useState([]);
  const [activeTab, setActiveTab] = useState("information");

  useEffect(() => {
    setLoading(true);
    const fetchMenuDetails = async () => {
      const res = await getAllXpeMenuDetailsById(id);
      setMenuDetail(res.resData[0]);
      setLoading(false);
    };
    fetchMenuDetails();
  }, [id]);

  // Page details
  const pageTitle = menuDetail?.menuName || "XPS Menu Details";

  console.log("menuDetail is", menuDetail);
  return (
    <div>
      {/* Page Heading */}
      <div className="flex items-center justify-between  mt-5 mb-5">
        <h2 className="text-2xl font-bold">
          {`{ ${pageTitle} } `}
          <sup className="mr-2">
            <Badge className={"bg-purple-500 text-xs"}>
              {menuDetail?.schemeLevel}
            </Badge>
          </sup>
          <sup className="mr-2">
            <Badge className={"bg-blue-500 text-xs"}>
              {menuDetail?.module}
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
            <XpsScripts scriptsData={menuDetail} menuId={id} />
          </TabsContent>
        </TabsContent>
        <TabsContent value="test-cases">
          <XpsTCPage tcData={menuDetail?.xpsTestCases} menuId={id} />
        </TabsContent>
        <TabsContent value="tables">
          <XpsTables xpsTablesData={menuDetail?.xpsTables} />
        </TabsContent>
        <TabsContent value="user-guides">
          <XpsUserGuide userGuideDetails={menuDetail?.xpsUserGuides} />
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

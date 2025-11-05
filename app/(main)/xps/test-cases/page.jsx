"use client";
import PageHeader from "@/components/myUi/PageHeader";
import React, { useEffect, useState } from "react";
import TestCasesTables from "./_components/testCasesTables";
import {
  addUpdateXpsTestCase,
  deleteXpsTestCase,
  getXpsTestCases,
  getXpsTestCasesStats,
} from "@/actions/xps/xpsTestCases";
import {
  BarChartBig,
  CheckCircle2,
  XCircle,
  ArrowDownCircle,
  LayoutList,
  Puzzle,
  Layers2,
  Zap,
} from "lucide-react";
import xpsTCColumns from "./_components/testCasesColumns";
import FormModal from "@/components/myUi/FormModal";
import TestCaseForm from "./_components/testCaseForm";
import useSingleDelete from "@/hooks/useSingleDelete";
import useFormSubmit from "@/hooks/useFormSubmit";

const XpsTestCasesPage = () => {
  const [testCasesData, setTestCasesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);

  useEffect(() => {
    const fetchTestCasesData = async () => {
      setLoading(true);
      const res = await getXpsTestCases();
      setTestCasesData(res.resData);
      setLoading(false);
    };
    fetchTestCasesData();
  }, []);

  const { handleFormSubmit: handleSubmit, loading: loadingSubmit } =
    useFormSubmit({
      formSubmitAction: addUpdateXpsTestCase,
      isEditing: isEditing,
      editingData: editingData,
      setData: setTestCasesData,
      setIsDialogOpen: setIsDialogOpen,
      setIsEditing: setIsEditing,
      setEditingData: setEditingData,
    });

  const onEdit = (record) => {
    setEditingData(record);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const { onDelete, loading: deleting } = useSingleDelete({
    deleteAction: deleteXpsTestCase,
    setData: setTestCasesData,
  });

  return (
    <div>
      <PageHeader
        pageTitle="Test Cases"
        pageDesc="Manage your test cases here"
        buttonText="Add Test Case"
        setIsDialogOpen={setIsDialogOpen}
        setIsEditing={setIsEditing}
      />

      {/* Table */}
      <div className="grid grid-cols-1 gap-4 ">
        <TestCasesTables
          data={testCasesData}
          columns={xpsTCColumns({ onEdit, onDelete, deleting })}
          loading={loading}
        />
      </div>

      {/* Test Case Form */}
      <FormModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        isEditing={isEditing}
        myForm={
          <TestCaseForm
            onFormSubmit={handleSubmit}
            editingData={editingData}
            loadingSubmit={loadingSubmit}
          />
        }
      />

      {/* Test cases stats cards */}
      <div className="mb-3">
        <TestCasesStatsCards />
      </div>
    </div>
  );
};

export default XpsTestCasesPage;

const statIcons = {
  totalTestCases: <BarChartBig className="w-7 h-7 text-indigo-500" />,
  automated: <Zap className="w-7 h-7 text-emerald-600" />,
  notAutomated: <Zap className="w-7 h-7 text-gray-400" />,
  passed: <CheckCircle2 className="w-7 h-7 text-green-600" />,
  failed: <XCircle className="w-7 h-7 text-red-600" />,
  skipped: <ArrowDownCircle className="w-7 h-7 text-yellow-500" />,
};

const TestCasesStatsCards = () => {
  const [stats, setStats] = useState({
    totalTestCases: 0,
    automated: 0,
    notAutomated: 0,
    passed: 0,
    failed: 0,
    skipped: 0,
    moduleStats: [],
    schemeLevelStats: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await getXpsTestCasesStats();
      if (res.success && res.resData) {
        setStats({
          totalTestCases: res.resData.totalTestCases,
          automated: res.resData.automated,
          notAutomated: res.resData.notAutomated,
          passed: res.resData.passed,
          failed: res.resData.failed,
          skipped: res.resData.skipped,
          moduleStats: res.resData.moduleStats || [],
          schemeLevelStats: res.resData.schemeLevelStats || [],
        });
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="mt-5 flex flex-col gap-6 w-full">
      {/* Key Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 w-full">
        <StatsCard
          title="Total Test Cases"
          value={stats.totalTestCases}
          icon={statIcons.totalTestCases}
          className="bg-gradient-to-br from-indigo-100 to-indigo-50"
        />
        <StatsCard
          title="Automated"
          value={stats.automated}
          icon={statIcons.automated}
          className="bg-gradient-to-br from-emerald-50 to-emerald-100"
        />
        <StatsCard
          title="Not Automated"
          value={stats.notAutomated}
          icon={statIcons.notAutomated}
          className="bg-gradient-to-br from-gray-50 to-gray-100"
        />
        <StatsCard
          title="Passed"
          value={stats.passed}
          icon={statIcons.passed}
          className="bg-gradient-to-br from-green-50 to-green-100"
        />
        <StatsCard
          title="Failed"
          value={stats.failed}
          icon={statIcons.failed}
          className="bg-gradient-to-br from-red-50 to-red-100"
        />
        <StatsCard
          title="Skipped"
          value={stats.skipped}
          icon={statIcons.skipped}
          className="bg-gradient-to-br from-yellow-50 to-yellow-100"
        />
      </div>

      {/* Module Stats Cards */}
      {stats.moduleStats?.length > 0 && (
        <div>
          <div className="mb-2 ml-1 text-base font-semibold text-gray-700 flex items-center gap-1">
            <LayoutList className="w-4 h-4" /> By Module
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {stats.moduleStats.map((mod) => (
              <SmallStatsCard
                key={mod.module}
                title={mod.module ?? "Other"}
                value={mod.count}
                icon={<Puzzle className="w-5 h-5 text-indigo-500" />}
                className="bg-white"
              />
            ))}
          </div>
        </div>
      )}

      {/* Scheme Level Stats Cards */}
      {stats.schemeLevelStats?.length > 0 && (
        <div>
          <div className="mb-2 ml-1 text-base font-semibold text-gray-700 flex items-center gap-1">
            <Layers2 className="w-4 h-4" /> By Scheme Level
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {stats.schemeLevelStats.map((scheme) => (
              <SmallStatsCard
                key={scheme.schemeLevel}
                title={scheme.schemeLevel ?? "Other"}
                value={scheme.count}
                icon={<Layers2 className="w-5 h-5 text-indigo-400" />}
                className="bg-white"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const StatsCard = ({ title, value, icon, className = "" }) => (
  <div
    className={`flex flex-col gap-2 items-center justify-center p-4 rounded-xl shadow-sm ${className}`}
  >
    <div>{icon || null}</div>
    <h3 className="text-sm font-medium text-gray-700 text-center mt-2">
      {title}
    </h3>
    <div className="mt-1 text-2xl font-bold text-gray-900">{value}</div>
  </div>
);

const SmallStatsCard = ({ title, value, icon, className = "" }) => (
  <div
    className={`flex flex-col items-center justify-center p-3 rounded-lg shadow-sm border ${className}`}
  >
    <div className="mb-1">{icon}</div>
    <span className="text-xs font-medium text-gray-700 text-center">
      {title}
    </span>
    <span className="text-base font-semibold text-gray-900">{value}</span>
  </div>
);

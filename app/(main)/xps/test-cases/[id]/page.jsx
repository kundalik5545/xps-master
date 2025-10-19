"use client";
import React, { useEffect, useState } from "react";
import PageHeader from "@/components/myUi/PageHeader";
import { useParams } from "next/navigation";
import { getXpsTestCaseById } from "@/actions/xps/xpsTestCases";
import { Button } from "@/components/ui/button";

const CardRow = ({ label, value }) => (
  <div className="flex flex-col px-4 py-3 min-w-0">
    <span className="text-sm text-muted-foreground font-medium truncate">
      {label}
    </span>
    <span className="text-base font-semibold break-all">
      {value ?? <span className="italic text-gray-400">—</span>}
    </span>
  </div>
);

const TestCasePage = () => {
  const { id } = useParams();
  const [testCase, setTestCase] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    const fetchTestCase = async () => {
      const res = await getXpsTestCaseById(id);
      setTestCase(res.resData);
      setLoading(false);
    };
    fetchTestCase();
  }, [id]);

  return (
    <div className="w-full mx-auto">
      <PageHeader pageTitle="Test Case" pageDesc="Manage your test case here" />
      {loading ? (
        <div className="animate-pulse px-2 py-12 text-center text-muted-foreground">
          Loading...
        </div>
      ) : !testCase ? (
        <div className="px-2 py-12 text-center text-destructive">
          Test case not found.
        </div>
      ) : (
        <div className="bg-card/80 rounded-lg shadow flex flex-col gap-0 overflow-x-auto border border-border my-4 p-0">
          {/* Header */}
          <div className="flex flex-col gap-2 px-6 pt-4 pb-2">
            <div className="flex justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-red-600">
                  #{testCase.testCaseNo}
                </span>
                <span className="text-xl font-semibold text-blue-700 break-all">
                  {testCase.testCaseName}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.history.back()}
              >
                Back
              </Button>
            </div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mt-1">
              {testCase.schemeType && (
                <span className="inline-block text-xs font-medium rounded bg-blue-100 text-blue-700 px-2 py-0.5">
                  {testCase.schemeType}
                </span>
              )}
              {testCase.schemeLevel && (
                <span className="inline-block text-xs font-medium rounded bg-green-100 text-green-800 px-2 py-0.5">
                  {testCase.schemeLevel}
                </span>
              )}
              {testCase.module && (
                <span className="inline-block text-xs font-medium rounded bg-purple-100 text-purple-800 px-2 py-0.5">
                  {testCase.module}
                </span>
              )}
              {testCase.automationStatus && (
                <span className="inline-block text-xs font-medium rounded bg-yellow-100 text-yellow-800 px-2 py-0.5">
                  {testCase.automationStatus}
                </span>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border my-2" />

          {/* Results */}
          <div className="flex flex-col gap-0 px-6 pb-6">
            <div className="mb-1">
              <span className="text-sm text-muted-foreground font-medium block mb-0.5">
                Expected Result
              </span>
              <span className="text-base font-semibold break-all block">
                {testCase.expectedResult ?? (
                  <span className="italic text-gray-400">—</span>
                )}
              </span>
            </div>
            <div className="mb-1 mt-3">
              <span className="text-sm text-muted-foreground font-medium block mb-0.5">
                Actual Result
              </span>
              <span className="text-base font-semibold break-all block">
                {testCase.actualResult ?? (
                  <span className="italic text-gray-400">—</span>
                )}
              </span>
            </div>
            <div className="mb-0 mt-3">
              <span className="text-sm text-muted-foreground font-medium block mb-0.5">
                Comments
              </span>
              <span className="text-base break-all block">
                {testCase.comments ?? (
                  <span className="italic text-gray-400">—</span>
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestCasePage;

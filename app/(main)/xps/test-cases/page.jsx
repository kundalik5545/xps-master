"use client";
import PageHeader from "@/components/myUi/PageHeader";
import React, { useEffect, useState } from "react";
import TestCasesTables from "./_components/testCasesTables";
import {
  addUpdateXpsTestCase,
  deleteXpsTestCase,
  getXpsTestCases,
} from "@/actions/xps/xpsTestCases";
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
      console.log("xps test cases data", res);
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
    </div>
  );
};

export default XpsTestCasesPage;

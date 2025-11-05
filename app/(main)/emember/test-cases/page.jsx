"use client";
import {
  addUpdateEmTestCase,
  deleteEmTestCase,
  getEmTestCases,
} from "@/actions/emember/em_TestCases";
import PageHeader from "@/components/myUi/PageHeader";
import useFormSubmit from "@/hooks/useFormSubmit";
import useSingleDelete from "@/hooks/useSingleDelete";
import { useEffect, useState } from "react";
import EmTCForm from "./_components/EmTCForm";
import EmTCTables from "./_components/EmTCTables";
import emTCColumns from "./_components/testCasesColumns";
import FormModal from "@/components/myUi/FormModal";

const EmTestCasesPage = () => {
  const [testCasesData, setTestCasesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);

  useEffect(() => {
    const fetchTestCasesData = async () => {
      setLoading(true);
      const res = await getEmTestCases();
      setTestCasesData(res.resData);
      setLoading(false);
    };
    fetchTestCasesData();
  }, []);

  const { handleFormSubmit: handleSubmit, loading: loadingSubmit } =
    useFormSubmit({
      formSubmitAction: addUpdateEmTestCase,
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
    deleteAction: deleteEmTestCase,
    setData: setTestCasesData,
  });
  return (
    <div>
      <PageHeader
        pageTitle="Emember Test Cases"
        pageDesc="Manage your emember test cases here"
        buttonText="Add Test Case"
        setIsDialogOpen={setIsDialogOpen}
        setIsEditing={setIsEditing}
      />

      {/* Table */}
      <div className="grid grid-cols-1 gap-4 ">
        <EmTCTables
          data={testCasesData}
          columns={emTCColumns({ onEdit, onDelete, deleting })}
          loading={loading}
        />
      </div>

      {/* Test Case Form */}
      <FormModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        isEditing={isEditing}
        myForm={
          <EmTCForm
            onFormSubmit={handleSubmit}
            editingData={editingData}
            loadingSubmit={loadingSubmit}
          />
        }
      />
    </div>
  );
};

export default EmTestCasesPage;

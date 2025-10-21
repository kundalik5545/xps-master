"use client";
import {
  addUpdateEmBug,
  deleteEmBug,
  getAllEmBugs,
} from "@/actions/emember/em_BugsList";
import FormModal from "@/components/myUi/FormModal";
import PageHeader from "@/components/myUi/PageHeader";
import useFormSubmit from "@/hooks/useFormSubmit";
import useSingleDelete from "@/hooks/useSingleDelete";
import { useEffect, useState } from "react";
import EmBugTables from "./_components/emBugTables";
import emBugsColumns from "./_components/emBugColumn";
import EmBugForm from "./_components/emBugForm";

const EmBugsPage = () => {
  const [bugsData, setBugsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);

  useEffect(() => {
    const fetchBugsData = async () => {
      setLoading(true);
      const res = await getAllEmBugs();
      setBugsData(res.resData);
      setLoading(false);
    };
    fetchBugsData();
  }, []);

  const { handleFormSubmit: handleSubmit, loading: loadingSubmit } =
    useFormSubmit({
      formSubmitAction: addUpdateEmBug,
      isEditing: isEditing,
      editingData: editingData,
      setData: setBugsData,
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
    deleteAction: deleteEmBug,
    setData: setBugsData,
  });

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        pageTitle="Emember Bugs List"
        pageDesc="Manage your emember bugs list here"
        buttonText="Add Bug"
        setIsDialogOpen={setIsDialogOpen}
        setIsEditing={setIsEditing}
      />

      {/* Table */}
      <div className="grid grid-cols-1 gap-4 ">
        <EmBugTables
          data={bugsData}
          columns={emBugsColumns({ onEdit, onDelete, deleting })}
          loading={loading}
        />
      </div>

      {/* Xps Bug Form */}
      <FormModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        isEditing={isEditing}
        myForm={
          <EmBugForm
            onFormSubmit={handleSubmit}
            editingData={editingData}
            loadingSubmit={loadingSubmit}
          />
        }
      />
    </div>
  );
};

export default EmBugsPage;

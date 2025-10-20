"use client";
import PageHeader from "@/components/myUi/PageHeader";
import React, { useEffect, useState } from "react";
import DWTable from "./_components/DWTable";
import {
  addUpdateDailyWork,
  deleteDailyWorkById,
  getDailyWork,
  multiDeleteDailyWork,
} from "@/actions/basics/dailyWork";
import { dwTaskColumns } from "./_components/DWColumns";
import useSingleDelete from "@/hooks/useSingleDelete";
import { useMultiDelete } from "@/hooks/useMultiDelete";
import useFormSubmit from "@/hooks/useFormSubmit";
import FormModal from "@/components/myUi/FormModal";
import DWTaskForm from "./_components/DWTaskForm";

const DailyWorkPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dailyWorkData, setDailyWorkData] = useState([]);
  const [editingData, setEditingData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchDailyWork = async () => {
      const res = await getDailyWork();
      setDailyWorkData(res.resData);
      setLoading(false);
    };
    fetchDailyWork();
  }, []);

  const { handleFormSubmit: handleSubmit, loading: loadingSubmit } =
    useFormSubmit({
      formSubmitAction: addUpdateDailyWork,
      isEditing: isEditing,
      editingData: editingData,
      setData: setDailyWorkData,
      setIsDialogOpen: setIsDialogOpen,
      setIsEditing: setIsEditing,
      setEditingData: setEditingData,
    });

  // Editing Portal Data
  const onEdit = (record) => {
    setEditingData(record);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  // Delete Portal Data
  const { onDelete, loading: deleting } = useSingleDelete({
    deleteAction: deleteDailyWorkById,
    setData: setDailyWorkData,
  });

  // Handle Multi Delete
  const { handleMultiDelete, loading: multiDeleteLoading } = useMultiDelete({
    multiDeleteAction: multiDeleteDailyWork,
    setData: setDailyWorkData,
  });

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        pageTitle="Daily Work"
        pageDesc="Manage your daily work here"
        buttonText="Add Daily Work"
        setIsDialogOpen={setIsDialogOpen}
        setIsEditing={setIsEditing}
      />

      {/* Daily Work Table */}
      <div className="grid grid-cols-1 gap-4 ">
        <DWTable
          data={dailyWorkData}
          columns={dwTaskColumns({ onEdit, onDelete, deleting })}
          onMultiRowDelete={handleMultiDelete}
          loading={multiDeleteLoading}
        />
      </div>

      {/* Daily Work Form */}
      <FormModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        isEditing={isEditing}
        myForm={
          <DWTaskForm
            onFormSubmit={handleSubmit}
            editingData={editingData}
            loadingSubmit={loadingSubmit}
          />
        }
      />
    </div>
  );
};

export default DailyWorkPage;

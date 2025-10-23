"use client";
import {
  addUpdatedXpsReleasedTask,
  deleteXpsReleasedTaskById,
  getAllXpsReleasedTasks,
} from "@/actions/task/xpsReleasedTask";
import FormModal from "@/components/myUi/FormModal";
import useFormSubmit from "@/hooks/useFormSubmit";
import useSingleDelete from "@/hooks/useSingleDelete";
import React, { useEffect, useState } from "react";
import XpsRTForm from "./_components/XpsRTForm";
import { useMultiDelete } from "@/hooks/useMultiDelete";
import PageHeader from "@/components/myUi/PageHeader";
import XpsRTColumns from "./_components/XpsRTColumns";
import XpsRTTable from "./_components/XpsRTTable";

const AllTaskListPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [releasedTasksData, setReleasedTasksData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchReleasedTasks = async () => {
      const res = await getAllXpsReleasedTasks();
      setReleasedTasksData(res.resData);
      setLoading(false);
    };
    fetchReleasedTasks();
  }, []);

  const { handleFormSubmit: handleSubmit, loading: loadingSubmit } =
    useFormSubmit({
      formSubmitAction: addUpdatedXpsReleasedTask,
      isEditing: isEditing,
      editingData: editingData,
      setData: setReleasedTasksData,
      setIsDialogOpen: setIsDialogOpen,
      setIsEditing: setIsEditing,
      setEditingData: setEditingData,
    });

  const onEdit = (record) => {
    setEditingData(record);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  // Delete Released Task
  const { onDelete, loading: deleting } = useSingleDelete({
    deleteAction: deleteXpsReleasedTaskById,
    setData: setReleasedTasksData,
  });

  // // Handle Multi Delete
  const { handleMultiDelete, loading: multiDeleteLoading } = useMultiDelete({
    multiDeleteAction: deleteXpsReleasedTaskById,
    setData: setReleasedTasksData,
  });

  return (
    <div>
      <PageHeader
        pageTitle="Released Tasks"
        pageDesc="Manage your released tasks here"
        buttonText="Add Released Task"
        setIsDialogOpen={setIsDialogOpen}
        setIsEditing={setIsEditing}
      />

      {/* Released Tasks Table */}
      <div className="grid grid-cols-1 gap-4 ">
        <XpsRTTable
          data={releasedTasksData}
          columns={XpsRTColumns({ onEdit, onDelete, deleting })}
          onMultiRowDelete={handleMultiDelete}
          loading={multiDeleteLoading}
        />
      </div>

      {/* Released Tasks Form */}
      <FormModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        isEditing={isEditing}
        myForm={
          <XpsRTForm
            onFormSubmit={handleSubmit}
            editingData={editingData}
            loadingSubmit={loadingSubmit}
          />
        }
      />
    </div>
  );
};

export default AllTaskListPage;

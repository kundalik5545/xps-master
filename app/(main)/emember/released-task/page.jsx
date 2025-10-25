"use client";
import FormModal from "@/components/myUi/FormModal";
import PageHeader from "@/components/myUi/PageHeader";
import useFormSubmit from "@/hooks/useFormSubmit";
import { useMultiDelete } from "@/hooks/useMultiDelete";
import useSingleDelete from "@/hooks/useSingleDelete";
import { useEffect, useState } from "react";
import EmRTColumns from "./_components/EmRTColumns";
import EmRTForm from "./_components/EmRTForm";
import EmRTTable from "./_components/EmRTTable";
import {
  addUpdatedEmReleasedTask,
  deleteEmReleasedTaskById,
  getAllEmReleasedTasks,
} from "@/actions/task/eMReleasedTask";

const EmReleasedTaskPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [releasedTasksData, setReleasedTasksData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchReleasedTasks = async () => {
      const res = await getAllEmReleasedTasks();
      setReleasedTasksData(res.resData);
      setLoading(false);
    };
    fetchReleasedTasks();
  }, []);

  const { handleFormSubmit: handleSubmit, loading: loadingSubmit } =
    useFormSubmit({
      formSubmitAction: addUpdatedEmReleasedTask,
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
    deleteAction: deleteEmReleasedTaskById,
    setData: setReleasedTasksData,
  });

  // // Handle Multi Delete
  const { handleMultiDelete, loading: multiDeleteLoading } = useMultiDelete({
    multiDeleteAction: deleteEmReleasedTaskById,
    setData: setReleasedTasksData,
  });

  return (
    <div>
      <PageHeader
        pageTitle="Emember Released Tasks"
        pageDesc="Manage your released tasks here"
        buttonText="Add Released Task"
        setIsDialogOpen={setIsDialogOpen}
        setIsEditing={setIsEditing}
      />

      {/* Released Tasks Table */}
      <div className="grid grid-cols-1 gap-4 ">
        <EmRTTable
          data={releasedTasksData}
          columns={EmRTColumns({ onEdit, onDelete, deleting })}
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
          <EmRTForm
            onFormSubmit={handleSubmit}
            editingData={editingData}
            loadingSubmit={loadingSubmit}
          />
        }
      />
    </div>
  );
};

export default EmReleasedTaskPage;

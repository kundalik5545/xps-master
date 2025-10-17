"use client";
import PageHeader from "@/components/myUi/PageHeader";
import { useEffect, useState } from "react";
import PortalsTable from "./_components/PortalsTable";
import portalColumns from "./_components/portalColumn";
import PortalForm from "./_components/PortalForm";
import FormModal from "@/components/myUi/FormModal";
import {
  addUpdatePortal,
  deletePortal,
  getAllPortals,
  multiDeletePortals,
} from "@/actions/basics/portals";
import { toast } from "sonner";
import useSingleDelete from "@/hooks/useSingleDelete";
import { useMultiDelete } from "@/hooks/useMultiDelete";
import useFormSubmit from "@/hooks/useFormSubmit";

const PortalsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [portalData, setPortalData] = useState([]);
  const [editingData, setEditingData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPortals = async () => {
      const res = await getAllPortals();
      setPortalData(res.resData);
    };
    fetchPortals();
  }, []);

  // const handleSubmit = async (formData) => {
  //   try {
  //     const actions = isEditing ? "update" : "add";

  //     const payload = isEditing ? { formData, id: editingData.id } : formData;

  //     const res = await addUpdatePortal({ payload, actions });
  //     if (!res.success) {
  //       toast.error(
  //         `❌ Failed to ${isEditing ? "update" : "add"} portal: ` + res.message
  //       );
  //     }

  //     if (res.success) {
  //       toast.success(
  //         `✅ Portal ${isEditing ? "updated" : "added"} successfully`
  //       );

  //       setIsDialogOpen(false);

  //       // Refresh the data
  //       const updatedData = isEditing
  //         ? portalData.map((item) =>
  //             item.id === res.resData.id ? res.resData : item
  //           )
  //         : [...portalData, res.data];

  //       setPortalData(updatedData);
  //       setIsEditing(false);
  //       setEditingData(null);
  //     }
  //   } catch (error) {
  //     toast.error(
  //       `❌ Failed to ${isEditing ? "update" : "add"} portal: ` + error.message
  //     );
  //   }
  // };

  const { handleFormSubmit: handleSubmit, loading: formSubmitLoading } =
    useFormSubmit({
      formSubmitAction: addUpdatePortal,
      isEditing: isEditing,
      editingData: editingData,
      setData: setPortalData,
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
    deleteAction: deletePortal,
    setData: setPortalData,
  });

  // Handle Multi Delete
  const { handleMultiDelete, loading: multiDeleteLoading } = useMultiDelete({
    multiDeleteAction: multiDeletePortals,
    setData: setPortalData,
  });

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        pageTitle="Portals"
        pageDesc="Manage your portals here"
        buttonText="Add Portal"
        setIsDialogOpen={setIsDialogOpen}
        setIsEditing={setIsEditing}
      />

      {/* Table */}
      <div className="grid grid-cols-1 gap-4 ">
        <PortalsTable
          data={portalData}
          columns={portalColumns({ onEdit, onDelete, deleting })}
          onMultiRowDelete={handleMultiDelete}
          loading={multiDeleteLoading}
        />
      </div>

      {/* Portal Form */}
      <FormModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        isEditing={isEditing}
        myForm={
          <PortalForm onFormSubmit={handleSubmit} editingData={editingData} />
        }
      />
    </div>
  );
};

export default PortalsPage;

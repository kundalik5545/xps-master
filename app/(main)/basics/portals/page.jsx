"use client";
import PageHeader from "@/components/myUi/PageHeader";
import { useEffect, useState } from "react";
import PortalsTable from "./_components/PortalsTable";
import portalColumns from "./_components/portalColumn";
import PortalForm from "./_components/PortalForm";
import FormModal from "@/components/myUi/FormModal";
import { getAllPortals } from "@/actions/basics/portals";

const PortalsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [portalData, setPortalData] = useState([]);
  const [editingData, setEditingData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPortals = async () => {
      const res = await getAllPortals();
      setPortalData(res.data);
      console.log(res.data);
    };
    fetchPortals();
  }, []);

  // Handle Form Submit
  const handleFormSubmit = (data) => {};

  // Editing Portal Data
  const onEdit = (data) => {};

  // Delete Portal Data
  const onDelete = (data) => {};

  // Handle Multi Delete
  const handleMultiDelete = (data) => {};

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
          columns={portalColumns({ onEdit, onDelete })}
          onMultiRowDelete={handleMultiDelete}
          loading={loading}
        />
      </div>

      {/* Portal Form */}
      <FormModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        isEditing={isEditing}
        myForm={
          <PortalForm
            onFormSubmit={handleFormSubmit}
            editingData={editingData}
          />
        }
      />
    </div>
  );
};

export default PortalsPage;

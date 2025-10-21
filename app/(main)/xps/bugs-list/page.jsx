"use client";
import PageHeader from "@/components/myUi/PageHeader";
import React, { useEffect, useState } from "react";
import XpsBugsTable from "./_components/Tables";
import xpsBugsColumns from "./_components/xpsBugColumn";
import useSingleDelete from "@/hooks/useSingleDelete";
import {
  addUpdateXpsBug,
  deleteXpsBug,
  getAllXpsBugs,
} from "@/actions/xps/xpsBugs";
import useFormSubmit from "@/hooks/useFormSubmit";

const XpsBugsPage = () => {
  const [bugsData, setBugsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);

  useEffect(() => {
    const fetchBugsData = async () => {
      setLoading(true);
      const res = await getAllXpsBugs();
      setBugsData(res.resData);
      setLoading(false);
    };
    fetchBugsData();
  }, []);

  const { handleFormSubmit: handleSubmit, loading: loadingSubmit } =
    useFormSubmit({
      formSubmitAction: addUpdateXpsBug,
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
    deleteAction: deleteXpsBug,
    setData: setBugsData,
  });

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        pageTitle="Xps Bugs List"
        pageDesc="Manage your xps bugs list here"
        addButtonText="Add Bug"
        setIsDialogOpen={setIsDialogOpen}
        setIsEditing={setIsEditing}
      />

      {/* Table */}
      <div className="grid grid-cols-1 gap-4 ">
        <XpsBugsTable
          data={bugsData}
          columns={xpsBugsColumns({ onEdit, onDelete, deleting })}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default XpsBugsPage;

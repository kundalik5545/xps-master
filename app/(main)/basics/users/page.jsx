"use client";
import {
  addUpdateUser,
  deleteUserById,
  getAllUsers,
  multiDeleteUsers,
} from "@/actions/basics/users";
import FormModal from "@/components/myUi/FormModal";
import PageHeader from "@/components/myUi/PageHeader";
import useFormSubmit from "@/hooks/useFormSubmit";
import { useMultiDelete } from "@/hooks/useMultiDelete";
import useSingleDelete from "@/hooks/useSingleDelete";
import { useEffect, useState } from "react";
import UserForm from "./_components/UserForm";
import { userColumns } from "./_components/UsersColumn";
import UsersTables from "./_components/UsersTables";

const UsersPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [editingData, setEditingData] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getAllUsers();
      setUsersData(res.resData);
    };
    fetchUsers();
  }, []);

  const { handleFormSubmit: handleSubmit, loading: loadingSubmit } =
    useFormSubmit({
      formSubmitAction: addUpdateUser,
      isEditing: isEditing,
      editingData: editingData,
      setData: setUsersData,
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
    deleteAction: deleteUserById,
    setData: setUsersData,
  });

  // Handle Multi Delete
  const { handleMultiDelete, loading: multiDeleteLoading } = useMultiDelete({
    multiDeleteAction: multiDeleteUsers,
    setData: setUsersData,
  });

  return (
    <div>
      {/* Page Header */}
      <PageHeader
        pageTitle="Users"
        pageDesc="Manage your users here"
        buttonText="Add User"
        setIsDialogOpen={setIsDialogOpen}
        setIsEditing={setIsEditing}
      />

      {/* Table */}
      <div className="grid grid-cols-1 gap-4 ">
        <UsersTables
          data={usersData}
          columns={userColumns({ onEdit, onDelete, deleting })}
          onMultiRowDelete={handleMultiDelete}
          loading={multiDeleteLoading}
        />
      </div>

      {/* User Form */}
      <FormModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        isEditing={isEditing}
        myForm={
          <UserForm
            onFormSubmit={handleSubmit}
            editingData={editingData}
            loadingSubmit={loadingSubmit}
          />
        }
      />
    </div>
  );
};

export default UsersPage;

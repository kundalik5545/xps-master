"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  addTodo,
  addUpdateTodo,
  deleteTodo,
  editTodo,
  getTodos,
} from "@/actions/todo/todos";
import TodoForm from "./_components/TodoForm";
import useSingleDelete from "@/hooks/useSingleDelete";
import useFormSubmit from "@/hooks/useFormSubmit";
import TodoDisplay from "./_components/TodoDisplay";
import FormModal from "@/components/myUi/FormModal";
import PageHeader from "@/components/myUi/PageHeader";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingData, setEditingData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Load todos on mount
  useEffect(() => {
    setLoading(true);
    const fetchTodos = async () => {
      const res = await getTodos();
      setTodos(res.resData);
      setLoading(false);
    };

    fetchTodos();
  }, []);

  // Todo add update form

  const { handleFormSubmit: handleSubmit, loading: formSubmitLoading } =
    useFormSubmit({
      formSubmitAction: addUpdateTodo,
      isEditing: isEditing,
      editingData: editingData,
      setData: setTodos,
      setIsDialogOpen: setIsDialogOpen,
      setIsEditing: setIsEditing,
      setEditingData: setEditingData,
    });

  // Editing Todo Data
  const onEdit = (record) => {
    setEditingData(record);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  // Delete Portal Data
  const { onDelete, loading: deleting } = useSingleDelete({
    deleteAction: deleteTodo,
    setData: setTodos,
  });

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Page Header */}
      <PageHeader
        pageTitle="Todos"
        pageDesc="Manage your todos here"
        buttonText="Add Todo"
        setIsDialogOpen={setIsDialogOpen}
        setIsEditing={setIsEditing}
      />

      {/* ADD TODO FORM */}
      <div className="max-w-lg mx-auto pb-5">
        <FormModal
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          isEditing={isEditing}
          myForm={
            <TodoForm onFormSubmit={handleSubmit} editingData={editingData} />
          }
        />
      </div>

      {/* TODOS LIST */}
      {loading ? (
        <div className="text-center text-muted-foreground py-10">
          Loading...
        </div>
      ) : todos && todos.length === 0 ? (
        <div className="text-center text-muted-foreground py-8">
          No todos yet.
        </div>
      ) : (
        <TodoDisplay
          todos={todos}
          onEdit={onEdit}
          onDelete={onDelete}
          loading={loading}
          deleting={deleting}
          formSubmitLoading={formSubmitLoading}
        />
      )}
    </div>
  );
};

export default TodoPage;

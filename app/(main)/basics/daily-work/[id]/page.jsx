"use client";
import {
  addUpdateDailyComment,
  deleteDailyCommentById,
  getDailyTaskCommentsByTaskId,
} from "@/actions/basics/dailyWork";
import FormModal from "@/components/myUi/FormModal";
import PageHeader from "@/components/myUi/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import useFormSubmit from "@/hooks/useFormSubmit";
import useSingleDelete from "@/hooks/useSingleDelete";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import DWCommentForm from "../_components/DWCommentForm";
import { Spinner } from "@/components/ui/spinner";

const DWDetailsPage = () => {
  const { id } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dailyWorkData, setDailyWorkData] = useState([]);
  const [editingData, setEditingData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchDailyWork = async () => {
      const res = await getDailyTaskCommentsByTaskId(id);
      console.log("daily res", res);
      setDailyWorkData(res.resData);
      setLoading(false);
    };
    fetchDailyWork();
  }, []);

  const { handleFormSubmit: handleSubmit, loading: loadingSubmit } =
    useFormSubmit({
      formSubmitAction: addUpdateDailyComment,
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
    deleteAction: deleteDailyCommentById,
    setData: setDailyWorkData,
  });

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Page header */}
      <PageHeader
        pageTitle="Daily Work Details"
        pageDesc="View and manage daily work details"
        buttonText="Add Comment"
        setIsDialogOpen={setIsDialogOpen}
        setIsEditing={setIsEditing}
      />

      {/* Comments Form */}
      <FormModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        isEditing={isEditing}
        myForm={
          <DWCommentForm
            onFormSubmit={handleSubmit}
            editingData={editingData}
            loadingSubmit={loadingSubmit}
          />
        }
      />

      {/* Main task title */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {dailyWorkData?.taskTitle || "Untitled Task"}
        </h2>
      </div>

      {/* Daily comments */}
      <div className="space-y-4">
        {loading ? (
          <Spinner />
        ) : dailyWorkData?.dailyWorkComments?.length > 0 ? (
          dailyWorkData.dailyWorkComments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 flex flex-col gap-2 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {comment.createdAt
                    ? new Date(comment.createdAt).toLocaleString()
                    : ""}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(comment)}
                    className="text-primary hover:underline text-sm font-medium"
                    type="button"
                    disabled={loadingSubmit}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(comment.id)}
                    className="text-red-600 dark:text-red-400 hover:underline text-sm font-medium"
                    type="button"
                    disabled={deleting}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="text-gray-800 dark:text-gray-100 whitespace-pre-line break-words">
                {comment.comments}
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 dark:text-gray-400 text-center py-8">
            No comments yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default DWDetailsPage;

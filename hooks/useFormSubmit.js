"use client";

import { useState } from "react";
import { toast } from "sonner";

export function useFormSubmit({
  formSubmitAction,
  isEditing,
  editingData, 
  setData,
  setIsDialogOpen,
  setIsEditing,
  setEditingData,
}) {
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (formData) => {
    console.log("isEditing", isEditing);

    if (!formSubmitAction) {
      console.error("useFormSubmit: formSubmitAction is required");
      return;
    }
    if (!formData) {
      console.error("useFormSubmit: formData is required");
      return;
    }

    if (!setData) {
      console.error("useFormSubmit: setData is required");
      return;
    }
    const actions = isEditing ? "update" : "add";
    const payload = isEditing ? { formData, id: editingData.id } : formData;

    setLoading(true);

    try {
      const res = await formSubmitAction({ payload, actions });
      if (!res.success) {
        toast.error(`❌ Failed to submit form: ${res.message}`);
      }

      if (res.success) {
        toast.success(`✅ Form submitted successfully`);
        setIsDialogOpen(false);

        // Refresh the data
        setData((prev) => {
          const entity = res?.data ?? res?.resData;
          return isEditing
            ? prev.map((item) =>
                item.id === (entity?.id ?? editingData.id) ? entity : item
              )
            : [...prev, entity];
        });

        setIsEditing(false);
        setEditingData(null);
      }
    } catch (error) {
      console.error("useFormSubmit: error", error);
      toast.error(`❌ Failed to submit form: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { handleFormSubmit, loading };
}

export default useFormSubmit;

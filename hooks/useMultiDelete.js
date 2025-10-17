"use client";

import { useState } from "react";
import { toast } from "sonner";

export function useMultiDelete({ multiDeleteAction, setData }) {
  const [loading, setLoading] = useState(false);

  const handleMultiDelete = async (selectedIds) => {
    if (!selectedIds?.length) return;

    setLoading(true);

    try {
      const res = await multiDeleteAction(selectedIds);

      if (res.success) {
        setData((prev) =>
          prev.filter((item) => !selectedIds.includes(item.id))
        );
        toast.success(`✅ Deleted ${selectedIds.length} portals successfully`);
      } else {
        toast.error(`❌ Failed to delete: ${res.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("⚠️ Error while deleting:", error);
      toast.error(`❌ Unexpected error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return { handleMultiDelete, loading };
}

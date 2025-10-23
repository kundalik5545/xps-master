"use server";

import prisma from "@/db/db.config";
import { ApiRes } from "@/lib/ApiResponse";
import { XpsRTFormSchema, ZodFormValidator } from "@/lib/Schema/FormSchema";
import STATUS from "@/lib/Statuses";

// Get all released tasks
const getAllXpsReleasedTasks = async () => {
  try {
    const releasedTasks = await prisma.xpsReleasedTasks.findMany();
    return ApiRes(
      true,
      STATUS.OK,
      "Released tasks fetched successfully",
      releasedTasks
    );
  } catch (error) {
    return ApiRes(false, STATUS.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

// Add updated released task
const addUpdatedXpsReleasedTask = async ({ payload, actions }) => {
  try {
    const parseResult = ZodFormValidator({
      payload,
      formSchema: XpsRTFormSchema,
    });

    if (parseResult.error) {
      return ApiRes(false, STATUS.BAD_REQUEST, parseResult.error.message, null);
    }

    // add new released task
    if (actions === "add") {
      const newReleasedTask = await prisma.xpsReleasedTasks.create({
        data: parseResult.data,
      });

      if (!newReleasedTask) {
        return ApiRes(
          false,
          STATUS.INTERNAL_SERVER_ERROR,
          "Failed to create released task",
          null
        );
      }

      return ApiRes(
        true,
        STATUS.CREATED,
        "Released task added successfully",
        newReleasedTask
      );
    }

    // update released task
    if (actions === "update") {
      const { id } = payload;

      const existingReleasedTask = await prisma.xpsReleasedTasks.findUnique({
        where: { id },
      });

      if (!existingReleasedTask) {
        return ApiRes(false, STATUS.NOT_FOUND, "Released task not found", null);
      }
      const updatedReleasedTask = await prisma.xpsReleasedTasks.update({
        where: { id },
        data: parseResult.data,
      });

      if (!updatedReleasedTask) {
        return ApiRes(
          false,
          STATUS.INTERNAL_SERVER_ERROR,
          "Failed to update released task",
          null
        );
      }

      return ApiRes(
        true,
        STATUS.OK,
        "Released task updated successfully",
        updatedReleasedTask
      );
    }

    return ApiRes(false, STATUS.BAD_REQUEST, "Invalid action", null);
  } catch (error) {
    console.log("Error while adding/updating released task: ", error.message);
    return ApiRes(false, STATUS.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

// Delete released task
const deleteXpsReleasedTaskById = async (id) => {
  try {
    const deletedReleasedTask = await prisma.xpsReleasedTasks.delete({
      where: { id },
    });
    return ApiRes(
      true,
      STATUS.OK,
      "Released task deleted successfully",
      deletedReleasedTask
    );
  } catch (error) {
    console.log("Error while deleting released task: ", error);
    return ApiRes(false, STATUS.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

export {
  getAllXpsReleasedTasks,
  addUpdatedXpsReleasedTask,
  deleteXpsReleasedTaskById,
};

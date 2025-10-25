"use server";
import prisma from "@/db/db.config";
import { ApiRes } from "@/lib/ApiResponse";
import { ZodFormValidator } from "@/lib/Schema/FormSchema";
import STATUS from "@/lib/Statuses";

// Get all released tasks
const getAllEmReleasedTasks = async () => {
  try {
    const releasedTasks = await prisma.eM_ReleasedTasks.findMany();

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
const addUpdatedEmReleasedTask = async ({ payload, actions }) => {
  try {
    const parseResult = ZodFormValidator({
      payload,
      formSchema: ReleasedTaskFormSchema,
    });

    if (parseResult.error) {
      return ApiRes(false, STATUS.BAD_REQUEST, parseResult.error.message, null);
    }

    // add new released task
    if (actions === "add") {
      const newReleasedTask = await prisma.em_releasedTasks.create({
        data: parseResult.data,
      });
      return ApiRes(
        true,
        STATUS.CREATED,
        "Released task added successfully",
        newReleasedTask
      );
    }

    // update released task
    if (actions === "update") {
      const updatedReleasedTask = await prisma.em_releasedTasks.update({
        where: { id: parseResult.data.id },
        data: parseResult.data,
      });
      return ApiRes(
        true,
        STATUS.OK,
        "Released task updated successfully",
        updatedReleasedTask
      );
    }

    return ApiRes(false, STATUS.BAD_REQUEST, "Invalid action", null);
  } catch (error) {
    console.log("Error while adding/updating released task: ", error);
    return ApiRes(false, STATUS.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

// Delete released task
const deleteEmReleasedTaskById = async (id) => {
  try {
    const deletedReleasedTask = await prisma.em_releasedTasks.delete({
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
  getAllEmReleasedTasks,
  addUpdatedEmReleasedTask,
  deleteEmReleasedTaskById,
};

"use server";
import prisma from "@/db/db.config";
import { ApiRes } from "@/lib/ApiResponse";
import {
  DWCommentFormSchema,
  DWTaskFormSchema,
  ZodFormValidator,
} from "@/lib/Schema/FormSchema";
import STATUS from "@/lib/Statuses";

const getDailyWork = async () => {
  try {
    const dailyWork = await prisma.dailyWork.findMany();

    return ApiRes(
      true,
      STATUS.OK,
      "Daily work fetched successfully",
      dailyWork
    );
  } catch (error) {
    return ApiRes(false, STATUS.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

const addUpdateDailyWork = async ({ payload, actions }) => {
  try {
    // zod form data validator
    const parseResult = ZodFormValidator({
      payload,
      formSchema: DWTaskFormSchema,
    });

    // Add new entry
    if (actions === "add") {
      const newDailyWork = await prisma.dailyWork.create({
        data: parseResult.data,
      });

      if (!newDailyWork) {
        return ApiRes(
          false,
          STATUS.INTERNAL_SERVER_ERROR,
          "Failed to create daily work",
          null
        );
      }

      return ApiRes(
        true,
        STATUS.CREATED,
        "Daily work created successfully",
        newDailyWork
      );
    }

    // Update new entry
    if (actions === "update") {
      const { id } = payload;
      const existingDailyWork = await prisma.dailyWork.findUnique({
        where: { id },
      });
      if (!existingDailyWork) {
        return ApiRes(false, STATUS.NOT_FOUND, "Daily work not found", null);
      }

      const updatedDailyWork = await prisma.dailyWork.update({
        where: { id },
        data: parseResult.data,
      });

      if (!updatedDailyWork) {
        return ApiRes(
          false,
          STATUS.INTERNAL_SERVER_ERROR,
          "Failed to update daily work",
          null
        );
      }

      return ApiRes(
        true,
        STATUS.OK,
        "Daily work updated successfully",
        updatedDailyWork
      );
    }
  } catch (error) {
    console.log("error", error);
    return ApiRes(false, STATUS.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

const deleteDailyWorkById = async (id) => {
  try {
    const dailyWork = await prisma.dailyWork.delete({
      where: { id },
    });
    return ApiRes(
      true,
      STATUS.OK,
      "Daily work deleted successfully",
      dailyWork
    );
  } catch (error) {
    console.log("error", error);
    return ApiRes(false, STATUS.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

const multiDeleteDailyWork = async (selectedIds) => {
  try {
    const dailyWork = await prisma.dailyWork.deleteMany({
      where: { id: { in: selectedIds } },
    });

    return ApiRes(
      true,
      STATUS.OK,
      "Daily work deleted successfully",
      dailyWork
    );
  } catch (error) {
    console.log("error", error);
    return ApiRes(false, STATUS.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

// get all Daily comments
const getDailyTaskCommentsByTaskId = async (dailyTaskId) => {
  try {
    const dailyComments = await prisma.dailyWork.findUnique({
      where: { id: Number(dailyTaskId) },
      include: { dailyWorkComments: true },
    });

    if (!dailyComments) {
      return ApiRes(false, STATUS.NOT_FOUND, "Daily comments not found", null);
    }

    return ApiRes(
      true,
      STATUS.OK,
      "Daily comments fetched successfully",
      dailyComments
    );
  } catch (error) {
    console.log("error", error);
    return ApiRes(false, STATUS.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

// add update daily comment
const addUpdateDailyComment = async ({ payload, actions }) => {
  try {
    const parseResult = ZodFormValidator({
      payload,
      formSchema: DWCommentFormSchema,
    });

    if (parseResult.success === false) {
      return ApiRes(false, STATUS.BAD_REQUEST, parseResult.error.message, null);
    }

    if (actions === "add") {
      const newDailyComment = await prisma.dailyWorkComments.create({
        data: parseResult.data,
      });

      return ApiRes(
        true,
        STATUS.CREATED,
        "Daily comment created successfully",
        newDailyComment
      );
    }

    if (actions === "update") {
      const { id } = payload;

      const existingDailyComment = await prisma.dailyWorkComments.findUnique({
        where: { id },
      });

      if (!existingDailyComment) {
        return ApiRes(false, STATUS.NOT_FOUND, "Daily comment not found", null);
      }

      const updatedDailyComment = await prisma.dailyWorkComments.update({
        where: { id },
        data: parseResult.data,
      });

      return ApiRes(
        true,
        STATUS.OK,
        "Daily comment updated successfully",
        updatedDailyComment
      );
    }
  } catch (error) {
    console.log("error", error);
    return ApiRes(false, STATUS.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

// delete daily comment
const deleteDailyCommentById = async (deleteId) => {
  try {
    const dailyComment = await prisma.dailyWorkComments.delete({
      where: { id: deleteId },
    });

    return ApiRes(
      true,
      STATUS.OK,
      "Daily comment deleted successfully",
      dailyComment
    );
  } catch (error) {
    console.log("error", error);
    return ApiRes(false, STATUS.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

export {
  getDailyWork,
  addUpdateDailyWork,
  deleteDailyWorkById,
  multiDeleteDailyWork,
  getDailyTaskCommentsByTaskId,
  addUpdateDailyComment,
  deleteDailyCommentById,
};

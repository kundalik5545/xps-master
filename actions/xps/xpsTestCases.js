"use server";

import prisma from "@/db/db.config";
import { ApiRes } from "@/lib/ApiResponse";
import {
  XpsTestCaseFormSchema,
  ZodFormValidator,
} from "@/lib/Schema/FormSchema";
import STATUS from "@/lib/Statuses";

const getXpsTestCases = async () => {
  try {
    const xpsTestCases = await prisma.xpsTestCases.findMany();
    return ApiRes(true, STATUS.OK, "Xps test cases fetched.", xpsTestCases);
  } catch (error) {
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

// get xps test case by id
const getXpsTestCaseById = async (id) => {
  try {
    const xpsTestCase = await prisma.xpsTestCases.findUnique({
      where: { id: Number(id) },
    });
    return ApiRes(true, STATUS.OK, "Xps test case fetched.", xpsTestCase);
  } catch (error) {
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

// add update xps test case
const addUpdateXpsTestCase = async ({ payload, actions }) => {
  try {
    // Zod form data validator
    const parseResult = ZodFormValidator({
      payload,
      formSchema: XpsTestCaseFormSchema,
    });

    if (parseResult.success === false) {
      return ApiRes(false, STATUS.BAD_REQUEST, parseResult.error.message, null);
    }

    // Add new entry
    if (actions === "add") {
      const newXpsTestCase = await prisma.xpsTestCases.create({
        data: parseResult.data,
      });

      return ApiRes(
        true,
        STATUS.CREATED,
        "Xps test case created.",
        newXpsTestCase
      );
    }

    // Update new entry
    if (actions === "update") {
      const { id } = payload;
      const existingXpsTestCase = await prisma.xpsTestCases.findUnique({
        where: { id: Number(id) },
      });
      if (!existingXpsTestCase) {
        return ApiRes(
          false,
          STATUS.NOT_FOUND,
          "Xps test case not found.",
          null
        );
      }

      const updatedXpsTestCase = await prisma.xpsTestCases.update({
        where: { id: Number(id) },
        data: parseResult.data,
      });

      return ApiRes(
        true,
        STATUS.OK,
        "Xps test case updated.",
        updatedXpsTestCase
      );
    }

    return ApiRes(false, STATUS.BAD_REQUEST, "Invalid action.", null);
  } catch (error) {
    console.log("Error while adding/updating xps test case: ", error.message);
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

// delete xps test case
const deleteXpsTestCase = async (id) => {
  try {
    const xpsTestCase = await prisma.xpsTestCases.delete({
      where: { id: Number(id) },
    });
    return ApiRes(true, STATUS.OK, "Xps test case deleted.", xpsTestCase);
  } catch (error) {
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

export {
  getXpsTestCases,
  getXpsTestCaseById,
  addUpdateXpsTestCase,
  deleteXpsTestCase,
};

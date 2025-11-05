"use server";

import prisma from "@/db/db.config";
import { ApiRes } from "@/lib/ApiResponse";
import {
  EmTestCaseFormSchema,
  ZodFormValidator,
} from "@/lib/Schema/FormSchema";
import STATUS from "@/lib/Statuses";

const getEmTestCases = async () => {
  try {
    const emTestCases = await prisma.em_TestCases.findMany();
    return ApiRes(true, STATUS.OK, "Em test cases fetched.", emTestCases);
  } catch (error) {
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

// get em test case by id
const getEmTestCaseById = async (id) => {
  try {
    const emTestCase = await prisma.em_TestCases.findUnique({
      where: { id: Number(id) },
    });
    return ApiRes(true, STATUS.OK, "Em test case fetched.", emTestCase);
  } catch (error) {
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

// add update em test case
const addUpdateEmTestCase = async ({ payload, actions }) => {
  console.log("payload: ", payload);
  console.log("actions: ", actions);
  try {
    // Zod form data validator
    const parseResult = ZodFormValidator({
      payload,
      formSchema: EmTestCaseFormSchema,
    });

    if (parseResult.success === false) {
      return ApiRes(false, STATUS.BAD_REQUEST, parseResult.error.message, null);
    }

    // Normalize optional relation fields
    const normalizedData = {
      ...parseResult.data,
      // Treat 0, undefined, null, or "" as no relation
      emMenuId:
        parseResult.data?.emMenuId && Number(parseResult.data.emMenuId) > 0
          ? Number(parseResult.data.emMenuId)
          : null,
    };

    // Add new entry
    if (actions === "add") {
      const newEmTestCase = await prisma.em_TestCases.create({
        data: normalizedData,
      });
      return ApiRes(
        true,
        STATUS.CREATED,
        "Em test case created.",
        newEmTestCase
      );
    }

    // Update new entry
    if (actions === "update") {
      const { id } = payload;
      const existingEmTestCase = await prisma.em_TestCases.findUnique({
        where: { id: Number(id) },
      });
      if (!existingEmTestCase) {
        return ApiRes(false, STATUS.NOT_FOUND, "Em test case not found.", null);
      }

      const updatedEmTestCase = await prisma.em_TestCases.update({
        where: { id: Number(id) },
        data: normalizedData,
      });

      return ApiRes(
        true,
        STATUS.OK,
        "Em test case updated.",
        updatedEmTestCase
      );
    }

    return ApiRes(false, STATUS.BAD_REQUEST, "Invalid action.", null);
  } catch (error) {
    console.log("Error while adding/updating em test case: ", error.message);
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

// delete em test case
const deleteEmTestCase = async (id) => {
  try {
    const emTestCase = await prisma.em_TestCases.delete({
      where: { id: Number(id) },
    });
    return ApiRes(true, STATUS.OK, "Em test case deleted.", emTestCase);
  } catch (error) {
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

export {
  getEmTestCases,
  getEmTestCaseById,
  addUpdateEmTestCase,
  deleteEmTestCase,
};

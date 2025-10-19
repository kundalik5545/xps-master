"use server";

import prisma from "@/db/db.config";
import { ApiRes } from "@/lib/ApiResponse";
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

export { getEmTestCases, getEmTestCaseById };

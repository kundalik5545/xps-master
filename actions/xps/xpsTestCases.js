"use server";

import prisma from "@/db/db.config";
import { ApiRes } from "@/lib/ApiResponse";
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
export { getXpsTestCases, getXpsTestCaseById };

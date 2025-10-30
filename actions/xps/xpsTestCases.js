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

// get xps test cases stats
const getXpsTestCasesStats = async () => {
  try {
    // Get total test cases
    const totalTestCases = await prisma.xpsTestCases.count();

    // Get counts by automation status
    const automationStats = await prisma.xpsTestCases.groupBy({
      by: ["automationStatus"],
      _count: { automationStatus: true },
    });

    // Map automation statuses
    let automated = 0;
    let notAutomated = 0;
    let passed = 0;
    let failed = 0;
    let skipped = 0;

    automationStats.forEach((stat) => {
      const status = stat.automationStatus?.toLowerCase() || "";
      if (status === "automated") automated += stat._count.automationStatus;
      else if (status === "not automated")
        notAutomated += stat._count.automationStatus;
      else if (status === "passed") passed += stat._count.automationStatus;
      else if (status === "failed") failed += stat._count.automationStatus;
      else if (status === "skipped") skipped += stat._count.automationStatus;
    });

    // Get module-wise stats
    const moduleStats = await prisma.xpsTestCases.groupBy({
      by: ["module"],
      _count: { module: true },
    });

    // Get schemeLevel-wise stats
    const schemeLevelStats = await prisma.xpsTestCases.groupBy({
      by: ["schemeLevel"],
      _count: { schemeLevel: true },
    });

    // Optionally, also fetch pass/fail/skipped status if this is a separate field
    // If automationStatus holds pass/fail/skipped, then above already counts them
    // Otherwise, update the logic here if you have a dedicated result field

    console.log("not automated", notAutomated);
    return ApiRes(true, STATUS.OK, "Xps test cases stats fetched.", {
      totalTestCases,
      automated,
      notAutomated,
      passed,
      failed,
      skipped,
      moduleStats: moduleStats.map((m) => ({
        module: m.module,
        count: m._count.module,
      })),
      schemeLevelStats: schemeLevelStats.map((s) => ({
        schemeLevel: s.schemeLevel,
        count: s._count.schemeLevel,
      })),
    });
  } catch (error) {
    console.log("Error while getting xps test cases stats: ", error.message);
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

export {
  getXpsTestCases,
  getXpsTestCaseById,
  addUpdateXpsTestCase,
  deleteXpsTestCase,
  getXpsTestCasesStats,
};

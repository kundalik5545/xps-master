"use server";

import prisma from "@/db/db.config";
import { ApiRes } from "@/lib/ApiResponse";
import STATUS from "@/lib/Statuses";
import { XpsBugFormSchema, ZodFormValidator } from "@/lib/Schema/FormSchema";

const getAllXpsBugs = async () => {
  try {
    const xpsBugs = await prisma.xpsBugs.findMany();
    return ApiRes(true, STATUS.OK, "Xps bugs fetched.", xpsBugs);
  } catch (error) {
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

// Add Update Xps Bug
const addUpdateXpsBug = async ({ payload, actions }) => {
  try {
    const parseResult = ZodFormValidator({
      payload,
      formSchema: XpsBugFormSchema,
    });
    if (parseResult.success === false) {
      return ApiRes(false, STATUS.BAD_REQUEST, parseResult.error.message, null);
    }
    if (actions === "add") {
      const newXpsBug = await prisma.xpsBugs.create({ data: parseResult.data });
      return ApiRes(true, STATUS.CREATED, "Xps bug added.", newXpsBug);
    }
    if (actions === "update") {
      const { id } = payload;
      const updatedXpsBug = await prisma.xpsBugs.update({
        where: { id },
        data: parseResult.data,
      });
      return ApiRes(true, STATUS.OK, "Xps bug updated.", updatedXpsBug);
    }
    return ApiRes(false, STATUS.BAD_REQUEST, "Invalid action.", null);
  } catch (error) {
    return ApiRes(false, STATUS.ERROR, error.message, null);
  }
};

// Delete Xps Bug
const deleteXpsBug = async (id) => {
  try {
    const xpsBug = await prisma.xpsBugs.delete({ where: { id } });
    return ApiRes(true, STATUS.OK, "Xps bug deleted.", xpsBug);
  } catch (error) {
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

export { getAllXpsBugs, addUpdateXpsBug, deleteXpsBug };

"use server";

import prisma from "@/db/db.config";
import { ApiRes } from "@/lib/ApiResponse";
import STATUS from "@/lib/Statuses";
import { EmBugFormSchema, ZodFormValidator } from "@/lib/Schema/FormSchema";

const getAllEmBugs = async () => {
  try {
    const emBugs = await prisma.eM_Bugs.findMany();
    return ApiRes(true, STATUS.OK, "Em bugs fetched.", emBugs);
  } catch (error) {
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

// Add Update Xps Bug
const addUpdateEmBug = async ({ payload, actions }) => {
  try {
    const parseResult = ZodFormValidator({
      payload,
      formSchema: EmBugFormSchema,
    });
    if (parseResult.success === false) {
      return ApiRes(false, STATUS.BAD_REQUEST, parseResult.error.message, null);
    }
    if (actions === "add") {
      const newEmBug = await prisma.eM_Bugs.create({ data: parseResult.data });
      return ApiRes(true, STATUS.CREATED, "Emember bug added.", newEmBug);
    }
    if (actions === "update") {
      const { id } = payload;
      const updatedEmBug = await prisma.eM_Bugs.update({
        where: { id },
        data: parseResult.data,
      });
      return ApiRes(true, STATUS.OK, "Emember bug updated.", updatedEmBug);
    }
    return ApiRes(false, STATUS.BAD_REQUEST, "Invalid action.", null);
  } catch (error) {
    return ApiRes(false, STATUS.ERROR, error.message, null);
  }
};

// Delete Xps Bug
const deleteEmBug = async (id) => {
  try {
    const emBug = await prisma.eM_Bugs.delete({ where: { id } });
    return ApiRes(true, STATUS.OK, "Emember bug deleted.", emBug);
  } catch (error) {
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

export { getAllEmBugs, addUpdateEmBug, deleteEmBug };

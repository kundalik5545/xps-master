"use server";

import prisma from "@/db/db.config";
import { ApiRes } from "@/lib/ApiResponse";
import { EmSqlScriptSchema, ZodFormValidator } from "@/lib/Schema/FormSchema";
import STATUS from "@/lib/Statuses";

// Get all sql scripts
const getEmSqlScripts = async () => {
  try {
    const sqlScripts = await prisma.eM_Scripts.findMany();
    return ApiRes(true, STATUS.OK, "SQL scripts fetched.", sqlScripts);
  } catch (error) {
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

// create sql script
const addUpdateEmSqlScript = async ({ payload, actions }) => {
  try {
    // Xod form data validator
    const parseResult = ZodFormValidator({
      payload,
      formSchema: EmSqlScriptSchema,
    });

    // Add new entry
    if (actions === "add") {
      const newScript = await prisma.eM_Scripts.create({
        data: parseResult.data,
      });

      return ApiRes(
        true,
        STATUS.CREATED,
        "New script added successfuly",
        newScript
      );
    }

    // Update new entry
    if (actions === "update") {
      const { id } = payload;

      const existingScript = await prisma.eM_Scripts.findUnique({
        where: { id },
      });

      if (!existingScript) {
        return ApiRes(
          false,
          STATUS.NOT_FOUND,
          `Script with ${id} not found.`,
          null
        );
      }

      const updatedScript = await prisma.eM_Scripts.update({
        where: { id },
        data: parseResult.data,
      });

      return ApiRes(
        true,
        STATUS.OK,
        "Script updated successfully",
        updatedScript
      );
    }

    return ApiRes(
      false,
      STATUS.BAD_REQUEST,
      "Please provide correct form action.",
      null
    );
  } catch (error) {
    console.log("Error is", error);
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

// delete sql script

const deleteEmSqlScript = async (id) => {
  try {
    await prisma.eM_Scripts.delete({ where: { id } });
    return ApiRes(true, STATUS.OK, "SQL script deleted.");
  } catch (error) {
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

export { addUpdateEmSqlScript, deleteEmSqlScript, getEmSqlScripts };

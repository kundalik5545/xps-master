"use server";

import prisma from "@/db/db.config";
import { ApiRes } from "@/lib/ApiResponse";
import { SqlScriptSchema, ZodFormValidator } from "@/lib/Schema/FormSchema";
import STATUS from "@/lib/Statuses";

// Get all sql scripts
const getXpsSqlScripts = async () => {
  try {
    const sqlScripts = await prisma.xpsScripts.findMany();
    return ApiRes(true, STATUS.OK, "SQL scripts fetched.", sqlScripts);
  } catch (error) {
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

// create sql script
const addUpdateSqlScript = async ({ payload, actions }) => {
  try {
    // Zod form data validator
    const parseResult = ZodFormValidator({
      payload,
      formSchema: SqlScriptSchema,
    });

    if (parseResult.success === false) {
      return ApiRes(false, STATUS.BAD_REQUEST, parseResult.error.message, null);
    }

    // Add new entry
    if (actions === "add") {
      const newScript = await prisma.xpsScripts.create({
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

      const existingScript = await prisma.xpsScripts.findUnique({
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

      const updatedScript = await prisma.xpsScripts.update({
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

const deleteXpsSqlScript = async (id) => {
  try {
    await prisma.xpsScripts.delete({ where: { id } });
    return ApiRes(true, STATUS.OK, "SQL script deleted.");
  } catch (error) {
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

export { getXpsSqlScripts, addUpdateSqlScript, deleteXpsSqlScript };

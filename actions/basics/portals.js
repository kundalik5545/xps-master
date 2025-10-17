"use server";

import prisma from "@/db/db.config";
import { ApiRes } from "@/lib/ApiResponse";
import { PortalFormSchema, ZodFormValidator } from "@/lib/Schema/FormSchema";
import STATUS from "@/lib/Statuses";

// Fetch all portals from db
const getAllPortals = async () => {
  try {
    const res = await prisma.portals.findMany();

    return ApiRes(true, STATUS.OK, "All portals fetched.", res);
  } catch (error) {
    return ApiRes(
      false,
      STATUS.INTERNAL_SERVER_ERROR,
      `Error while fetching ${error.message}`,
      null
    );
  }
};

//Add update Portal
const addUpdatePortal = async ({ payload, actions }) => {
  try {
    // zod form data validator
    const parseResult = ZodFormValidator({
      payload,
      formSchema: PortalFormSchema,
    });

    // Add new entry
    if (actions === "add") {
      const newPortal = await prisma.portals.create({ data: parseResult.data });

      return ApiRes(
        true,
        STATUS.CREATED,
        "New portal added successfuly",
        newPortal
      );
    }

    // Update new entry
    if (actions === "update") {
      const { id } = payload;

      const updatedPortal = await prisma.portals.update({
        where: {
          id,
        },
        data: parseResult.data,
      });

      return ApiRes(
        true,
        STATUS.OK,
        "New portal updated successfuly",
        updatedPortal
      );
    }
  } catch (error) {
    return ApiRes(
      false,
      STATUS.INTERNAL_SERVER_ERROR,
      `Error while adding/updating portal: ${error.message}`,
      null
    );
  }
};

//Delete single portal
const deletePortal = async (deleteId) => {
  try {
    const deletedPortal = await prisma.portals.delete({
      where: {
        id: deleteId,
      },
    });

    return ApiRes(
      true,
      STATUS.OK,
      "Portal deleted successfully",
      deletedPortal
    );
  } catch (error) {
    return ApiRes(
      false,
      STATUS.INTERNAL_SERVER_ERROR,
      `Error while deleting: ${error.message}`,
      null
    );
  }
};

// Multidelete portals server action
const multiDeletePortals = async (selectedIds) => {
  try {
    const result = await prisma.portals.deleteMany({
      where: {
        id: { in: selectedIds },
      },
    });

    return ApiRes(
      true,
      STATUS.OK,
      `${result.count} portal(s) deleted successfully.`,
      result
    );
  } catch (error) {
    return ApiRes(
      false,
      STATUS.INTERNAL_SERVER_ERROR,
      `Error while deleting portals: ${error.message}`,
      null
    );
  }
};

export { getAllPortals, addUpdatePortal, deletePortal, multiDeletePortals };

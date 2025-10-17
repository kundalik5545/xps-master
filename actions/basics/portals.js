"use server";

import prisma from "@/db/db.config";
import { ApiRes } from "@/lib/ApiResponse";
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
  // zod form data validator
  const parseResult = ZodFormValidator({
    payload,
    formSchema: portalFormSchema,
  });

  // Add new entry
  if (actions === "add") {
    const res = await prisma.portal.create({ data: parseResult.data });

    return ApiRes(true, STATUS.CREATED, "New portal added successfuly", res);
  }

  // Update new entry
  if (actions === "update") {
    const { id } = payload;

    const res = await prisma.portal.update({
      where: {
        id,
      },
      data: parseResult.data,
    });

    return ApiRes(true, STATUS.OK, "New portal updated successfuly", res);
  }
};

//Delete single portal
const deletePortal = async (deleteId) => {
  try {
    const res = await prisma.portal.delete({
      where: {
        id: deleteId,
      },
    });

    return ApiRes(true, STATUS.OK, "Portal deleted successfully", res);
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
    const result = await prisma.portal.deleteMany({
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

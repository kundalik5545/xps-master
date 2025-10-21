// Menu and User Guides Server actions
"use server";
import prisma from "@/db/db.config";
import { ApiRes } from "@/lib/ApiResponse";
import STATUS from "@/lib/Statuses";

// get all xps menus
const getXpsMenus = async () => {
  try {
    const xpsMenus = await prisma.xpsMenus.findMany();
    return ApiRes(true, STATUS.OK, "Xps menus fetched.", xpsMenus);
  } catch (error) {
    console.log("error in getXpsMenus", error);
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

// get all xps user guides
const getXpsUserGuides = async () => {
  try {
    const xpsUserGuides = await prisma.xpsUserGuides.findMany();

    return ApiRes(true, STATUS.OK, "Xps user guides fetched.", xpsUserGuides);
  } catch (error) {
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

// Get all xps Menu and its details based on id
const getAllXpeMenuDetailsById = async (xpsMenuId) => {
  try {
    const result = await prisma.xpsMenus.findMany({
      where: { id: Number(xpsMenuId) },
      include: {
        xpsMenuDescriptions: true,
        xpsUserGuides: true,
        xpsTables: true,
        xpsScripts: true,
        xpsTestCases: true,
        xpsBugs: true,
        xpsReleasedTasks: true,
      },
    });

    return ApiRes(true, STATUS.OK, "All details fetched.", result);
  } catch (error) {
    console.log("Error while geting xps menu details", error);
    return ApiRes(
      false,
      STATUS.INTERNAL_SERVER_ERROR,
      "Error while fetching the records."
    );
  }
};
export { getXpsMenus, getXpsUserGuides, getAllXpeMenuDetailsById };

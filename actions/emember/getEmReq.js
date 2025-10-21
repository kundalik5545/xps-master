"use server";

import prisma from "@/db/db.config";
import { ApiRes } from "@/lib/ApiResponse";
import STATUS from "@/lib/Statuses";

const getEmMenus = async () => {
  try {
    const emMenus = await prisma.em_Menus.findMany();
    return ApiRes(true, STATUS.OK, "Em menus fetched.", emMenus);
  } catch (error) {
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

// get all em user guides
const getEmUserGuides = async () => {
  try {
    const emUserGuides = await prisma.em_UserGuide.findMany();
    return ApiRes(true, STATUS.OK, "Em user guides fetched.", emUserGuides);
  } catch (error) {
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

// Get all Emember menus and its details based on id
const getAllEmMenuDetailsById = async (emMenuId) => {
  try {
    const result = await prisma.em_Menus.findMany({
      where: { id: Number(emMenuId) },
      include: {
        emMenuDescriptions: true,
        emUserGuides: true,
        emTables: true,
        emScripts: true,
        emBugs: true,
        emReleasedTasks: true,
        emTestCases: true,
      },
    });
    return ApiRes(true, STATUS.OK, "Em menu details fetched.", result);
  } catch (error) {
    console.log("Error while geting em menu details", error);
    return ApiRes(
      false,
      STATUS.INTERNAL_SERVER_ERROR,
      "Error while geting em menu details."
    );
  }
};

export { getEmMenus, getEmUserGuides, getAllEmMenuDetailsById };

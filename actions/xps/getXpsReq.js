// Menu and User Guides Server actions
"use server";
import prisma from "@/db/db.config";
import { ApiRes } from "@/lib/ApiResponse";
import STATUS from "@/lib/Statuses";

// get all xps menus
const getXpsMenus = async () => {
  console.log("getXpsMenus called");
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

export { getXpsMenus, getXpsUserGuides };

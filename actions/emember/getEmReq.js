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

const getEmUserGuides = async () => {
  try {
    const emUserGuides = await prisma.em_UserGuide.findMany();
    return ApiRes(true, STATUS.OK, "Em user guides fetched.", emUserGuides);
  } catch (error) {
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

export { getEmMenus, getEmUserGuides };

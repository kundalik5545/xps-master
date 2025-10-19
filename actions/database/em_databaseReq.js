// Menu and User Guides Server actions
"use server";

import prisma from "@/db/db.config";
import { ApiRes } from "@/lib/ApiResponse";
import STATUS from "@/lib/Statuses";

const getEmTables = async () => {
  try {
    const emTables = await prisma.em_Tables.findMany();
    return ApiRes(true, STATUS.OK, "Em tables fetched.", emTables);
  } catch (error) {
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

const getEmTableById = async (id) => {
  try {
    const emTable = await prisma.em_Tables.findUnique({
      include: {
        emColumns: true,
      },
      where: { id: Number(id) },
    });
    return ApiRes(true, STATUS.OK, "Em table fetched.", emTable);
  } catch (error) {
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

export { getEmTables, getEmTableById };

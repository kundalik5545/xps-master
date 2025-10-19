// Menu and User Guides Server actions
"use server";
import prisma from "@/db/db.config";
import { ApiRes } from "@/lib/ApiResponse";
import STATUS from "@/lib/Statuses";

// get all xps tables
const getXpsTables = async () => {
  console.log("getXpsTables called");
  try {
    const xpsTables = await prisma.xpsTables.findMany();
    return ApiRes(true, STATUS.OK, "Xps tables fetched.", xpsTables);
  } catch (error) {
    console.log("error in getXpsTables", error);
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

// get xps table by id
const getXpsTableById = async (id) => {
  try {
    const xpsTable = await prisma.xpsTables.findUnique({
      include: {
        xpsColumns: true,
      },
      where: { id: Number(id) },
    });
    return ApiRes(true, STATUS.OK, "Xps table fetched.", xpsTable);
  } catch (error) {
    console.log("error in getXpsTableById", error);
    return ApiRes(false, STATUS.ERROR, error.message);
  }
};

export { getXpsTables, getXpsTableById };

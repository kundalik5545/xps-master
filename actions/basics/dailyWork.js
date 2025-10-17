import prisma from "@/db/db.config";

export const getDailyWork = async () => {
  await prisma.em_MenuDescription.findMany();
};

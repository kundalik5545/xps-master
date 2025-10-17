"use server";

import prisma from "@/db/db.config";

export async function GET(request) {
  const result = await prisma.portals.findMany();
  return Response.json(result);
}

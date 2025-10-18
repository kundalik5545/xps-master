import prisma from "@/db/db.config";
import * as XLSX from "xlsx";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request) {
  try {
    const form = await request.formData();
    const file = form.get("file");
    const model = form.get("model");

    if (!file || !model) {
      return Response.json(
        { message: "Missing file or model." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet, { defval: null });

    if (!Array.isArray(rows) || rows.length === 0) {
      return Response.json(
        { message: "No rows found in Excel sheet." },
        { status: 400 }
      );
    }

    // Map model string to prisma delegate
    const delegate = prisma[model];
    if (!delegate || typeof delegate.createMany !== "function") {
      return Response.json(
        { message: `Unsupported model: ${model}` },
        { status: 400 }
      );
    }

    // Best-effort coercions for common types (Date/Int/Enum); assumes headers match schema fields
    // You can extend this per model if needed.
    const data = rows.map((r) => normalizeRow(r));

    const result = await delegate.createMany({ data });

    return Response.json(
      { message: "Seeded successfully", count: result.count },
      { status: 200 }
    );
  } catch (error) {
    console.error("Seed upload error:", error);
    return Response.json(
      { message: error?.message || "Unexpected error" },
      { status: 500 }
    );
  }
}

function normalizeRow(row) {
  const normalized = {};
  for (const key of Object.keys(row)) {
    const value = row[key];
    if (value === "" || value === undefined) {
      normalized[key] = null;
      continue;
    }
    // Date-like strings
    if (typeof value === "string" && /\d{4}-\d{2}-\d{2}/.test(value)) {
      const d = new Date(value);
      normalized[key] = isNaN(d.getTime()) ? value : d;
      continue;
    }
    // Numeric strings
    if (typeof value === "string" && /^-?\d+(\.\d+)?$/.test(value)) {
      const num = Number(value);
      normalized[key] = Number.isNaN(num) ? value : num;
      continue;
    }
    normalized[key] = value;
  }
  return normalized;
}

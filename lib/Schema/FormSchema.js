import z from "zod";
import { ApiRes } from "../ApiResponse";
import STATUS from "../Statuses";

//Function to validate the zod schema while storing data in database
const ZodFormValidator = ({ payload, formSchema }) => {
  // Validate payload with Zod
  const parseResult = payload?.formData
    ? formSchema.safeParse(payload.formData)
    : formSchema.safeParse(payload);

  if (!parseResult.success) {
    return ApiRes(
      false,
      STATUS.BAD_REQUEST,
      "Zod Validation failed",
      parseResult.error.flatten()
    );
  }

  return parseResult;
};

const PortalFormSchema = z.object({
  portalName: z.string().min(1, { message: "This field is required" }),
  appName: z.string().min(1, { message: "This field is required" }),
  userName: z.string(),
  password: z.string(),
  memorableWord: z.string(),
  appURL: z.string().url().optional(),
});

const niRegex = /^[A-CEGHJ-PR-TW-Z]{2}\d{6}[A-D]$/i;

const positiveInt = z.coerce.number().optional().nullable();

//Users form Schema
const UserFormSchema = z.object({
  eMemberId: positiveInt,
  xpsId: positiveInt,
  userHashId: z.string().min(0).optional(),
  username: z.string().min(0).optional(),
  password: z
    .string()
    .min(0)
    .optional()
    .refine((v) => (v ? v.length >= 6 : true), {
      message: "Password must be at least 6 characters",
    }),
  memorableWord: z.string().min(0).optional(),
  userStatusId: positiveInt,
  xpsSchemeId: positiveInt,
  eMemberSchemeId: positiveInt,
  addressId: positiveInt, // Added addressId field
  postcode: z
    .string()
    .optional()
    .refine(
      (v) => {
        if (!v || v.trim() === "") return true;
        // Simple UK postcode regex (rough validation)
        return /^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})$/i.test(v);
      },
      { message: "Invalid UK postcode" }
    ),
  DOB: z.date().optional().nullable(),
  niNumber: z
    .string()
    .optional()
    .refine(
      (v) => {
        if (!v || v.trim() === "") return true;
        return niRegex.test(v);
      },
      { message: "NI must be in format AA123456A" }
    ),
  userEmail: z
    .string()
    .optional()
    .refine(
      (v) => {
        if (!v || v.trim() === "") return true;
        // simple email check
        return /^\S+@\S+\.\S+$/.test(v);
      },
      { message: "Invalid email address" }
    ),
});

const TodoFormSchema = z.object({
  title: z.string().min(1, { message: "This field is required" }),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

const DWCommentFormSchema = z.object({
  comments: z.string(),
  dailyWorkId: z.coerce.number(),
});

const DWTaskFormSchema = z.object({
  taskId: z.coerce.number().optional(),
  taskTitle: z.string(),
  taskState: z.string(),
  portalName: z.string(),
  env: z.string(),
  assignedBy: z.string(),
  taskURL: z.string().url().optional().nullable(),
});

const SqlScriptSchema = z.object({
  scriptTitle: z.string().min(1, { message: "This field is required" }),
  sqlScript: z.string().min(1, { message: "This field is required" }),
  scriptInfo: z.string(),
  xpsMenuId: z.number(),
});
const EmSqlScriptSchema = z.object({
  emScriptTitle: z.string().min(1, { message: "This field is required" }),
  emSqlScript: z.string().min(1, { message: "This field is required" }),
  emScriptInfo: z.string(),
  emMenuId: z.number(),
});

// Bugs form Schema
const XpsBugFormSchema = z.object({
  bugId: z.coerce
    .number({
      message: "This field must be a number",
    })
    .min(1, { message: "This field is required" }),
  bugTitle: z.string().min(1, { message: "This field is required" }),
  portalName: z.string().min(1, { message: "This field is required" }),
  qaBugState: z.string(),
  env: z.string().min(1, { message: "This field is required" }),
  assignedTo: z.string().min(1, { message: "This field is required" }),
  bugUrl: z
    .string()
    .url({ message: "Invalid URL" })
    .min(1, { message: "This field is required" }),
  comments: z.string(),
});

// eMember Bugs form Schema
const EmBugFormSchema = z.object({
  emBugId: z.coerce
    .number({
      message: "This field must be a number",
    })
    .min(1, { message: "This field is required" }),
  emBugTitle: z.string().min(1, { message: "This field is required" }),
  portalName: z.string().min(1, { message: "This field is required" }),
  qaBugState: z.string(),
  env: z.string().min(1, { message: "This field is required" }),
  assignedTo: z.string().min(1, { message: "This field is required" }),
  emBugUrl: z
    .string()
    .url({ message: "Invalid URL" })
    .min(1, { message: "This field is required" }),
  comments: z.string(),
});

const XpsRTFormSchema = z.object({
  taskId: z.coerce
    .number({
      message: "This field must be a number",
    })
    .min(1, { message: "This field is required" }),
  taskTitle: z.string().min(1, { message: "This field is required" }),
  portalName: z.string().min(1, { message: "This field is required" }),
  taskState: z.string().min(1, { message: "This field is required" }),
  env: z.string(),
  assignedBy: z.string().min(1, { message: "This field is required" }),
  comments: z.string(),
  taskURL: z
    .string()
    .url({ message: "Invalid URL" })
    .min(1, { message: "This field is required" }),
  xpsMenuId: z.coerce.number().optional(),
});

const EmRTFormSchema = z.object({
  emTaskId: z.coerce
    .number({
      message: "This field must be a number",
    })
    .min(1, { message: "This field is required" }),
  emTaskTitle: z.string().min(1, { message: "This field is required" }),
  portalName: z.string().min(1, { message: "This field is required" }),
  taskState: z.string().min(1, { message: "This field is required" }),
  env: z.string(),
  assignedBy: z.string().min(1, { message: "This field is required" }),
  emComments: z.string(),
  emTaskUrl: z
    .string()
    .url({ message: "Invalid URL" })
    .min(1, { message: "This field is required" }),
  emMenuId: z.coerce.number().optional(),
});

const XpsTestCaseFormSchema = z.object({
  testCaseNo: z.string().optional(),
  testCaseName: z.string().min(1, { message: "This field is required" }),
  schemeType: z.string().optional(),
  schemeLevel: z.string().min(1, { message: "This field is required" }),
  module: z.string().min(1, { message: "This field is required" }),
  automationStatus: z.string().min(1, { message: "This field is required" }),
  expectedResult: z.string().optional(),
  actualResult: z.string().optional(),
  comments: z.string().optional(),
  xpsMenuId: z.coerce.number().optional(),
});

export {
  DWCommentFormSchema,
  DWTaskFormSchema,
  PortalFormSchema,
  SqlScriptSchema,
  EmSqlScriptSchema,
  TodoFormSchema,
  UserFormSchema,
  XpsBugFormSchema,
  EmBugFormSchema,
  XpsRTFormSchema,
  EmRTFormSchema,
  XpsTestCaseFormSchema,
  ZodFormValidator,
};

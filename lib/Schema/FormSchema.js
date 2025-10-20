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

export { PortalFormSchema, UserFormSchema, TodoFormSchema, ZodFormValidator };

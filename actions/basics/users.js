"use server";
import { ApiRes } from "@/lib/ApiResponse";
import { UserFormSchema, ZodFormValidator } from "@/lib/Schema/FormSchema";
import STATUS from "@/lib/Statuses";

const { default: prisma } = require("@/db/db.config");

const getAllUsers = async () => {
  try {
    const users = await prisma.users.findMany();
    return ApiRes(true, STATUS.OK, "Users fetched successfully", users);
  } catch (error) {
    return ApiRes(false, STATUS.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

// Add update user
const addUpdateUser = async ({ payload, actions }) => {
  console.log("payload", payload);
  console.log("actions", actions);
  try {
    // zod form data validator
    const parseResult = ZodFormValidator({
      payload,
      formSchema: UserFormSchema,
    });

    console.log("parseResult", parseResult);
    // Add new entry
    if (actions === "add") {
      const newUser = await prisma.users.create({ data: parseResult.data });

      console.log("newUser", newUser);
      return ApiRes(
        true,
        STATUS.CREATED,
        "New portal added successfuly",
        newUser
      );
    }

    // Update new entry
    if (actions === "update") {
      const { id } = payload;

      const existingUser = await prisma.users.findUnique({ where: { id } });
      if (!existingUser) {
        return ApiRes(false, STATUS.NOT_FOUND, "User not found", null);
      }

      const updatedUser = await prisma.users.update({
        where: { id },
        data: parseResult.data,
      });

      return ApiRes(true, STATUS.OK, "User updated successfully", updatedUser);
    }
  } catch (error) {
    return ApiRes(false, STATUS.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

// Delete Single user
const deleteUser = async (deleteId) => {
  try {
    const user = await prisma.users.delete({ where: { id: deleteId } });

    if (!user) {
      return ApiRes(false, STATUS.NOT_FOUND, "User not found", null);
    }

    return ApiRes(true, STATUS.OK, "User deleted successfully", user);
  } catch (error) {
    return ApiRes(false, STATUS.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

// Multi delete Users
const multiDeleteUsers = async (selectedIds) => {
  try {
    const users = await prisma.users.deleteMany({
      where: { id: { in: selectedIds } },
    });

    return ApiRes(true, STATUS.OK, "Users deleted successfully", users);
  } catch (error) {
    return ApiRes(false, STATUS.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

export { getAllUsers, addUpdateUser, deleteUser, multiDeleteUsers };

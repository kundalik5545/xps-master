"use server";

import prisma from "@/db/db.config";
import { ApiRes } from "@/lib/ApiResponse";
import { TodoFormSchema, ZodFormValidator } from "@/lib/Schema/FormSchema";
import STATUS from "@/lib/Statuses";

const addUpdateTodo = async ({ payload, actions }) => {
  try {
    // zod form data validator
    const parseResult = ZodFormValidator({
      payload,
      formSchema: TodoFormSchema,
    });

    if (actions === "add") {
      const newTodo = await prisma.todo.create({ data: parseResult.data });
      return ApiRes(true, STATUS.CREATED, "Todo created successfully", newTodo);
    }

    if (actions === "update") {
      const { id } = payload;
      const updatedTodo = await prisma.todo.update({
        where: { id },
        data: parseResult.data,
      });
      return ApiRes(true, STATUS.OK, "Todo updated successfully", updatedTodo);
    }
  } catch (error) {
    return ApiRes(false, STATUS.INTERNAL_SERVER_ERROR, error.message, null);
  }
};

const deleteTodo = async (deleteId) => {
  try {
    const result = await prisma.todo.delete({
      where: { id: deleteId },
    });

    const deletedTodo = await prisma.todo.findUnique({
      where: { id: deleteId },
    });

    if (deletedTodo !== null) {
      return ApiRes(
        true,
        STATUS.INTERNAL_SERVER_ERROR,
        "Todo not deleted.",
        null
      );
    }

    return ApiRes(true, STATUS.OK, "Todo deleted successfully.", null);
  } catch (err) {
    return ApiRes(false, STATUS.INTERNAL_SERVER_ERROR, err.message, null);
  }
};

// Get all todos
const getTodos = async () => {
  console.log("getTodos function called");
  try {
    const todos = await prisma.todo.findMany();
    return ApiRes(true, STATUS.OK, "Todos fetched successfully", todos);
  } catch (err) {
    console.log("error in getTodos", err);
    return ApiRes(false, STATUS.INTERNAL_SERVER_ERROR, err.message, null);
  }
};

export { addUpdateTodo, deleteTodo, getTodos };

import React from "react";
import { Button } from "@/components/ui/button";

const TodoDisplay = ({
  todos = [],
  onEdit,
  onDelete,
  loading,
  deleting,
  formSubmitLoading,
}) => {
  return (
    <div className="mt-6 bg-background border rounded-xl overflow-x-auto shadow">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
              #
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
              Title
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
              Description
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
              Status
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-foreground ">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {todos && todos.length > 0 ? (
            todos.map((todo, idx) => (
              <tr
                key={todo.id || idx}
                className="hover:bg-accent/50 transition"
              >
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  {idx + 1}
                </td>
                <td className="px-4 py-3 font-medium">{todo.title}</td>
                <td className="px-4 py-3 max-w-xs truncate">
                  {todo.description}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={
                      todo.completed
                        ? "inline-block px-2 py-1 rounded bg-green-500/10 text-green-500 text-xs"
                        : "inline-block px-2 py-1 rounded bg-destructive/10 text-destructive text-xs"
                    }
                  >
                    {todo.completed ? "Completed" : "Pending"}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-2 justify-center">
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded font-medium"
                    onClick={() => onEdit && onEdit(todo)}
                    disabled={formSubmitLoading}
                  >
                    {formSubmitLoading ? "Editing..." : "Edit"}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="rounded font-medium"
                    onClick={() => onDelete && onDelete(todo.id)}
                    disabled={deleting}
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
                className="text-center py-6 text-muted-foreground"
              >
                {loading ? "Loading..." : "No todos found."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TodoDisplay;

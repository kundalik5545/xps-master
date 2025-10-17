"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Code } from "lucide-react";
import { Copy, Download, ExternalLink, Plus } from "lucide-react";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

export default function ColumnsBuilder() {
  const { control, register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      filename: "portalColumns",
      columns: [
        {
          accessorKey: "portalName",
          header: "Portal Name",
          enableSorting: true,
          enableHiding: true,
          enableColumnFilter: false,
          id: "",
          hasCell: false,
          cell: "",
        },
      ],
    },
  });

  const [previewOpen, setPreviewOpen] = useState(false);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  const colsWatch = watch("columns");
  const filename = watch("filename") || "portalColumns";

  function starterCellCode(accessor) {
    return `({ row }) => {\n  const s = row.original.${
      accessor || "statusId"
    };\n  return s ? (\n    <span className=\"inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-white/6\">\n      {String(s)}\n    </span>\n  ) : (\n    <span className=\"text-muted-foreground\">-</span>\n  );\n}`;
  }

  function generateFileText(cols, name) {
    const items = cols.map((c) => {
      if (c.id && c.id.trim() === "actions") {
        return `  {\n    id: "actions",\n    header: () => <TableActionsHeader />,\n    enableSorting: ${!!c.enableSorting},\n    enableHiding: ${!!c.enableHiding},\n    enableColumnFilter: ${!!c.enableColumnFilter},\n    cell: ({ row }) => {\n      const record = row.original;\n      return (<TableActions record={record} onEdit={onEdit} onDelete={onDelete} />);\n    },\n  }`;
      }

      const accessorKeyPart = c.accessorKey
        ? `accessorKey: "${c.accessorKey}",`
        : "";
      const headerPart = c.header
        ? `header: "${String(c.header).replace(/"/g, '\\"')}",`
        : "";
      const cellPart =
        c.hasCell && c.cell && c.cell.trim()
          ? `\n    cell: ${
              c.cell.trim().endsWith(",")
                ? c.cell.trim().slice(0, -1)
                : c.cell.trim()
            },`
          : "";

      return `  {\n    ${accessorKeyPart}\n    ${headerPart}\n    enableSorting: ${!!c.enableSorting},\n    enableHiding: ${!!c.enableHiding},\n    enableColumnFilter: ${!!c.enableColumnFilter},${cellPart}\n  }`;
    });

    const file = `import {\n  TableActions,\n  TableActionsHeader,\n} from "@/components/myUis/TableComponents";\n\nexport const ${name} = ({ onEdit, onDelete }) => [\n${items.join(
      ",\n"
    )}\n];\n\nexport default ${name};\n`;

    return file;
  }

  const onGenerate = (data) => {
    const fileText = generateFileText(data.columns, data.filename || filename);
    const w = window.open("", "_blank");
    if (w) {
      w.document.write(
        `<pre>${fileText.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</pre>`
      );
      w.document.close();
    }
  };

  const handleDownload = () => {
    const data = { columns: colsWatch };
    const fileText = generateFileText(data.columns, filename);
    const blob = new Blob([fileText], {
      type: "text/javascript;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.js`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    const fileText = generateFileText(colsWatch || [], filename);
    try {
      await navigator.clipboard.writeText(fileText);
      alert("Code copied to clipboard");
    } catch (e) {
      alert("Failed to copy to clipboard");
    }
  };

  const handlePreviewToggle = () => {
    setPreviewOpen((p) => !p);
  };

  return (
    <div className="container mx-auto max-w-7xl mt-3 p-3">
      <h2 className="text-xl font-semibold mb-4">TanStack Columns Builder</h2>

      <div className="flex items-center gap-2 mb-4">
        <Input {...register("filename")} className="max-w-[200px]" />
        <div className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded">
          .js
        </div>

        {/* Top buttons */}
        <div className="ml-auto flex gap-2">
          <Button onClick={handleCopy}>
            <Copy />
            Copy Code
          </Button>
          <Button
            onClick={() => {
              const fileText = generateFileText(colsWatch || [], filename);
              const w = window.open("", "_blank");
              if (w) {
                w.document.write(
                  `<pre>${fileText
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")}</pre>`
                );
                w.document.close();
              }
            }}
          >
            Preview in New Tab
            <ExternalLink />
          </Button>
          <Button onClick={handlePreviewToggle}>
            <Code /> {previewOpen ? "Hide Preview" : "Preview Code"}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onGenerate)} className="space-y-4 rounded ">
        {fields.map((field, idx) => (
          <div key={field.id} className="border rounded p-3 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex flex-col space-y-4">
                <Label htmlFor={`accessor-${idx}`}>accessorKey</Label>
                <Input
                  id={`accessor-${idx}`}
                  {...register(`columns.${idx}.accessorKey`)}
                  placeholder="e.g. portalName"
                  defaultValue={field.accessorKey}
                />
              </div>

              <div className="flex flex-col space-y-4">
                <Label htmlFor={`header-${idx}`}>header (text)</Label>
                <Input
                  id={`header-${idx}`}
                  {...register(`columns.${idx}.header`)}
                  placeholder="Column Header"
                  defaultValue={field.header}
                />
              </div>

              <div className="flex flex-col space-y-4">
                <Label htmlFor={`id-${idx}`}>id (optional)</Label>
                <Input
                  id={`id-${idx}`}
                  {...register(`columns.${idx}.id`)}
                  placeholder='set "actions" to create actions column template'
                  defaultValue={field.id}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-2 items-center py-3">
              <div className="flex items-center gap-2 col-span-2">
                <Controller
                  name={`columns.${idx}.enableSorting`}
                  control={control}
                  render={({ field: chkField }) => (
                    <>
                      <Checkbox
                        id={`sorting-${idx}`}
                        checked={!!chkField.value}
                        onCheckedChange={(v) => chkField.onChange(!!v)}
                      />
                      <Label
                        htmlFor={`sorting-${idx}`}
                        className="cursor-pointer select-none ml-1"
                      >
                        enableSorting
                      </Label>
                    </>
                  )}
                />
              </div>

              <div className="flex items-center gap-2 col-span-2">
                <Controller
                  name={`columns.${idx}.enableHiding`}
                  control={control}
                  render={({ field: chkField }) => (
                    <>
                      <Checkbox
                        id={`hiding-${idx}`}
                        checked={!!chkField.value}
                        onCheckedChange={(v) => chkField.onChange(!!v)}
                      />
                      <Label
                        htmlFor={`hiding-${idx}`}
                        className="cursor-pointer select-none ml-1"
                      >
                        enableHiding
                      </Label>
                    </>
                  )}
                />
              </div>

              <div className="flex items-center gap-2 col-span-2">
                <Controller
                  name={`columns.${idx}.enableColumnFilter`}
                  control={control}
                  render={({ field: chkField }) => (
                    <>
                      <Checkbox
                        id={`filter-${idx}`}
                        checked={!!chkField.value}
                        onCheckedChange={(v) => chkField.onChange(!!v)}
                      />
                      <Label
                        htmlFor={`filter-${idx}`}
                        className="cursor-pointer select-none ml-1"
                      >
                        enableColumnFilter
                      </Label>
                    </>
                  )}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Controller
                name={`columns.${idx}.hasCell`}
                control={control}
                render={({ field: chkField }) => (
                  <>
                    <Checkbox
                      id={`hasCell-${idx}`}
                      checked={!!chkField.value}
                      onCheckedChange={(v) => {
                        const isTrue = !!v;
                        chkField.onChange(isTrue);
                        const currentCell = colsWatch?.[idx]?.cell || "";
                        if (isTrue && !currentCell) {
                          const accessor =
                            colsWatch?.[idx]?.accessorKey || "statusId";
                          setValue(
                            `columns.${idx}.cell`,
                            starterCellCode(accessor)
                          );
                        }
                        if (!isTrue) {
                          setValue(`columns.${idx}.cell`, "");
                        }
                      }}
                    />
                    <Label
                      htmlFor={`hasCell-${idx}`}
                      className="cursor-pointer select-none ml-1"
                    >
                      Has custom cell?
                    </Label>
                  </>
                )}
              />

              <div className="ml-auto">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => remove(idx)}
                >
                  Remove
                </Button>
              </div>
            </div>

            {colsWatch?.[idx]?.hasCell && (
              <div className="mt-2">
                <Label>cell (editable)</Label>
                <Textarea
                  {...register(`columns.${idx}.cell`)}
                  placeholder="Paste or edit your cell function here"
                  rows={6}
                  className="mt-1"
                />
                <div className="text-sm text-muted-foreground mt-2">
                  Tip: paste a full arrow function like{" "}
                  <code>{`({ row }) => { ... }`}</code>
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="flex gap-2">
          <Button
            type="button"
            onClick={() =>
              append({
                accessorKey: "",
                header: "",
                enableSorting: false,
                enableHiding: false,
                enableColumnFilter: false,
                id: "",
                hasCell: false,
                cell: "",
              })
            }
          >
            <Plus /> Add Column
          </Button>

          <Button type="submit">
            Generate Preview (new tab)
            <ExternalLink />
          </Button>

          <Button type="button" onClick={handleDownload}>
            <Download /> Download {filename}.js
          </Button>
        </div>
      </form>

      {previewOpen && (
        <div className="mt-6">
          <h3 className="text-lg font-medium">Generated code preview</h3>
          <pre className="bg-slate-900 text-white p-4 rounded overflow-x-auto whitespace-pre-wrap mt-2">
            {generateFileText(colsWatch || [], filename)}
          </pre>
          <div className="mt-2 flex gap-2">
            <Button onClick={handleCopy}>Copy Preview</Button>
            <Button
              onClick={() => {
                const blob = new Blob(
                  [generateFileText(colsWatch || [], filename)],
                  { type: "text/javascript" }
                );
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${filename}.js`;
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              <Download /> Download Preview
            </Button>
          </div>
        </div>
      )}

      <div className="mt-6 text-sm text-muted-foreground">
        - Click the labels to toggle checkboxes as well.
        <br />- When you enable "Has custom cell?" a textarea appears and is
        prepopulated with starter code (if empty).
      </div>
    </div>
  );
}

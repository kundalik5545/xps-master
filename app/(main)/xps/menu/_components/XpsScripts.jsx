"use client";

import {
  addUpdateSqlScript,
  deleteXpsSqlScript,
} from "@/actions/xps/xps_sqlScripts";
import FormModal from "@/components/myUi/FormModal";
import PageHeader from "@/components/myUi/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import useFormSubmit from "@/hooks/useFormSubmit";
import useSingleDelete from "@/hooks/useSingleDelete";
import { Check, Copy, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import XpsScriptForm from "./XpsScriptForm";

const XpsScripts = ({ scriptsData, menuId }) => {
  const [scripts, setScripts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copiedScriptId, setCopiedScriptId] = useState(null);

  useEffect(() => {
    setScripts(scriptsData?.xpsScripts);
  }, []);

  const handleCopy = async (sqlScript, id) => {
    try {
      await navigator.clipboard.writeText(sqlScript || "");
      setCopiedScriptId(id);
      setTimeout(() => setCopiedScriptId(null), 1200);
    } catch {}
  };

  const { handleFormSubmit: handleSubmit, loading: loadingSubmit } =
    useFormSubmit({
      formSubmitAction: addUpdateSqlScript,
      isEditing: isEditing,
      editingData: editingData,
      setData: setScripts,
      setIsDialogOpen: setIsDialogOpen,
      setIsEditing: setIsEditing,
      setEditingData: setEditingData,
    });

  // Editing Scripts Data
  const onEdit = (record) => {
    setEditingData(record);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  // Delete scripts
  const { onDelete, loading: deleting } = useSingleDelete({
    deleteAction: deleteXpsSqlScript,
    setData: setScripts,
  });

  return (
    <div className="space-y-4 mt-5">
      <PageHeader
        pageTitle="SQL Scripts"
        pageDesc="Manage your SQL Scripts here"
        buttonText="Add Script"
        setIsDialogOpen={setIsDialogOpen}
        setIsEditing={setIsEditing}
      />

      {/* Script Form Modal */}
      <FormModal
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        isEditing={isEditing}
        myForm={
          <XpsScriptForm
            onFormSubmit={handleSubmit}
            editingData={editingData}
            loadingSubmit={loadingSubmit}
            menuId={menuId}
          />
        }
      />

      {scripts?.length === 0 ? (
        <div className="rounded-md border p-6 text-center text-sm text-muted-foreground">
          No scripts found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
          {scripts?.length > 0 &&
            scripts.map((script) => (
              <Card
                key={script.id}
                className="w-full transition hover:shadow-sm"
              >
                <CardHeader className="flex items-start justify-between gap-2">
                  <CardTitle className="line-clamp-1">
                    {script.scriptTitle}
                  </CardTitle>
                  <CardAction className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="secondary"
                      size="icon"
                      title="Edit"
                      onClick={() => onEdit(script)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="icon"
                      title="Delete"
                      onClick={() => onDelete(script.id)}
                    >
                      {deleting ? <Spinner /> : <Trash2 className="h-4 w-4" />}
                    </Button>
                    <Button
                      onClick={() => handleCopy(script.sqlScript, script.id)}
                      size="icon"
                      variant="secondary"
                      title="Copy SQL"
                    >
                      {copiedScriptId === script.id ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </CardAction>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="rounded-md border bg-muted/40">
                    <SyntaxHighlighter
                      language="sql"
                      className="rounded-md max-h-64 overflow-auto text-sm"
                    >
                      {script.sqlScript || "-- No SQL provided"}
                    </SyntaxHighlighter>
                  </div>
                  {script.scriptInfo && (
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {script.scriptInfo}
                    </p>
                  )}
                </CardContent>

                <CardFooter className="text-xs text-muted-foreground">
                  <div className="flex w-full items-center justify-between">
                    <span>
                      Created: {new Date(script.createdAt).toLocaleString()}
                    </span>
                    <span>
                      Updated: {new Date(script.updatedAt).toLocaleString()}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
};

export default XpsScripts;

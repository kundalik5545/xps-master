"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Prisma models related to seeding (display names, map to backend endpoint/model names)
const PRISMA_MODELS = [
  { label: "XPS Menus", value: "xpsMenus" },
  { label: "XPS Menu Descriptions", value: "XpsMenuDescription" },
  { label: "XPS User Guides", value: "XpsUserGuides" },
  { label: "XPS Test Cases", value: "XpsTestCases" },
  { label: "XPS Tables", value: "XpsTables" },
  { label: "XPS Columns", value: "XpsColumns" },
  { label: "XPS Scripts", value: "XpsScripts" },
  { label: "XPS Bugs", value: "XpsBugs" },
  { label: "XPS Released Tasks", value: "XpsReleasedTasks" },
];

const SeedToXpsDbPage = () => {
  const [selectedModel, setSelectedModel] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "idle", message: "" });

    if (!file || !selectedModel) {
      setStatus({
        type: "error",
        message: "Please select a model and upload an Excel file.",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("model", selectedModel);

      setIsSubmitting(true);
      setStatus({ type: "loading", message: "Uploading and seeding..." });
      const response = await fetch("/api/seed/upload-excel", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let message = "Upload failed";
        try {
          const data = await response.json();
          message = data?.message || message;
        } catch {}
        setStatus({ type: "error", message: message });
      } else {
        setStatus({ type: "success", message: "Seeding successful!" });
      }
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Seed Data to Database</CardTitle>
            <CardDescription>
              Upload an Excel file and choose a Prisma model to seed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="excelFile">Excel File (.xlsx or .xls)</Label>
                <Input
                  id="excelFile"
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileChange}
                />
                {file && (
                  <p className="text-xs text-muted-foreground">
                    Selected: {file.name}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="modelSelect">Select Prisma Model</Label>
                <Select
                  value={selectedModel}
                  onValueChange={(val) => setSelectedModel(val)}
                >
                  <SelectTrigger id="modelSelect" className="w-full">
                    <SelectValue placeholder="Choose a model" />
                  </SelectTrigger>
                  <SelectContent align="start">
                    {PRISMA_MODELS.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Spinner className="mr-2" />} Seed Data
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isSubmitting}
                  onClick={() => {
                    setFile(null);
                    setSelectedModel("");
                    setStatus({ type: "idle", message: "" });
                  }}
                >
                  Reset
                </Button>
              </div>
            </form>

            {status.message && (
              <div className="mt-4">
                <Alert
                  variant={status.type === "error" ? "destructive" : "default"}
                >
                  <AlertTitle>
                    {status.type === "error"
                      ? "Error"
                      : status.type === "success"
                      ? "Success"
                      : "Status"}
                  </AlertTitle>
                  <AlertDescription>{status.message}</AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Files should have headers matching your Prisma model fields. Large
              files may take longer to process.
            </p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
            <CardDescription>How to prepare your Excel file</CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <ol className="list-decimal pl-5 space-y-2">
              <li>Export or create an Excel file with the required columns.</li>
              <li>Ensure header names match Prisma model field names.</li>
              <li>Select the correct target model for the data set.</li>
              <li>Click Seed Data and wait for the confirmation.</li>
            </ol>
            <div className="mt-4">
              <p className="text-muted-foreground">
                Supported formats: <code>.xlsx</code>, <code>.xls</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SeedToXpsDbPage;

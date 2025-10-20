"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { LayoutList, Hash, Unlink } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { DWTaskFormSchema } from "@/lib/Schema/FormSchema";

export default function DWTaskForm({ onFormSubmit, editingData }) {
  const form = useForm({
    resolver: zodResolver(DWTaskFormSchema),
    defaultValues: editingData || {
      taskId: 0,
      taskTitle: "",
      taskState: "",
      portalName: "",
      env: "",
      assignedBy: "",
      taskURL: "",
    },
  });

  function onSubmit(values) {
    onFormSubmit(values);
    form.reset();
    form.clearErrors();
  }

  function onReset() {
    form.reset();
    form.clearErrors();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={onReset}
        className="space-y-8 @container"
      >
        <div className="grid grid-cols-12 gap-4">
          <FormField
            control={form.control}
            name="taskId"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Task ID</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="number-input-0"
                        placeholder="Enter Task Id (Optional)"
                        type="number"
                        id="taskId"
                        className=" ps-9"
                        {...field}
                      />
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <Hash className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="taskTitle"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Task Title</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-0"
                        placeholder="Enter Task Title"
                        type="text"
                        id="taskTitle"
                        className=" "
                        {...field}
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="taskState"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Task State</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Select
                      key="select-0"
                      id="taskState"
                      className=""
                      {...field}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Select Task State" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key="Proposed" value="Proposed">
                          Proposed
                        </SelectItem>

                        <SelectItem key="Active" value="Active">
                          Active
                        </SelectItem>

                        <SelectItem key="Released" value="Released">
                          Released
                        </SelectItem>

                        <SelectItem key="Resolved" value="Resolved">
                          Resolved
                        </SelectItem>

                        <SelectItem key="Closed" value="Closed">
                          Closed
                        </SelectItem>

                        <SelectItem key="Reassigned" value="Reassigned">
                          Reassigned
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="portalName"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Portal Name</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Select
                      key="select-1"
                      id="portalName"
                      className=""
                      {...field}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Select Portal Name" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key="XPS" value="XPS">
                          XPS
                        </SelectItem>

                        <SelectItem key="eMember" value="eMember">
                          eMember
                        </SelectItem>

                        <SelectItem key="CAT" value="CAT">
                          CAT
                        </SelectItem>

                        <SelectItem key="Fusion" value="Fusion">
                          Fusion
                        </SelectItem>

                        <SelectItem key="Hangfire" value="Hangfire">
                          Hangfire
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="env"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Env</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Select
                      key="select-2"
                      id="env"
                      className=""
                      {...field}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Select Env" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key="ST" value="ST">
                          ST
                        </SelectItem>

                        <SelectItem key="IAT" value="IAT">
                          IAT
                        </SelectItem>

                        <SelectItem key="UAT" value="UAT">
                          UAT
                        </SelectItem>

                        <SelectItem key="PROD" value="PROD">
                          PROD
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="assignedBy"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Assigned By</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Select
                      key="select-3"
                      id="assignedBy"
                      className=""
                      {...field}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Select Assigned By" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key="Kundalik" value="Kundalik">
                          Kundalik
                        </SelectItem>

                        <SelectItem key="George" value="George">
                          George
                        </SelectItem>

                        <SelectItem key="Priti" value="Priti">
                          Priti
                        </SelectItem>

                        <SelectItem key="Steve" value="Steve">
                          Steve
                        </SelectItem>

                        <SelectItem key="Swamy" value="Swamy">
                          Swamy
                        </SelectItem>

                        <SelectItem key="Other" value="Other">
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="taskURL"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Task URL</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="url-input-0"
                        placeholder="Enter Task URL (Optional)"
                        type="url"
                        id="taskURL"
                        className=" ps-9"
                        {...field}
                      />
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <Unlink className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reset-button-0"
            render={({ field }) => (
              <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="hidden shrink-0">Reset</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Button
                      key="reset-button-0"
                      id="reset-button-0"
                      name=""
                      className="w-full"
                      type="reset"
                      variant="outline"
                    >
                      Reset
                    </Button>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="submit-button-0"
            render={({ field }) => (
              <FormItem className="col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="hidden shrink-0">Submit</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Button
                      key="submit-button-0"
                      id="submit-button-0"
                      name=""
                      className="w-full"
                      type="submit"
                      variant="default"
                    >
                      Submit
                    </Button>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}

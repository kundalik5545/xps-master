"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Bug, Unlink } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { XpsBugFormSchema } from "@/lib/Schema/FormSchema";

export default function XpsBugForm({
  onFormSubmit,
  editingData,
  loadingSubmit,
}) {
  const form = useForm({
    resolver: zodResolver(XpsBugFormSchema),
    defaultValues: editingData || {
      bugId: 0,
      bugTitle: "",
      portalName: "XPS",
      qaBugState: "Proposed",
      env: "IAT",
      assignedTo: "Kundalik",
      bugUrl: "",
      comments: "",
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
            name="bugId"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Bug ID</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="number-input-0"
                        placeholder="Enter Bug ID"
                        type="number"
                        id="bugId"
                        className=" ps-9"
                        {...field}
                      />
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <Bug className="size-4" strokeWidth={2} />
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
            name="bugTitle"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Bug Title</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-0"
                        placeholder="Enter Bug Title"
                        type="text"
                        id="bugTitle"
                        className=" ps-9"
                        {...field}
                      />
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <Bug className="size-4" strokeWidth={2} />
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
            name="portalName"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Portal Name</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Select
                      key="select-0"
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
            name="qaBugState"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">QA Bug State</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Select
                      key="select-1"
                      id="qaBugState"
                      className=""
                      {...field}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Select Bug State" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key="Proposed" value="Proposed">
                          Proposed
                        </SelectItem>

                        <SelectItem key="Active" value="Active">
                          Active
                        </SelectItem>

                        <SelectItem key="Resolved" value="Resolved">
                          Resolved
                        </SelectItem>

                        <SelectItem key="Rejected" value="Rejected">
                          Rejected
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
            name="env"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Envoirment</FormLabel>

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
                        <SelectItem key="IAT" value="IAT">
                          IAT
                        </SelectItem>

                        <SelectItem key="ST" value="ST">
                          ST
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
            name="assignedTo"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Assigned To</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Select
                      key="select-3"
                      id="assignedTo"
                      className=""
                      {...field}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Select Assigned To" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key="Kundalik" value="Kundalik">
                          Kundalik
                        </SelectItem>

                        <SelectItem key="Priti" value="Priti">
                          Priti
                        </SelectItem>

                        <SelectItem key="Swamy" value="Swamy">
                          Swamy
                        </SelectItem>

                        <SelectItem key="George" value="George">
                          George
                        </SelectItem>

                        <SelectItem key="Steve" value="Steve">
                          Steve
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
            name="bugUrl"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Bug URL</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="url-input-0"
                        placeholder="Enter Bug URL"
                        type="url"
                        id="bugUrl"
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
            name="comments"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Comments</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Textarea
                      key="textarea-0"
                      id="comments"
                      placeholder="Enter Comments (Optional)"
                      className=""
                      {...field}
                    />
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

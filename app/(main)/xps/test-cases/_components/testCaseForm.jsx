"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { XpsTestCaseFormSchema } from "@/lib/Schema/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ALargeSmall, Hash } from "lucide-react";
import { useForm } from "react-hook-form";

export default function TestCaseForm({ onFormSubmit, editingData }) {
  const form = useForm({
    resolver: zodResolver(XpsTestCaseFormSchema),
    defaultValues: editingData || {
      testCaseNo: "",
      testCaseName: "",
      schemeType: "",
      schemeLevel: "",
      module: "",
      automationStatus: "",
      testStatus: "",
      expectedResult: "",
      actualResult: "",
      comments: "",
      xpsMenuId: 0,
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
            name="testCaseNo"
            render={({ field }) => (
              <FormItem className="col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Test Case No</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-0"
                        placeholder="Enter Test Case No (Optional)"
                        type="text"
                        id="testCaseNo"
                        className=" ps-9"
                        {...field}
                      />
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <ALargeSmall className="size-4" strokeWidth={2} />
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
            name="automationStatus"
            render={({ field }) => (
              <FormItem className="col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">
                  Automation Status
                </FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Select
                      key="select-3"
                      id="automationStatus"
                      {...field}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Select Automation Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key="Automated" value="Automated">
                          Automated
                        </SelectItem>
                        <SelectItem key="NotAutomated" value="NotAutomated">
                          NotAutomated
                        </SelectItem>
                        <SelectItem key="InProgress" value="InProgress">
                          InProgress
                        </SelectItem>
                        <SelectItem key="OnHold" value="OnHold">
                          OnHold
                        </SelectItem>
                        <SelectItem key="Cancelled" value="Cancelled">
                          Cancelled
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
            name="testStatus"
            render={({ field }) => (
              <FormItem className="col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Test Status</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Select
                      key="select-4"
                      id="testStatus"
                      {...field}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Select Test Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key="Passed" value="Passed">
                          Passed
                        </SelectItem>
                        <SelectItem key="Failed" value="Failed">
                          Failed
                        </SelectItem>
                        <SelectItem key="Skipped" value="Skipped">
                          Skipped
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
            name="testCaseName"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Test Case Name</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Textarea
                      key="textarea-0"
                      placeholder="Enter Test Case Name"
                      id="testCaseName"
                      className="min-h-16"
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
            name="schemeType"
            render={({ field }) => (
              <FormItem className="col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">
                  Scheme Type (Optional)
                </FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Select
                      key="select-0"
                      id="schemeType"
                      {...field}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Select Scheme Type (Optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key="DB" value="DB">
                          DB
                        </SelectItem>
                        <SelectItem key="DC" value="DC">
                          DC
                        </SelectItem>
                        <SelectItem key="HYB" value="HYB">
                          HYB
                        </SelectItem>
                        <SelectItem key="DB_HYB" value="DB_HYB">
                          DB_HYB
                        </SelectItem>
                        <SelectItem key="DC_HYB" value="DC_HYB">
                          DC_HYB
                        </SelectItem>
                        <SelectItem key="DB_DC" value="DB_DC">
                          DB_DC
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
            name="schemeLevel"
            render={({ field }) => (
              <FormItem className="col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Scheme Level</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Select
                      key="select-1"
                      id="schemeLevel"
                      {...field}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Select Scheme Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key="TL" value="TL">
                          TL
                        </SelectItem>
                        <SelectItem key="SL" value="SL">
                          SL
                        </SelectItem>
                        <SelectItem key="ML" value="ML">
                          ML
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
            name="module"
            render={({ field }) => (
              <FormItem className="col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Module</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Select
                      key="select-2"
                      id="module"
                      {...field}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="Select Module" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem key="Details" value="Details">
                          Details
                        </SelectItem>
                        <SelectItem
                          key="ToolsAndProcess"
                          value="ToolsAndProcess"
                        >
                          ToolsAndProcess
                        </SelectItem>
                        <SelectItem key="Letters" value="Letters">
                          Letters
                        </SelectItem>
                        <SelectItem key="Reports" value="Reports">
                          Reports
                        </SelectItem>
                        <SelectItem key="Leavers" value="Leavers">
                          Leavers
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
            name="expectedResult"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Expected Result</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Textarea
                      key="textarea-0"
                      id="expectedResult"
                      placeholder="Expected result..."
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
            name="actualResult"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Actual Result</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Textarea
                      key="textarea-1"
                      id="actualResult"
                      placeholder="Actual result..."
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
            name="comments"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Comments</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Textarea
                      key="textarea-2"
                      id="comments"
                      placeholder="Your comment..."
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
            name="xpsMenuId"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">XPS Menu Id</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="number-input-0"
                        placeholder="Enter XPS Menu Id (Optional)"
                        type="number"
                        id="xpsMenuId"
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

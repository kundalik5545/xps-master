"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { EmTestCaseFormSchema } from "@/lib/Schema/FormSchema";
import { ALargeSmall, Hash } from "lucide-react";

/**
 * TODO: update props & handlers as actual usage requires.
 * @param {Object} props
 * @param {Function} props.onFormSubmit primary submit handler (optional)
 * @param {Object} props.editingData optionally provide pre-filled data (optional)
 */
export default function EmTCForm({ onFormSubmit, editingData }) {
  const form = useForm({
    resolver: zodResolver(EmTestCaseFormSchema),
    defaultValues: editingData || {
      testCaseNo: "",
      testCaseName: "",
      portalName: "",
      automationStatus: "",
      testStatus: "",
      expectedResult: "",
      actualResult: "",
      comments: "",
      emMenuId: 0,
    },
  });

  function onSubmit(values) {
    if (onFormSubmit) {
      onFormSubmit(values);
    }
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
              <FormItem className="col-span-4 flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel>Test Case No</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        placeholder="Enter Test Case No (Optional)"
                        type="text"
                        id="testCaseNo"
                        className="ps-9"
                        {...field}
                      />
                      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center peer-disabled:opacity-50 start-0 ps-3">
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
              <FormItem className="col-span-4 flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel>Automation Status</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Select
                      id="automationStatus"
                      {...field}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Automation Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Automated">Automated</SelectItem>
                        <SelectItem value="NotAutomated">
                          NotAutomated
                        </SelectItem>
                        <SelectItem value="InProgress">InProgress</SelectItem>
                        <SelectItem value="OnHold">OnHold</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
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
              <FormItem className="col-span-4 flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel>Test Status</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Select
                      id="testStatus"
                      {...field}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Test Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Passed">Passed</SelectItem>
                        <SelectItem value="Failed">Failed</SelectItem>
                        <SelectItem value="Skipped">Skipped</SelectItem>
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
              <FormItem className="col-span-12 flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel>Test Case Name</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Textarea
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
            name="portalName"
            render={({ field }) => (
              <FormItem className="col-span-4 flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel>Portal Name (Optional)</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Select
                      id="portalName"
                      {...field}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Portal Name (Optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="XPS">XPS</SelectItem>
                        <SelectItem value="eMember">eMember</SelectItem>
                        <SelectItem value="CAT">CAT</SelectItem>
                        <SelectItem value="Fusion">Fusion</SelectItem>
                        <SelectItem value="Hangfire">Hangfire</SelectItem>
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
              <FormItem className="col-span-12 flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel>Expected Result</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Textarea
                      id="expectedResult"
                      placeholder="Expected result..."
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
              <FormItem className="col-span-12 flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel>Actual Result</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Textarea
                      id="actualResult"
                      placeholder="Actual result..."
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
              <FormItem className="col-span-12 flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel>Comments</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Textarea
                      id="comments"
                      placeholder="Your comment..."
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
            name="emMenuId"
            render={({ field }) => (
              <FormItem className="col-span-12 flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel>Em Menu Id</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        placeholder="Enter Em Menu Id (Optional)"
                        type="number"
                        id="emMenuId"
                        className="ps-9"
                        {...field}
                      />
                      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center peer-disabled:opacity-50 start-0 ps-3">
                        <Hash className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="col-span-6 flex items-end">
            <Button type="reset" variant="outline" className="w-full">
              Reset
            </Button>
          </div>
          <div className="col-span-6 flex items-end">
            <Button type="submit" variant="default" className="w-full">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

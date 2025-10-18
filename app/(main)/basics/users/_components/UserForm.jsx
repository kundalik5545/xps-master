"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserFormSchema } from "@/lib/Schema/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import {
  ALargeSmall,
  AtSign,
  CalendarIcon,
  Hash,
  LocationEdit,
  LockKeyhole,
  MailPlus,
  User,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function UsersForm({ onFormSubmit, editingData }) {
  const [showPassword, setShowPassword] = useState(false);

  const formSchema = z.object({
    eMemberId: z.coerce.number().optional(),
    xpsId: z.coerce.number().optional(),
    userHashId: z.string(),
    username: z.string(),
    password: z.string(),
    memorableWord: z.string(),
    userStatusId: z.coerce.number().optional(),
    userEmail: z.string(),
    DOB: z.date().optional(),
    niNumber: z.string(),
    addressId: z.coerce.number().optional(),
    postcode: z.string(),
    xpsSchemeId: z.coerce.number().optional(),
    eMemberSchemeId: z.coerce.number().optional(),
  });

  const form = useForm({
    resolver: zodResolver(UserFormSchema),
    defaultValues: editingData || {
      eMemberId: 0,
      xpsId: 0,
      userHashId: "",
      username: "",
      password: "",
      memorableWord: "",
      userStatusId: 0,
      userEmail: "",
      DOB: "",
      niNumber: "",
      addressId: 0,
      postcode: "",
      xpsSchemeId: 0,
      eMemberSchemeId: 0,
    },
  });

  function onSubmit(values) {
    onFormSubmit(values);
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
            name="eMemberId"
            render={({ field }) => (
              <FormItem className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">EMember ID</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="number-input-0"
                        placeholder="Enter EMember ID (Optional)"
                        type="number"
                        id="eMemberId"
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
            name="xpsId"
            render={({ field }) => (
              <FormItem className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">XPS ID</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="number-input-1"
                        placeholder="Enter XPS ID (Optional)"
                        type="number"
                        id="xpsId"
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
            name="userHashId"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">User Hash Id</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-0"
                        placeholder="Enter User Hash ID (Optional)"
                        type="text"
                        id="userHashId"
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
            name="username"
            render={({ field }) => (
              <FormItem className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">User Name</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-1"
                        placeholder="Enter Username (Optional)"
                        type="text"
                        id="username"
                        className=" ps-9"
                        {...field}
                      />
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <User className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Password</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      {/* Lock icon at the start */}
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <LockKeyhole className="size-4" strokeWidth={2} />
                      </div>
                      <Input
                        key="password-input-0"
                        placeholder="Enter Password (Optional)"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="ps-9 pr-10"
                        {...field}
                      />
                      {/* Eye icon at the end */}
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 end-0 flex items-center px-3 text-muted-foreground focus:outline-none"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <Eye className="size-4" strokeWidth={2} />
                        ) : (
                          <EyeClosed className="size-4" strokeWidth={2} />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="memorableWord"
            render={({ field }) => (
              <FormItem className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Memorable Word</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-3"
                        placeholder="Enter Memorable Word (Optional)"
                        type="text"
                        id="memorableWord"
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
            name="userStatusId"
            render={({ field }) => (
              <FormItem className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">User Status Id</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="number-input-2"
                        placeholder="Enter User Status ID (Optional)"
                        type="number"
                        id="userStatusId"
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
            name="userEmail"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">User Email</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="email-input-0"
                        placeholder="Enter User EMail (Optional)"
                        type="email"
                        id="userEmail"
                        className=" ps-9"
                        {...field}
                      />
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <MailPlus className="size-4" strokeWidth={2} />
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
            name="DOB"
            render={({ field }) => (
              <FormItem className="col-span-12 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Date Of Birth</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="justify-start text-left font-normal w-full"
                          id="DOB"
                          name="DOB"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span className="text-muted-foreground">
                              Pick a date
                            </span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          initialFocus
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="niNumber"
            render={({ field }) => (
              <FormItem className="col-span-12 @3xl:col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Ni Number</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-4"
                        placeholder="Enter NI Number (Optional)"
                        type="text"
                        id="niNumber"
                        className=" ps-9"
                        {...field}
                      />
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <AtSign className="size-4" strokeWidth={2} />
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
            name="addressId"
            render={({ field }) => (
              <FormItem className="col-span-12 @3xl:col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Address Id</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="number-input-3"
                        placeholder="Enter Address ID (Optional)"
                        type="number"
                        id="addressId"
                        className=" ps-9"
                        {...field}
                      />
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <LocationEdit className="size-4" strokeWidth={2} />
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
            name="postcode"
            render={({ field }) => (
              <FormItem className="col-span-12 @3xl:col-span-4 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">Postcode</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="text-input-5"
                        placeholder="Enter Postcode (Optional)"
                        type="text"
                        id="postcode"
                        className=" ps-9"
                        {...field}
                      />
                      <div
                        className={
                          "text-muted-foreground pointer-events-none absolute inset-y-0 flex items-center justify-center  peer-disabled:opacity-50 start-0 ps-3"
                        }
                      >
                        <LocationEdit className="size-4" strokeWidth={2} />
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
            name="xpsSchemeId"
            render={({ field }) => (
              <FormItem className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">XPS Scheme Id</FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="number-input-4"
                        placeholder="Enter XPS Scheme ID (Optional)"
                        type="number"
                        id="xpsSchemeId"
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
            name="eMemberSchemeId"
            render={({ field }) => (
              <FormItem className="col-span-12 @3xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
                <FormLabel className="flex shrink-0">
                  eMember Scheme Id
                </FormLabel>

                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        key="number-input-5"
                        placeholder="Enter EMember Scheme ID (Optional)"
                        type="number"
                        id="eMemberSchemeId"
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
            name="reset-button-0"
            render={({ field }) => (
              <FormItem className="col-span-12 @5xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
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
              <FormItem className="col-span-12 @5xl:col-span-6 col-start-auto flex self-end flex-col gap-2 space-y-0 items-start">
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

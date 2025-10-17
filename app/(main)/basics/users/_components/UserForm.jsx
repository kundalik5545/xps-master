"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  Eye,
  EyeClosed,
  Hash,
  Link,
  LockKeyhole,
  Mail,
  User,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { UserFormSchema } from "@/lib/Schema/FormSchema";

/**
 * User form for Prisma User model fields:
 * eMemberId      Int?      @unique
 * xpsId          Int?      @unique
 * userHashId     String?   @unique
 * username       String?
 * password       String?
 * memorableWord  String?
 * userStatusId   Int?
 * userEmail      String?
 * DOB            DateTime?
 * niNumber       String?   @unique
 * addressId      Int?
 * postcode       String?
 * xpsSchemeId    Int?
 * eMemberSchemeId Int?
 *
 * Behavior / validation choices (reasonable defaults):
 * - All fields optional (matching ?), but if provided must satisfy format checks:
 *   - eMemberId, xpsId, xpsSchemeId, eMemberSchemeId, userStatusId -> optional positive ints
 *   - userEmail -> optional email format
 *   - niNumber -> optional, if provided must match UK NI pattern AA123456A (9 chars)
 *   - DOB -> optional date (ISO string)
 *   - password -> optional but min length 6 if provided
 *   - userHashId -> optional string with min 6 chars
 *
 * Adjust validation rules to your project's requirements if you need stricter rules.
 */

export default function UserForm({ onFormSubmit, editingData }) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(UserFormSchema),
    defaultValues: editingData || {
      eMemberId: "",
      xpsId: "",
      userHashId: "",
      username: "",
      password: "",
      memorableWord: "",
      userStatusId: "",
      userEmail: "",
      DOB: "",
      niNumber: "",
      addressId: "",
      postcode: "",
      xpsSchemeId: "",
      eMemberSchemeId: "",
    },
  });

  function onSubmit(values) {
    // convert integer-like string fields to numbers if present
    const normalized = {
      ...values,
      eMemberId: values.eMemberId === "" ? null : Number(values.eMemberId),
      xpsId: values.xpsId === "" ? null : Number(values.xpsId),
      xpsSchemeId:
        values.xpsSchemeId === "" ? null : Number(values.xpsSchemeId),
      eMemberSchemeId:
        values.eMemberSchemeId === "" ? null : Number(values.eMemberSchemeId),
      userStatusId:
        values.userStatusId === "" ? null : Number(values.userStatusId),
      addressId: values.addressId === "" ? null : Number(values.addressId),
      DOB: values.DOB === "" ? null : new Date(values.DOB).toISOString(),
    };

    onFormSubmit(normalized);
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
          {/* eMemberId */}
          <FormField
            control={form.control}
            name="eMemberId"
            render={({ field }) => (
              <FormItem className="col-span-6 flex flex-col gap-2">
                <FormLabel>EMember ID</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        placeholder="Enter eMemberId (optional)"
                        id="eMemberId"
                        {...field}
                        className="ps-9"
                      />
                      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 ps-3 flex items-center">
                        <Hash className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* xpsId */}
          <FormField
            control={form.control}
            name="xpsId"
            render={({ field }) => (
              <FormItem className="col-span-6 flex flex-col gap-2">
                <FormLabel>XPS ID</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        placeholder="Enter xpsId (optional)"
                        id="xpsId"
                        {...field}
                        className="ps-9"
                      />
                      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 ps-3 flex items-center">
                        <Hash className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* userHashId */}
          <FormField
            control={form.control}
            name="userHashId"
            render={({ field }) => (
              <FormItem className="col-span-12 flex flex-col gap-2">
                <FormLabel>User Hash ID</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        placeholder="Enter userHashId (optional)"
                        id="userHashId"
                        {...field}
                        className="ps-9"
                      />
                      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 ps-3 flex items-center">
                        <LockKeyhole className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* userName */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="col-span-6 flex flex-col gap-2">
                <FormLabel>User Name</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        placeholder="Enter userName (optional)"
                        id="username"
                        {...field}
                        className="ps-9"
                      />
                      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 ps-3 flex items-center">
                        <User className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="col-span-6 flex flex-col gap-2">
                <FormLabel>Password</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 ps-3 flex items-center">
                        <LockKeyhole className="size-4" strokeWidth={2} />
                      </div>
                      <Input
                        placeholder="Enter Password (optional)"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...field}
                        className="ps-9 pr-10"
                      />
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

          {/* memorableWord */}
          <FormField
            control={form.control}
            name="memorableWord"
            render={({ field }) => (
              <FormItem className="col-span-12 flex flex-col gap-2">
                <FormLabel>Memorable Word</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter memorable word (optional)"
                      id="memorableWord"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* userStatusId */}
          <FormField
            control={form.control}
            name="userStatusId"
            render={({ field }) => (
              <FormItem className="col-span-6 flex flex-col gap-2">
                <FormLabel>User Status ID</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Input
                      placeholder="Enter userStatusId (optional)"
                      id="userStatusId"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* userEmail */}
          <FormField
            control={form.control}
            name="userEmail"
            render={({ field }) => (
              <FormItem className="col-span-12 flex flex-col gap-2">
                <FormLabel>User Email</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        placeholder="Enter email (optional)"
                        id="userEmail"
                        {...field}
                        className="ps-9"
                      />
                      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 ps-3 flex items-center">
                        <Mail className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* dob */}
          <FormField
            control={form.control}
            name="DOB"
            render={({ field }) => (
              <FormItem className="col-span-6 flex flex-col gap-2">
                <FormLabel>Date of Birth</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="YYYY-MM-DD (optional)"
                        id="DOB"
                        type="date"
                        {...field}
                      />
                      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 ps-3 flex items-center">
                        <Calendar className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* niNumber */}
          <FormField
            control={form.control}
            name="niNumber"
            render={({ field }) => (
              <FormItem className="col-span-6 flex flex-col gap-2">
                <FormLabel>NI Number</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        placeholder="AA123456A (optional)"
                        id="niNumber"
                        {...field}
                        className="ps-9"
                      />
                      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 ps-3 flex items-center">
                        <Link className="size-4" strokeWidth={2} />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* xpsSchemeId */}
          <FormField
            control={form.control}
            name="xpsSchemeId"
            render={({ field }) => (
              <FormItem className="col-span-4 flex flex-col gap-2">
                <FormLabel>XPS Scheme ID</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Input
                      placeholder="xpsSchemeId (opt.)"
                      id="xpsSchemeId"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* eMemberSchemeId */}
          <FormField
            control={form.control}
            name="eMemberSchemeId"
            render={({ field }) => (
              <FormItem className="col-span-4 flex flex-col gap-2">
                <FormLabel>EMember Scheme ID</FormLabel>
                <div className="w-full">
                  <FormControl>
                    <Input
                      placeholder="eMemberSchemeId (opt.)"
                      id="eMemberSchemeId"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="col-span-6">
            <Button type="reset" variant="outline" className="w-full">
              Reset
            </Button>
          </div>
          <div className="col-span-6">
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

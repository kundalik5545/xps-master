"use client";
import React from "react";
import { AppSidebar } from "@/components/appLayout/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import ModeToggle from "@/components/appLayout/ModeToggle";

const MainLayout = ({ children }) => {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname segments
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    // Capitalize segment for label (could use a map for pretty names)
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    return { label, href };
  });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between border-b h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbItems.length > 0 && (
                  <>
                    <BreadcrumbSeparator className="hidden md:inline" />
                    {breadcrumbItems.map((item, index) => {
                      const isLast = index === breadcrumbItems.length - 1;
                      return (
                        <React.Fragment key={item.href}>
                          <BreadcrumbItem>
                            {isLast ? (
                              <BreadcrumbPage>{item.label}</BreadcrumbPage>
                            ) : (
                              <BreadcrumbLink href={item.href}>
                                {item.label}
                              </BreadcrumbLink>
                            )}
                          </BreadcrumbItem>
                          {!isLast && <BreadcrumbSeparator />}
                        </React.Fragment>
                      );
                    })}
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <span className="pr-3">
            <ModeToggle />
          </span>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default MainLayout;

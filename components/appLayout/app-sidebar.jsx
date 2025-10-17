"use client";

import { NavMain } from "@/components/appLayout/nav-main";
import { NavProjects } from "@/components/appLayout/nav-projects";
import { NavUser } from "@/components/appLayout/nav-user";
import { TeamSwitcher } from "@/components/appLayout/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { mainNavMenu } from "@/settings/NavMenuList";

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={mainNavMenu.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={mainNavMenu.navMain} />
        <NavProjects projects={mainNavMenu.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={mainNavMenu.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

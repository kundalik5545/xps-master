import {
  AudioWaveform,
  Blocks,
  BookOpen,
  Bot,
  Command,
  Database,
  Frame,
  HandHelping,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

//Main Nav Menu Items
export const mainNavMenu = {
  user: {
    name: "XPS",
    email: "user@xps.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "XPS Dashboard",
      logo: Blocks,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Basics",
      url: "/basics",
      icon: SquareTerminal,
      items: [
        {
          title: "Portals List",
          url: "/basics/portals",
        },
        {
          title: "Users List",
          url: "/basics/users",
        },
        {
          title: "Daily Work",
          url: "/basics/daily-work",
        },
      ],
    },
    {
      title: "XPS",
      url: "/xps",
      icon: Bot,
      items: [
        {
          title: "Menu",
          url: "/xps/menu",
        },
        {
          title: "Test Cases",
          url: "/xps/test-cases",
        },
        {
          title: "User Guide",
          url: "/xps/user-guide",
        },
      ],
    },
    {
      title: "eMember",
      url: "/emember",
      icon: BookOpen,
      items: [
        {
          title: "Menu",
          url: "/emember/menu",
        },
        {
          title: "Test Cases",
          url: "/emember/test-cases",
        },
        {
          title: "User Guide",
          url: "/emember/user-guide",
        },
      ],
    },
    {
      title: "Database",
      url: "/database",
      icon: Database,
      items: [
        {
          title: "XPS Tables",
          url: "/database/xps-tables",
        },
        {
          title: "eMember Tables",
          url: "/database/emember-tables",
        },
        {
          title: "Scripts",
          url: "/database/scripts",
        },
        {
          title: "Info",
          url: "/database/info",
        },
      ],
    },
    {
      title: "Helper",
      url: "/helper",
      icon: HandHelping,
      items: [
        {
          title: "Seed To XPS",
          url: "/helper/seed-to-xps",
        },
        {
          title: "Seed To eMember",
          url: "/helper/seed-to-emember",
        },
        {
          title: "Column Builder",
          url: "/helper/column-builder",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: Map,
    },
  ],
};

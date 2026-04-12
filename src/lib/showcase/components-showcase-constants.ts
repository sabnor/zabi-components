import {
    BarChart3,
    Bell,
    House,
    Package,
    PieChart,
    Settings,
} from "@lucide/svelte";

export const categories = [
    {
        id: "all",
        label: "All",
        description: "All component categories",
    },
    { id: "atoms", label: "Atoms", description: "Basic building blocks" },
    {
        id: "molecules",
        label: "Molecules",
        description: "Composite components",
    },
    {
        id: "organisms",
        label: "Organisms",
        description: "Complex components",
    },
];

export const sampleCode = `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`;

export const selectOptions = Array.from({ length: 16 }, (_, index) => ({
    value: `option-${index + 1}`,
    label: `Option ${index + 1}`,
}));

export const docsListItems = [
    {
        id: "profile",
        label: "Profile",
        description: "Manage your account preferences",
        href: "/profile",
    },
    {
        id: "billing",
        label: "Billing",
        description: "Update payment methods and invoices",
        href: "/billing",
    },
    {
        id: "team",
        label: "Team members",
        description: "Invite teammates and assign roles",
    },
    {
        id: "security",
        label: "Security settings",
        description: "Configure login and access policies",
        href: "/security",
        disabled: true,
    },
];

export const sidebarNavItems = [
    { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: House },
    { id: "revenue", label: "Revenue", href: "/revenue", icon: BarChart3 },
    {
        id: "notifications",
        label: "Notifications",
        href: "/notifications",
        icon: Bell,
        badgeCount: 2,
    },
    { id: "analytics", label: "Analytics", href: "/analytics", icon: PieChart },
    { id: "inventory", label: "Inventory", href: "/inventory", icon: Package },
    {
        id: "settings",
        label: "Settings",
        href: "/settings",
        icon: Settings,
        group: "secondary" as const,
    },
];

export const sidebarProjectItems = [
    {
        id: "proj-zabi-web",
        label: "Zabi Web App",
        description: "Production workspace",
        badgeText: "Active",
    },
    {
        id: "proj-design-system",
        label: "Design System",
        description: "Component library",
        badgeText: "New",
    },
    {
        id: "proj-marketing",
        label: "Marketing Site",
        description: "Landing and docs",
    },
    {
        id: "proj-analytics",
        label: "Analytics Dashboard",
        description: "Internal reports",
    },
];

export declare const categories: {
    id: string;
    label: string;
    description: string;
}[];
export declare const sampleCode = "function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('World'));";
export declare const selectOptions: {
    value: string;
    label: string;
}[];
export declare const docsListItems: ({
    id: string;
    label: string;
    description: string;
    href: string;
    disabled?: undefined;
} | {
    id: string;
    label: string;
    description: string;
    href?: undefined;
    disabled?: undefined;
} | {
    id: string;
    label: string;
    description: string;
    href: string;
    disabled: boolean;
})[];
export declare const sidebarNavItems: ({
    id: string;
    label: string;
    href: string;
    icon: import("svelte").Component<import("@lucide/svelte").IconProps, {}, "">;
    badgeCount?: undefined;
    group?: undefined;
} | {
    id: string;
    label: string;
    href: string;
    icon: import("svelte").Component<import("@lucide/svelte").IconProps, {}, "">;
    badgeCount: number;
    group?: undefined;
} | {
    id: string;
    label: string;
    href: string;
    icon: import("svelte").Component<import("@lucide/svelte").IconProps, {}, "">;
    group: "secondary";
    badgeCount?: undefined;
})[];
export declare const sidebarProjectItems: ({
    id: string;
    label: string;
    description: string;
    badgeText: string;
} | {
    id: string;
    label: string;
    description: string;
    badgeText?: undefined;
})[];
//# sourceMappingURL=components-showcase-constants.d.ts.map
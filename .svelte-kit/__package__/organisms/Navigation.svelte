<script lang="ts">
    import type { Component } from "svelte";

    interface NavigationItem {
        label: string;
        href: string;
        icon?: Component<any>; // Outline icon component
        iconFilled?: Component<any>; // Filled icon component (for active state)
    }

    interface Props {
        variant?: "header" | "sidebar";
        items?: NavigationItem[];
        currentPath?: string;
        onclick?: (event: Event) => void;
        className?: string;
    }

    let {
        variant = "header",
        items = [],
        currentPath = "",
        onclick,
        className = "",
        ...restProps
    }: Props & { children?: any } = $props();

    function handleClick(item: NavigationItem, event: MouseEvent) {
        event.preventDefault();
        if (onclick) {
            onclick(event as any);
        }
    }

    const ulClasses = $derived(() => {
        return variant === "sidebar"
            ? "flex flex-col gap-1"
            : "flex items-center justify-between gap-1";
    });

    function getNavItemClasses(itemHref: string): string {
        const baseClasses = "flex flex-col gap-1 grow h-full items-center justify-center min-h-0 min-w-0 relative shrink-0 cursor-pointer";

        return baseClasses;
    }

    function getIconContainerClasses(itemHref: string): string {
        const isActive = currentPath === itemHref;
        const baseClasses = "flex flex-col items-center justify-center overflow-clip relative rounded-[20px] shrink-0 transition-colors duration-200";

        if (isActive) {
            return `${baseClasses} bg-action-primary-subtle-hover`;
        }
        return `${baseClasses}`;
    }

    function getStateLayerClasses(): string {
        return "box-border flex gap-1 h-10 items-center px-4 py-2 relative shrink-0";
    }

    function getLabelClasses(itemHref: string): string {
        const isActive = currentPath === itemHref;
        const baseClasses = "font-medium leading-4 relative shrink-0 text-center text-nowrap tracking-[0.5px] whitespace-pre text-xs";

        if (isActive) {
            return `${baseClasses} text-link`;
        }
        return `${baseClasses} text-description`;
    }

    function getIconClasses(itemHref: string): string {
        const isActive = currentPath === itemHref;

        if (isActive) {
            return "text-link";
        }
        return "text-description";
    }
</script>

<ul class="{ulClasses()} {className}" {...restProps}>
    {#each items as item}
        {@const isActive = currentPath === item.href}
        {@const navItemClasses = getNavItemClasses(item.href)}
        {@const iconContainerClasses = getIconContainerClasses(item.href)}
        {@const labelClasses = getLabelClasses(item.href)}
        <li class={navItemClasses}>
            <a
                href={item.href}
                class={iconContainerClasses}
                onclick={(e) => handleClick(item, e)}
                role="button"
                aria-current={isActive ? "page" : undefined}
            >
                <div class={getStateLayerClasses()}>
                    {#if item.iconFilled && isActive}
                        {@const iconClasses = getIconClasses(item.href)}
                        {@const Icon = item.iconFilled}
                        <div class="overflow-clip relative shrink-0 size-4 {iconClasses}">
                            <Icon size={16} class="w-4 h-4" />
                        </div>
                    {:else if item.icon}
                        {@const iconClasses = getIconClasses(item.href)}
                        {@const Icon = item.icon}
                        <div class="overflow-clip relative shrink-0 size-4 {iconClasses}">
                            <Icon size={16} class="w-4 h-4" />
                        </div>
                    {/if}
                    <p class={labelClasses}>
                        {item.label}
                    </p>
                </div>
            </a>
        </li>
    {/each}
</ul>

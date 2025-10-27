<script lang="ts">
    interface Props {
        variant?: "header" | "sidebar";
        items?: Array<{
            label: string;
            href: string;
        }>;
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

    function handleClick(item: any, event: MouseEvent) {
        event.preventDefault();
        // Navigation is now handled by the parent component
        // through event forwarding
    }

    // Derived class for ul container based on variant
    const ulClasses = $derived(() => {
        return variant === "sidebar"
            ? "flex flex-col space-y-2"
            : "flex space-x-6";
    });

    // Function to get link classes based on active state
    function getLinkClasses(itemHref: string): string {
        const isActive = currentPath === itemHref;
        const baseClasses = "px-3 py-2 text-sm font-medium rounded-md";

        if (isActive) {
            return `${baseClasses} text-body font-semibold`;
        }
        return `${baseClasses} text-description hover:text-body`;
    }
</script>

<ul class="{ulClasses()} {className}" {...restProps}>
    {#each items as item}
        {@const linkClasses = getLinkClasses(item.href)}
        <li>
            <a
                href={item.href}
                class={linkClasses}
                onclick={(e) => handleClick(item, e)}
            >
                {item.label}
            </a>
        </li>
    {/each}
</ul>

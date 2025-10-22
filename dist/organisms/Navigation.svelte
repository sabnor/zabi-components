<script lang="ts">
    interface Props {
        variant?: "header" | "sidebar";
        items?: Array<{
            label: string;
            href: string;
        }>;
        currentPath?: string;
        onclick?: (event: Event) => void;
    }

    let {
        variant = "header",
        items = [],
        currentPath = "",
        children,
        ...restProps
    }: Props & { children?: any } = $props();

    function handleClick(item: any, event: MouseEvent) {
        event.preventDefault();
        // Navigation is now handled by the parent component
        // through event forwarding
    }
</script>

<nav class="navigation navigation-{variant}" {...restProps}>
    <ul
        class="flex {variant === 'sidebar'
            ? 'flex-col space-y-2'
            : 'space-x-6'}"
    >
        {#each items as item}
            <li>
                <a
                    href={item.href}
                    class="px-3 py-2 text-sm font-medium rounded-md transition-colors {currentPath ===
                    item.href
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}"
                    onclick={(e) => handleClick(item, e)}
                >
                    {item.label}
                </a>
            </li>
        {/each}
    </ul>
</nav>

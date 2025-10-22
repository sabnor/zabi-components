<script lang="ts">
    import ThemeToggle from "../atoms/ThemeToggle.svelte";

    interface Props {
        brand?: string;
        showThemeToggle?: boolean;
        className?: string;
        onclick?: (event: Event) => void;
    }

    let {
        brand = "",
        showThemeToggle = true,
        className = "",
        children,
        nav,
        actions,
        ...restProps
    }: Props & { children?: any; nav?: any; actions?: any } = $props();

    let isMenuOpen = $state(false);

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    function handleBrandClick() {
        // Brand click is now handled by the parent component
        // through event forwarding
    }
</script>

<nav
    class="bg-white border-b border-gray-200 sticky top-0 z-50 {className}"
    {...restProps}
>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
            <!-- Brand -->
            <div class="shrink-0">
                <button
                    type="button"
                    class="text-xl font-bold text-headline"
                    onclick={handleBrandClick}
                >
                    {brand}
                </button>
            </div>

            <!-- Desktop Navigation -->
            <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-4">
                    {@render nav?.()}
                </div>
            </div>

            <!-- Right side -->
            <div class="hidden md:block">
                <div class="ml-4 flex items-center space-x-4">
                    {@render actions?.()}
                    {#if showThemeToggle}
                        <ThemeToggle />
                    {/if}
                </div>
            </div>

            <!-- Mobile menu button -->
            <div class="md:hidden">
                <button
                    type="button"
                    class="text-description hover:text-body"
                    onclick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span class="text-2xl">☰</span>
                </button>
            </div>
        </div>

        <!-- Mobile menu -->
        {#if isMenuOpen}
            <div class="md:hidden">
                <div
                    class="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200"
                >
                    {@render nav?.()}
                    <div class="pt-4">
                        {@render actions?.()}
                        {#if showThemeToggle}
                            <div class="mt-2">
                                <ThemeToggle />
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        {/if}
    </div>
</nav>

<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import { fly, fade } from "svelte/transition";
    import ThemeToggle from "../atoms/ThemeToggle.svelte";

    export let brand: string | { text: string; href?: string; logo?: string } =
        "";
    export let variant: "default" | "transparent" | "solid" | "bordered" =
        "default";
    export let size: "sm" | "md" | "lg" = "md";
    export let position: "static" | "sticky" | "fixed" = "sticky";
    export let showThemeToggle: boolean = true;
    export let className: string = "";

    const dispatch = createEventDispatcher<{
        brandClick: { event: MouseEvent };
        menuToggle: { isOpen: boolean };
        linkClick: { href: string; event: MouseEvent };
    }>();

    let isMenuOpen = false;
    let isScrolled = false;
    let navbarElement: HTMLElement;

    // Size classes
    const sizeClasses = {
        sm: "py-2 px-4",
        md: "py-3 px-6",
        lg: "py-4 px-8",
    };

    // Variant classes
    const variantClasses = {
        default: "bg-surface border-b border-primary shadow-adaptive-sm",
        transparent: "bg-transparent",
        solid: "bg-surface shadow-adaptive-md",
        bordered: "bg-surface border border-primary shadow-adaptive-sm",
    };

    // Position classes
    const positionClasses = {
        static: "relative",
        sticky: "sticky top-0 z-40",
        fixed: "fixed top-0 left-0 right-0 z-40",
    };

    function handleBrandClick(event: MouseEvent) {
        dispatch("brandClick", { event });
    }

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        dispatch("menuToggle", { isOpen: isMenuOpen });
    }

    function handleLinkClick(href: string, event: MouseEvent) {
        dispatch("linkClick", { href, event });
    }

    function handleScroll() {
        isScrolled = window.scrollY > 10;
    }

    onMount(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    // Close menu on escape key
    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape" && isMenuOpen) {
            isMenuOpen = false;
            dispatch("menuToggle", { isOpen: false });
        }
    }

    // Close menu when clicking outside
    function handleClickOutside(event: MouseEvent) {
        if (
            isMenuOpen &&
            navbarElement &&
            !navbarElement.contains(event.target as Node)
        ) {
            isMenuOpen = false;
            dispatch("menuToggle", { isOpen: false });
        }
    }

    onMount(() => {
        document.addEventListener("keydown", handleKeydown);
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("keydown", handleKeydown);
            document.removeEventListener("click", handleClickOutside);
        };
    });
</script>

<nav
    bind:this={navbarElement}
    class="
        navbar
        {positionClasses[position]}
        {variantClasses[variant]}
        {isScrolled ? 'backdrop-blur-sm bg-surface/95' : ''}
        transition-all duration-200
        {className}
    "
    aria-label="Main navigation"
>
    <div class="max-w-7xl mx-auto">
        <div class="flex items-center justify-between {sizeClasses[size]}">
            <!-- Brand -->
            <div class="flex items-center">
                {#if brand}
                    {#if typeof brand === "string"}
                        <button
                            type="button"
                            class="text-xl font-bold text-primary hover:text-primary-hover transition-colors"
                            on:click={(e) =>
                                handleBrandClick(e as unknown as MouseEvent)}
                        >
                            {brand}
                        </button>
                    {:else}
                        <a
                            href={brand.href || "#"}
                            class="flex items-center space-x-2 text-xl font-bold text-primary hover:text-primary-hover transition-colors"
                            on:click={(e) =>
                                handleBrandClick(e as unknown as MouseEvent)}
                        >
                            {#if brand.logo}
                                <img
                                    src={brand.logo}
                                    alt={brand.text}
                                    class="h-8 w-8"
                                />
                            {/if}
                            <span>{brand.text}</span>
                        </a>
                    {/if}
                {/if}
            </div>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center space-x-8">
                <slot name="nav" />
            </div>

            <!-- Right side actions -->
            <div class="flex items-center space-x-4">
                <!-- Theme toggle -->
                {#if showThemeToggle}
                    <ThemeToggle size="md" variant="outline" />
                {/if}

                <!-- Right side slot -->
                <slot name="actions" />

                <!-- Mobile menu button -->
                <button
                    type="button"
                    class="md:hidden p-2 rounded-lg text-primary hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                    on:click={toggleMenu}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                    aria-label="Toggle navigation menu"
                >
                    <svg
                        class="w-6 h-6 text-text"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        {#if isMenuOpen}
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        {:else}
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        {/if}
                    </svg>
                </button>
            </div>
        </div>

        <!-- Mobile Navigation -->
        {#if isMenuOpen}
            <div
                id="mobile-menu"
                class="md:hidden border-t border-primary bg-surface"
                transition:fly={{ y: -20, duration: 200 }}
            >
                <div class="px-4 py-2 space-y-1">
                    <slot name="mobile-nav" />
                </div>
            </div>
        {/if}
    </div>
</nav>

<!-- Mobile menu overlay -->
{#if isMenuOpen}
    <div
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
        role="button"
        tabindex="0"
        on:click={() => (isMenuOpen = false)}
        on:keydown={(e) => {
            const event = e as unknown as KeyboardEvent;
            if (event.key === "Escape") {
                isMenuOpen = false;
            }
        }}
        aria-label="Close menu"
        transition:fade={{ duration: 200 }}
    ></div>
{/if}

<style>
    /* Smooth transitions */
    .navbar {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Mobile menu animations */
    .mobile-menu-enter {
        animation: mobile-menu-enter 0.2s ease-out;
    }

    .mobile-menu-exit {
        animation: mobile-menu-exit 0.15s ease-in;
    }

    @keyframes mobile-menu-enter {
        0% {
            opacity: 0;
            transform: translateY(-10px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes mobile-menu-exit {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-10px);
        }
    }

    /* Focus styles for accessibility */
    .navbar button:focus,
    .navbar a:focus {
        outline: 2px solid var(--color-primary-500);
        outline-offset: 2px;
    }

    /* Brand hover effects */
    .navbar-brand:hover {
        transform: translateY(-1px);
    }

    /* Mobile menu item styles */
    .mobile-menu-item {
        @apply block px-3 py-2 text-base font-medium text-primary hover:bg-surface-secondary rounded-lg transition-colors;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .navbar {
            padding-left: 1rem;
            padding-right: 1rem;
        }
    }
</style>

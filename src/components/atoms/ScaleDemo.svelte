<script lang="ts">
    import ThemeToggle from "./ThemeToggle.svelte";
</script>

<div class="min-h-screen bg-primary p-8">
    <div class="max-w-6xl mx-auto space-y-8">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-4xl font-bold text-primary mb-2">
                    Tailwind Scale Demo
                </h1>
                <p class="text-lg text-secondary">
                    Comprehensive scales supporting light and dark modes
                </p>
            </div>
            <ThemeToggle size="lg" variant="outline" />
        </div>

        <!-- Color Scales -->
        <section class="space-y-6">
            <h2 class="text-3xl font-semibold text-primary mb-4">
                Color Scales
            </h2>

            <!-- Primary Colors -->
            <div class="space-y-3">
                <h3 class="text-xl font-medium text-primary">Primary Scale</h3>
                <div class="grid grid-cols-11 gap-2">
                    {#each [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as shade}
                        <div class="text-center">
                            <div
                                class="w-16 h-16 rounded-lg bg-primary-{shade} border border-primary mb-2"
                            ></div>
                            <p class="text-xs text-tertiary">{shade}</p>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Secondary Colors -->
            <div class="space-y-3">
                <h3 class="text-xl font-medium text-primary">
                    Secondary Scale
                </h3>
                <div class="grid grid-cols-11 gap-2">
                    {#each [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as shade}
                        <div class="text-center">
                            <div
                                class="w-16 h-16 rounded-lg bg-secondary-{shade} border border-primary mb-2"
                            ></div>
                            <p class="text-xs text-tertiary">{shade}</p>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Neutral Colors -->
            <div class="space-y-3">
                <h3 class="text-xl font-medium text-primary">Neutral Scale</h3>
                <div class="grid grid-cols-11 gap-2">
                    {#each [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as shade}
                        <div class="text-center">
                            <div
                                class="w-16 h-16 rounded-lg bg-neutral-{shade} border border-primary mb-2"
                            ></div>
                            <p class="text-xs text-tertiary">{shade}</p>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Semantic Colors -->
            <div class="space-y-3">
                <h3 class="text-xl font-medium text-primary">
                    Semantic Colors
                </h3>
                <div class="grid grid-cols-3 gap-4">
                    <div class="space-y-2">
                        <h4 class="text-sm font-medium text-primary">
                            Success
                        </h4>
                        <div class="grid grid-cols-5 gap-1">
                            {#each [400, 500, 600, 700, 800] as shade}
                                <div
                                    class="w-8 h-8 rounded bg-success-{shade} border border-primary"
                                ></div>
                            {/each}
                        </div>
                    </div>
                    <div class="space-y-2">
                        <h4 class="text-sm font-medium text-primary">
                            Warning
                        </h4>
                        <div class="grid grid-cols-5 gap-1">
                            {#each [400, 500, 600, 700, 800] as shade}
                                <div
                                    class="w-8 h-8 rounded bg-warning-{shade} border border-primary"
                                ></div>
                            {/each}
                        </div>
                    </div>
                    <div class="space-y-2">
                        <h4 class="text-sm font-medium text-primary">Error</h4>
                        <div class="grid grid-cols-5 gap-1">
                            {#each [400, 500, 600, 700, 800] as shade}
                                <div
                                    class="w-8 h-8 rounded bg-error-{shade} border border-primary"
                                ></div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Background & Surface Colors -->
        <section class="space-y-6">
            <h2 class="text-3xl font-semibold text-primary mb-4">
                Background & Surface Colors
            </h2>

            <div class="grid grid-cols-2 gap-6">
                <div class="space-y-4">
                    <h3 class="text-xl font-medium text-primary">
                        Background Colors
                    </h3>
                    <div class="space-y-3">
                        <div
                            class="bg-primary p-4 rounded-lg border border-primary"
                        >
                            <p class="text-inverse font-medium">
                                Primary Background
                            </p>
                            <p class="text-inverse text-sm opacity-80">
                                bg-primary
                            </p>
                        </div>
                        <div
                            class="bg-secondary p-4 rounded-lg border border-primary"
                        >
                            <p class="text-primary font-medium">
                                Secondary Background
                            </p>
                            <p class="text-secondary text-sm">bg-secondary</p>
                        </div>
                        <div
                            class="bg-tertiary p-4 rounded-lg border border-primary"
                        >
                            <p class="text-primary font-medium">
                                Tertiary Background
                            </p>
                            <p class="text-secondary text-sm">bg-tertiary</p>
                        </div>
                    </div>
                </div>

                <div class="space-y-4">
                    <h3 class="text-xl font-medium text-primary">
                        Surface Colors
                    </h3>
                    <div class="space-y-3">
                        <div
                            class="bg-surface-primary p-4 rounded-lg border border-primary shadow-adaptive-sm"
                        >
                            <p class="text-primary font-medium">
                                Primary Surface
                            </p>
                            <p class="text-secondary text-sm">
                                bg-surface-primary
                            </p>
                        </div>
                        <div
                            class="bg-surface-secondary p-4 rounded-lg border border-primary shadow-adaptive-sm"
                        >
                            <p class="text-primary font-medium">
                                Secondary Surface
                            </p>
                            <p class="text-secondary text-sm">
                                bg-surface-secondary
                            </p>
                        </div>
                        <div
                            class="bg-surface-elevated p-4 rounded-lg border border-primary shadow-adaptive-md"
                        >
                            <p class="text-primary font-medium">
                                Elevated Surface
                            </p>
                            <p class="text-secondary text-sm">
                                bg-surface-elevated
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Typography Scale -->
        <section class="space-y-6">
            <h2 class="text-3xl font-semibold text-primary mb-4">
                Typography Scale
            </h2>

            <div class="space-y-4">
                {#each [{ size: "2xs", text: "Extra Small Text", class: "text-2xs" }, { size: "xs", text: "Small Text", class: "text-xs" }, { size: "sm", text: "Small Medium Text", class: "text-sm" }, { size: "base", text: "Base Text", class: "text-base" }, { size: "lg", text: "Large Text", class: "text-lg" }, { size: "xl", text: "Extra Large Text", class: "text-xl" }, { size: "2xl", text: "2X Large Text", class: "text-2xl" }, { size: "3xl", text: "3X Large Text", class: "text-3xl" }, { size: "4xl", text: "4X Large Text", class: "text-4xl" }, { size: "5xl", text: "5X Large Text", class: "text-5xl" }, { size: "6xl", text: "6X Large Text", class: "text-6xl" }] as item}
                    <div class="flex items-center space-x-4">
                        <span class="text-tertiary text-sm w-12"
                            >{item.size}</span
                        >
                        <span class="{item.class} text-primary"
                            >{item.text}</span
                        >
                    </div>
                {/each}
            </div>
        </section>

        <!-- Spacing Scale -->
        <section class="space-y-6">
            <h2 class="text-3xl font-semibold text-primary mb-4">
                Spacing Scale
            </h2>

            <div class="space-y-4">
                {#each [{ size: "1", value: "0.25rem", class: "w-1" }, { size: "2", value: "0.5rem", class: "w-2" }, { size: "4", value: "1rem", class: "w-4" }, { size: "8", value: "2rem", class: "w-8" }, { size: "16", value: "4rem", class: "w-16" }, { size: "32", value: "8rem", class: "w-32" }, { size: "64", value: "16rem", class: "w-64" }, { size: "128", value: "32rem", class: "w-128" }, { size: "256", value: "64rem", class: "w-256" }] as item}
                    <div class="flex items-center space-x-4">
                        <span class="text-tertiary text-sm w-12"
                            >{item.size}</span
                        >
                        <span class="text-secondary text-sm w-20"
                            >{item.value}</span
                        >
                        <div
                            class="{item.class} h-4 bg-primary-500 rounded"
                        ></div>
                    </div>
                {/each}
            </div>
        </section>

        <!-- Border Radius Scale -->
        <section class="space-y-6">
            <h2 class="text-3xl font-semibold text-primary mb-4">
                Border Radius Scale
            </h2>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                {#each [{ size: "none", class: "rounded-none" }, { size: "sm", class: "rounded-sm" }, { size: "DEFAULT", class: "rounded" }, { size: "md", class: "rounded-md" }, { size: "lg", class: "rounded-lg" }, { size: "xl", class: "rounded-xl" }, { size: "2xl", class: "rounded-2xl" }, { size: "3xl", class: "rounded-3xl" }, { size: "full", class: "rounded-full" }] as item}
                    <div class="text-center space-y-2">
                        <div
                            class="w-16 h-16 bg-primary-500 {item.class} mx-auto"
                        ></div>
                        <p class="text-xs text-tertiary">{item.size}</p>
                    </div>
                {/each}
            </div>
        </section>

        <!-- Shadow Scale -->
        <section class="space-y-6">
            <h2 class="text-3xl font-semibold text-primary mb-4">
                Shadow Scale
            </h2>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                {#each [{ name: "xs", class: "shadow-xs" }, { name: "sm", class: "shadow-sm" }, { name: "DEFAULT", class: "shadow" }, { name: "md", class: "shadow-md" }, { name: "lg", class: "shadow-lg" }, { name: "xl", class: "shadow-xl" }, { name: "2xl", class: "shadow-2xl" }, { name: "Adaptive", class: "shadow-adaptive-lg" }] as item}
                    <div class="text-center space-y-2">
                        <div
                            class="w-20 h-20 bg-surface-primary border border-primary {item.class} mx-auto"
                        ></div>
                        <p class="text-xs text-tertiary">{item.name}</p>
                    </div>
                {/each}
            </div>
        </section>

        <!-- Animation Scale -->
        <section class="space-y-6">
            <h2 class="text-3xl font-semibold text-primary mb-4">
                Animation Scale
            </h2>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                {#each [{ name: "Fade In", class: "animate-fade-in" }, { name: "Slide Up", class: "animate-slide-in-up" }, { name: "Slide Down", class: "animate-slide-in-down" }, { name: "Scale In", class: "animate-scale-in" }, { name: "Bounce", class: "animate-bounce-gentle" }, { name: "Pulse", class: "animate-pulse-slow" }] as item}
                    <div class="text-center space-y-2">
                        <div
                            class="w-16 h-16 bg-primary-500 rounded-lg {item.class} mx-auto"
                        ></div>
                        <p class="text-xs text-tertiary">{item.name}</p>
                    </div>
                {/each}
            </div>
        </section>

        <!-- Component Examples -->
        <section class="space-y-6">
            <h2 class="text-3xl font-semibold text-primary mb-4">
                Component Examples
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Cards -->
                <div class="space-y-4">
                    <h3 class="text-xl font-medium text-primary">Cards</h3>
                    <div class="space-y-3">
                        <div class="card p-4">
                            <h4 class="text-lg font-medium text-primary mb-2">
                                Standard Card
                            </h4>
                            <p class="text-secondary">
                                This is a standard card with adaptive styling.
                            </p>
                        </div>
                        <div class="card-elevated p-4">
                            <h4 class="text-lg font-medium text-primary mb-2">
                                Elevated Card
                            </h4>
                            <p class="text-secondary">
                                This is an elevated card with more shadow.
                            </p>
                        </div>
                    </div>
                </div>

                <!-- Buttons -->
                <div class="space-y-4">
                    <h3 class="text-xl font-medium text-primary">Buttons</h3>
                    <div class="space-y-3">
                        <button class="button-primary">Primary Button</button>
                        <button class="button-secondary"
                            >Secondary Button</button
                        >
                        <div class="flex space-x-2">
                            <button
                                class="px-3 py-1 text-sm rounded-md transition-colors"
                                style="background-color: rgb(var(--color-success)); color: rgb(var(--color-text-inverse));"
                            >
                                Success
                            </button>
                            <button
                                class="px-3 py-1 text-sm rounded-md transition-colors"
                                style="background-color: rgb(var(--color-warning)); color: rgb(var(--color-text-inverse));"
                            >
                                Warning
                            </button>
                            <button
                                class="px-3 py-1 text-sm rounded-md transition-colors"
                                style="background-color: rgb(var(--color-error)); color: rgb(var(--color-text-inverse));"
                            >
                                Error
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>

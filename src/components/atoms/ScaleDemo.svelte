<script lang="ts">
    import ThemeToggle from "./ThemeToggle.svelte";
</script>

<div class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-4xl mx-auto space-y-8">
        <!-- Header -->
        <div class="flex justify-between items-center mb-8">
            <div>
                <h1 class="text-4xl font-bold text-gray-900 mb-2">
                    Color Scale Demo
                </h1>
                <p class="text-lg text-gray-600">
                    Simple color scales for light and dark modes
                </p>
            </div>
            <ThemeToggle />
        </div>

        <!-- Basic Color Scales -->
        <section class="space-y-6">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">
                Basic Colors
            </h2>

            <!-- Gray Scale -->
            <div class="space-y-3">
                <h3 class="text-lg font-medium text-gray-700">Gray Scale</h3>
                <div class="grid grid-cols-11 gap-2">
                    {#each [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as shade}
                        <div class="text-center">
                            <div
                                class="w-16 h-16 rounded-lg bg-gray-{shade} border border-gray-300 mb-2"
                            ></div>
                            <p class="text-xs text-gray-600">{shade}</p>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Blue Scale -->
            <div class="space-y-3">
                <h3 class="text-lg font-medium text-gray-700">Blue Scale</h3>
                <div class="grid grid-cols-11 gap-2">
                    {#each [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as shade}
                        <div class="text-center">
                            <div
                                class="w-16 h-16 rounded-lg bg-blue-{shade} border border-gray-300 mb-2"
                            ></div>
                            <p class="text-xs text-gray-600">{shade}</p>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Green Scale -->
            <div class="space-y-3">
                <h3 class="text-lg font-medium text-gray-700">Green Scale</h3>
                <div class="grid grid-cols-11 gap-2">
                    {#each [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as shade}
                        <div class="text-center">
                            <div
                                class="w-16 h-16 rounded-lg bg-green-{shade} border border-gray-300 mb-2"
                            ></div>
                            <p class="text-xs text-gray-600">{shade}</p>
                        </div>
                    {/each}
                </div>
            </div>
        </section>
    </div>
</div>

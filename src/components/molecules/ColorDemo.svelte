<script lang="ts">
    // Demo component to showcase semantic colors
</script>

<section class="color-demo p-6 space-y-6">
    <h2 class="text-2xl font-bold text-text mb-6">
        Semantic Color System Demo
    </h2>

    <!-- Primary Colors -->
    <div class="space-y-2">
        <h3 class="text-lg font-semibold text-text">Primary Colors</h3>
        <div class="flex gap-2 flex-wrap">
            <div class="bg-primary text-text-inverse px-3 py-2 rounded">
                Primary
            </div>
            <div class="bg-primary-hover text-text-inverse px-3 py-2 rounded">
                Primary Hover
            </div>
            <div class="bg-primary-light text-primary px-3 py-2 rounded">
                Primary Light
            </div>
            <div class="bg-primary-dark text-text-inverse px-3 py-2 rounded">
                Primary Dark
            </div>
        </div>
    </div>

    <!-- Success Colors -->
    <div class="space-y-2">
        <h3 class="text-lg font-semibold text-text">Success Colors</h3>
        <div class="flex gap-2 flex-wrap">
            <div class="bg-success text-text-inverse px-3 py-2 rounded">
                Success
            </div>
            <div class="bg-success-surface text-success-text px-3 py-2 rounded">
                Success Surface
            </div>
        </div>
    </div>

    <!-- Error Colors -->
    <div class="space-y-2">
        <h3 class="text-lg font-semibold text-text">Error Colors</h3>
        <div class="flex gap-2 flex-wrap">
            <div class="bg-error text-text-inverse px-3 py-2 rounded">
                Error
            </div>
            <div class="bg-error-surface text-error-text px-3 py-2 rounded">
                Error Surface
            </div>
        </div>
    </div>

    <!-- Surface Colors -->
    <div class="space-y-2">
        <h3 class="text-lg font-semibold text-text">Surface Colors</h3>
        <div class="flex gap-2 flex-wrap">
            <div class="bg-surface border border-border px-3 py-2 rounded">
                Surface
            </div>
            <div
                class="bg-surface-secondary border border-border px-3 py-2 rounded"
            >
                Surface Secondary
            </div>
            <div
                class="bg-surface-elevated border border-border px-3 py-2 rounded"
            >
                Surface Elevated
            </div>
        </div>
    </div>

    <!-- Text Colors -->
    <div class="space-y-2">
        <h3 class="text-lg font-semibold text-text">Text Colors</h3>
        <div class="space-y-1">
            <p class="text-text">Primary Text</p>
            <p class="text-text-secondary">Secondary Text</p>
            <p class="text-text-tertiary">Tertiary Text</p>
            <p class="text-text-disabled">Disabled Text</p>
        </div>
    </div>

    <!-- Border Colors -->
    <div class="space-y-2">
        <h3 class="text-lg font-semibold text-text">Border Colors</h3>
        <div class="space-y-1">
            <div class="border border-border px-3 py-2 rounded">Border</div>
            <div class="border border-border-secondary px-3 py-2 rounded">
                Border Secondary
            </div>
            <div class="border border-border-focus px-3 py-2 rounded">
                Border Focus
            </div>
        </div>
    </div>
</section>

<style>
    .color-demo {
        @apply bg-background;
    }
</style>

<script lang="ts">
    import type { Snippet } from "svelte";
    import type { SizeVariant } from "../../types/variants.js";
    import Heading from "../atoms/Heading.svelte";

    interface Props {
        /** Section title */
        title?: string;
        /** Section description/subtitle */
        description?: string;
        /** Heading level for title (1-6) */
        headingLevel?: number;
        /** Section size variant */
        size?: SizeVariant;
        /** Maximum width of the section container */
        maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none";
        /** Background variant */
        background?: "default" | "muted" | "accent" | "transparent";
        /** Padding variant */
        padding?: "none" | "sm" | "md" | "lg" | "xl";
        /** Whether to center the content */
        centered?: boolean;
        /** Additional CSS classes */
        className?: string;
        /** Section content */
        children?: Snippet;
    }

    let {
        title = "",
        description = "",
        headingLevel = 2,
        size = "md",
        maxWidth = "xl",
        background = "default",
        padding = "lg",
        centered = false,
        className = "",
        children,
        ...restProps
    }: Props = $props();

    const sizeClasses = $derived(() => {
        switch (size) {
            case "sm":
                return "text-sm";
            case "lg":
                return "text-lg";
            default:
                return "text-base";
        }
    });

    const maxWidthClasses = $derived(() => {
        switch (maxWidth) {
            case "sm":
                return "max-w-screen-sm";
            case "md":
                return "max-w-screen-md";
            case "lg":
                return "max-w-screen-lg";
            case "xl":
                return "max-w-screen-xl";
            case "2xl":
                return "max-w-screen-2xl";
            case "full":
                return "max-w-full";
            case "none":
                return "";
            default:
                return "max-w-screen-xl";
        }
    });

    const backgroundClasses = $derived(() => {
        switch (background) {
            case "muted":
                return "bg-base-50";
            case "accent":
                return "bg-brand-50 dark:bg-brand-950";
            case "transparent":
                return "bg-transparent";
            default:
                return "bg-background";
        }
    });

    const paddingClasses = $derived(() => {
        switch (padding) {
            case "none":
                return "";
            case "sm":
                return "py-8 sm:py-12";
            case "md":
                return "py-12 sm:py-16";
            case "lg":
                return "py-16 sm:py-24";
            case "xl":
                return "py-24 sm:py-32";
            default:
                return "py-16 sm:py-24";
        }
    });

    const containerClasses = $derived(() => {
        const base = "w-full";
        const maxWidthClass = maxWidthClasses();
        const centeredClass = centered ? "mx-auto" : "";
        return `${base} ${maxWidthClass} ${centeredClass}`.trim();
    });

    const contentClasses = $derived(() => {
        const base = "px-4 sm:px-6 lg:px-8";
        const centeredClass = centered ? "text-center" : "";
        return `${base} ${centeredClass}`.trim();
    });
</script>

<section
    class="section {backgroundClasses()} {paddingClasses()} {className}"
    {...restProps}
>
    <div class={containerClasses()}>
        <div class={contentClasses()}>
            {#if title}
                <div class="mb-6 {centered ? 'mx-auto' : ''}">
                    <Heading level={headingLevel} text={title} />
                    {#if description}
                        <p
                            class="mt-4 {sizeClasses()} text-description {centered
                                ? 'mx-auto max-w-2xl'
                                : ''}"
                        >
                            {description}
                        </p>
                    {/if}
                </div>
            {/if}

            {#if children}
                <div class="section-content {centered ? 'mx-auto' : ''}">
                    {@render children()}
                </div>
            {/if}
        </div>
    </div>
</section>

<style>
    .section {
        position: relative;
        width: 100%;
    }

    .section-content {
        width: 100%;
    }
</style>

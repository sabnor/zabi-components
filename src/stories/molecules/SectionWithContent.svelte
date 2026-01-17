<script lang="ts">
    import Section from "../../components/molecules/Section.svelte";
    import Card from "../../components/atoms/Card.svelte";
    import Button from "../../components/atoms/Button.svelte";

    interface Props {
        title?: string;
        description?: string;
        headingLevel?: number;
        size?: "sm" | "md" | "lg";
        maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "none";
        background?: "default" | "muted" | "accent" | "transparent";
        padding?: "none" | "sm" | "md" | "lg" | "xl";
        centered?: boolean;
        variant?:
            | "default"
            | "centered"
            | "muted"
            | "accent"
            | "minimal"
            | "fullwidth"
            | "notitle";
    }

    let {
        title: titleProp = "",
        description: descriptionProp = "",
        headingLevel = 2,
        size = "md",
        maxWidth: maxWidthProp = "xl",
        background: backgroundProp = "default",
        padding: paddingProp = "lg",
        centered: centeredProp = false,
        variant = "default",
        ...restProps
    }: Props = $props();

    // Override props based on variant
    const title = $derived(variant === "notitle" ? "" : titleProp);
    const description = $derived(variant === "notitle" ? "" : descriptionProp);
    const maxWidth = $derived(() => {
        if (variant === "centered") return "2xl";
        if (variant === "muted") return "xl";
        if (variant === "minimal") return "lg";
        if (variant === "fullwidth") return "full";
        if (variant === "notitle") return "xl";
        return maxWidthProp;
    });
    const background = $derived(() => {
        if (variant === "muted") return "muted";
        if (variant === "accent") return "accent";
        if (variant === "fullwidth") return "muted";
        return backgroundProp;
    });
    const padding = $derived(() => {
        if (variant === "minimal") return "sm";
        return paddingProp;
    });
    const centered = $derived(() => {
        if (variant === "centered" || variant === "accent") return true;
        return centeredProp;
    });
</script>

<Section
    {title}
    {description}
    {headingLevel}
    {size}
    {maxWidth}
    {background}
    {padding}
    {centered}
    {...restProps}
>
    {#if variant === "default" || variant === "muted" || variant === "notitle"}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="Feature 1" description="First feature description" />
            <Card title="Feature 2" description="Second feature description" />
            <Card title="Feature 3" description="Third feature description" />
        </div>
    {:else if variant === "centered" || variant === "accent"}
        <div class="flex flex-col gap-4 items-center">
            <p class="text-description">Centered content goes here.</p>
            <Button variant="primary" text="Get Started" />
        </div>
    {:else if variant === "minimal"}
        <div class="space-y-4">
            <p class="text-description">Content with minimal padding.</p>
        </div>
    {:else if variant === "fullwidth"}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card title="Card 1" description="Description 1" />
            <Card title="Card 2" description="Description 2" />
            <Card title="Card 3" description="Description 3" />
            <Card title="Card 4" description="Description 4" />
        </div>
    {/if}
</Section>

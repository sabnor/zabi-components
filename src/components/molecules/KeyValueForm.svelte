<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Toggle from "../atoms/Toggle.svelte";
    import {
        Input,
        Textarea,
        Checkbox,
        Select,
        ColorPicker,
        TextAlignment,
    } from "../atoms";

    export let values: Record<string, any> = {};
    export let fields: Array<{
        key: string;
        type:
            | "text"
            | "email"
            | "password"
            | "number"
            | "textarea"
            | "select"
            | "checkbox"
            | "toggle"
            | "colorpicker"
            | "textalignment";
        label: string;
        placeholder?: string;
        required?: boolean;
        options?: Array<{
            value: string | number;
            label: string;
            disabled?: boolean;
        }>;
        rows?: number;
        flex?: "1" | "full";
    }> = [];

    const dispatch = createEventDispatcher<{
        input: { [key: string]: any };
        change: { values: Record<string, any> };
    }>();

    function updateField(key: string, value: any) {
        values = { ...values, [key]: value };
        dispatch("input", { [key]: value });
        dispatch("change", { values });
    }

    function handleInput(event: CustomEvent) {
        // Forward input events from child components
        dispatch("input", event.detail);
    }

    function handleChange(event: CustomEvent) {
        // Forward change events from child components
        dispatch("change", event.detail);
    }
</script>

<div class="flex flex-wrap gap-4">
    {#each fields as field (field.key)}
        <div
            class="flex-{field.flex === 'full'
                ? 'none'
                : field.flex || '1'} {field.type === 'textarea' ||
            field.key === 'title' ||
            field.key === 'subtitle' ||
            field.flex === 'full'
                ? 'w-full'
                : 'w-full sm:w-auto sm:flex-1'} min-w-0 {field.type === 'toggle'
                ? 'flex items-center justify-center'
                : ''}"
        >
            {#if field.type === "textarea"}
                <Textarea
                    bind:value={values[field.key]}
                    label={field.label}
                    placeholder={field.placeholder}
                    rows={field.rows || 3}
                    required={field.required}
                    size="sm"
                    variant="outlined"
                    on:input={handleInput}
                    on:change={handleChange}
                />
            {:else if field.type === "select"}
                <Select
                    bind:value={values[field.key]}
                    options={field.options || []}
                    label={field.label}
                    placeholder={field.placeholder}
                    required={field.required}
                    size="sm"
                    variant="outlined"
                    on:input={handleInput}
                    on:change={handleChange}
                />
            {:else if field.type === "checkbox"}
                <Checkbox
                    bind:checked={values[field.key]}
                    label={field.label}
                    required={field.required}
                    size="sm"
                    variant="outlined"
                    on:input={handleInput}
                    on:change={handleChange}
                />
            {:else if field.type === "toggle"}
                <Toggle
                    bind:checked={values[field.key]}
                    label={field.label}
                    on:input={handleInput}
                    on:change={handleChange}
                />
            {:else if field.type === "colorpicker"}
                <ColorPicker
                    bind:value={values[field.key]}
                    label={field.label}
                    required={field.required}
                    size="sm"
                    variant="outlined"
                    on:input={handleInput}
                    on:change={handleChange}
                />
            {:else if field.type === "textalignment"}
                <TextAlignment
                    bind:value={values[field.key]}
                    label={field.label}
                    required={field.required}
                    size="sm"
                    on:input={handleInput}
                    on:change={handleChange}
                />
            {:else}
                <Input
                    bind:value={values[field.key]}
                    type={field.type || "text"}
                    label={field.label}
                    placeholder={field.placeholder}
                    required={field.required}
                    size="sm"
                    variant="outlined"
                    on:input={handleInput}
                    on:change={handleChange}
                />
            {/if}
        </div>
    {/each}
</div>

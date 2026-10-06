<script lang="ts">
    import Select from "../../src/components/atoms/Select.svelte";

    /** Selects in one form, for the validity and reset tests of tests/select-handover.test.ts. */
    interface Props {
        /** A plain required input before the Selects, which is then the form's first invalid control. */
        inputFirst?: boolean;
        onreport?: (which: string, value: unknown) => void;
    }

    let { inputFirst = false, onreport }: Props = $props();

    const options = [
        { value: "a", label: "Alfa" },
        { value: "b", label: "Beta" },
        { value: "c", label: "Gamma" },
    ];

    let first = $state<string | number | undefined>();
    let second = $state<string | number | undefined>();
    let preset = $state<string | number | undefined>("b");
    let native = $state<string | number | undefined>("a");

    const report = (which: string) => (event: Event) => onreport?.(which, (event.target as HTMLSelectElement).value);
</script>

<form data-testid="form">
    {#if inputFirst}
        <input aria-label="Name" name="name" required />
    {/if}
    <Select label="First" name="first" required {options} searchable={false} bind:value={first} onchange={report("first")} />
    <Select label="Second" name="second" required {options} searchable={false} bind:value={second} onchange={report("second")} />
    <Select label="Preset" name="preset" {options} searchable={false} bind:value={preset} onchange={report("preset")} />
    <Select
        label="Native"
        name="native"
        presentation="native"
        {options}
        bind:value={native}
        onchange={report("native")}
    />
    <button type="reset">Reset</button>
</form>

<output data-testid="state">{JSON.stringify({ first: first ?? null, second: second ?? null, preset: preset ?? null, native: native ?? null })}</output>
<button type="button" onclick={() => ((first = "c"), (preset = "c"), (native = "c"))}>Set c</button>

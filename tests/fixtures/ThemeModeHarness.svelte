<script lang="ts">
    import ThemeToggle from "../../src/components/atoms/ThemeToggle.svelte";
    import SegmentedControl from "../../src/components/molecules/SegmentedControl.svelte";
    import { getThemeMode, setThemeMode, type ThemeMode } from "../../src/components/util/theme-mode.js";

    /**
     * The documented pattern: the app's own three-option control and a
     * ThemeToggle on one page, each going through the same helpers.
     */
    interface Props {
        modes?: "two" | "three";
        storageKey?: string | null;
        initial?: ThemeMode;
        onmodechange?: (mode: ThemeMode) => void;
    }

    let { modes = "three", storageKey = "theme", initial, onmodechange }: Props = $props();

    let mode = $state<ThemeMode | undefined>(initial);
    let picked = $state<string>(getThemeMode());

    const options = [
        { value: "auto", label: "System" },
        { value: "light", label: "Light" },
        { value: "dark", label: "Dark" },
    ];
</script>

<ThemeToggle {modes} {storageKey} bind:mode {onmodechange} />
<output data-testid="bound">{mode ?? "unset"}</output>

<button type="button" data-testid="assign-dark" onclick={() => (mode = "dark")}>Assign dark</button>
<button type="button" data-testid="assign-auto" onclick={() => (mode = "auto")}>Assign auto</button>

<SegmentedControl
    label="Theme"
    {options}
    value={mode ?? picked}
    onchange={(value: string) => {
        picked = value;
        setThemeMode(value as ThemeMode, { storageKey });
    }}
/>

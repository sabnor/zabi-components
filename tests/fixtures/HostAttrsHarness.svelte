<script lang="ts">
    // Type check as much as render: an app passes these exactly so (G3, G4).
    import Alert from "../../src/components/molecules/Alert.svelte";
    import SegmentedControl from "../../src/components/molecules/SegmentedControl.svelte";
    import type { SegmentedControlOption } from "../../src/components/util/segmented-control.js";

    const options: SegmentedControlOption[] = [
        { value: "light", label: "Light", attrs: { "data-testid": "theme-light", id: "theme-light" } },
        { value: "dark", label: "Dark", attrs: { "data-testid": "theme-dark", "aria-describedby": "theme-hint" } },
    ];
    let value = $state("light");
</script>

<p id="theme-hint">Hint</p>
<Alert variant="warning" title="Offline" data-testid="offline" id="offline-alert" aria-live="assertive" />
<SegmentedControl label="Theme" {options} bind:value />

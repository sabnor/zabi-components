<script lang="ts">
    import Button from "../../../components/atoms/Button.svelte";
    import Input from "../../../components/atoms/Input.svelte";
    import BottomSheet from "../../../components/molecules/BottomSheet.svelte";
    import type { BottomSheetSnap } from "../../../components/util/bottom-sheet.js";
    import type { DemoRendererProps } from "./types";

    let { exampleIndex }: DemoRendererProps = $props();

    /** Long enough to scroll inside the sheet at either height. */
    const teams = Array.from({ length: 30 }, (_, index) => `Team ${index + 1}`);

    let open = $state(false);
    let snap = $state<BottomSheetSnap>("half");
    let chosen = $state("Team 1");
    let lastClose = $state("none yet");

    let formOpen = $state(false);
    let teamName = $state("");
    let savedName = $state("none yet");

    function choose(team: string) {
        chosen = team;
    }

    function saveName() {
        savedName = teamName || "none yet";
        formOpen = false;
    }
</script>

{#if exampleIndex === 0}
    <div class="w-full space-y-3">
        <Button onclick={() => (open = true)} data-testid="bottom-sheet-demo-open">
            Choose a team
        </Button>
        <p class="text-sm text-description" data-testid="bottom-sheet-demo-state">
            Chosen: {chosen}. Snap: {snap}. Last close: {lastClose}.
        </p>
        <BottomSheet
            bind:isOpen={open}
            bind:snap
            title="Choose a team"
            description="The grip drags the sheet, or press it to change its height."
            onclose={({ reason }) => (lastClose = reason)}
            data-testid="bottom-sheet-demo"
        >
            <ul class="m-0 list-none space-y-[8px] p-0">
                {#each teams as team (team)}
                    <li>
                        <Button
                            variant={team === chosen ? "secondary" : "ghost"}
                            fullWidth
                            size="lg"
                            aria-pressed={team === chosen}
                            onclick={() => choose(team)}
                        >
                            {team}
                        </Button>
                    </li>
                {/each}
            </ul>
            {#snippet footer()}
                <Button size="lg" onclick={() => (open = false)}>Done</Button>
            {/snippet}
        </BottomSheet>
    </div>
{:else}
    <div class="w-full space-y-3">
        <Button onclick={() => (formOpen = true)} data-testid="bottom-sheet-demo-form-open">
            Rename team
        </Button>
        <p class="text-sm text-description" data-testid="bottom-sheet-demo-form-state">
            Saved name: {savedName}
        </p>
        <BottomSheet
            bind:isOpen={formOpen}
            title="Rename team"
            snapPoints={["half"]}
            initialFocus="#bottom-sheet-demo-name"
            closeLabel="Cancel"
            data-testid="bottom-sheet-demo-form"
        >
            <Input id="bottom-sheet-demo-name" label="Team name" bind:value={teamName} />
            {#snippet footer()}
                <Button variant="ghost" size="lg" onclick={() => (formOpen = false)}>Cancel</Button>
                <Button size="lg" onclick={saveName}>Save</Button>
            {/snippet}
        </BottomSheet>
    </div>
{/if}

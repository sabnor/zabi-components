<script lang="ts">
    import Avatar from "../../../components/atoms/Avatar.svelte";
    import AvatarGroup from "../../../components/molecules/AvatarGroup.svelte";
    import { samplePhoto } from "../../../lib/showcase/sample-photos";
    import type { DemoRendererProps } from "./types";

    /** Renders the examples of both Avatar and AvatarGroup; `group` says which. */
    let { exampleIndex, group = false }: DemoRendererProps & { group?: boolean } = $props();

    const picture = samplePhoto(3).src;
    const people = [
        { name: "Ada Lovelace", src: picture },
        { name: "Grace Hopper" },
        { name: "Alan Turing" },
        { name: "Edsger Dijkstra" },
        { name: "Barbara Liskov" },
        { name: "Donald Knuth" },
        { name: "Tim Berners-Lee" },
    ];
</script>

{#if group}
    {#if exampleIndex === 0}
        <AvatarGroup {people} label="Who's going" />
    {:else if exampleIndex === 1}
        <div class="space-y-3">
            <AvatarGroup {people} size="sm" max={3} label="Members, small" />
            <AvatarGroup people={people.slice(0, 5)} label="Members: five, all shown" />
            <AvatarGroup {people} size="lg" max={5} label="Members, large" />
        </div>
    {:else}
        <!-- On the page surface, not a card: the ring is told which colour is under it. -->
        <div class="rounded-container bg-surface-base p-4">
            <AvatarGroup
                {people}
                label="Who is coming"
                strings={{ more: (count) => `plus ${count} others` }}
                style="--zabi-avatar-ring: var(--color-surface-base)"
            />
        </div>
    {/if}
{:else if exampleIndex === 0}
    <div class="flex items-center gap-3">
        <Avatar name="Ada Lovelace" src={picture} />
        <Avatar name="Grace Hopper" />
        <Avatar name="Plato" />
    </div>
{:else if exampleIndex === 1}
    <div class="flex items-center gap-3">
        <Avatar name="Ada Lovelace" size="sm" />
        <Avatar name="Ada Lovelace" size="md" />
        <Avatar name="Ada Lovelace" size="lg" />
    </div>
{:else}
    <div class="flex items-center gap-3">
        <!-- A picture that does not load, a name that is empty, and a name printed beside its avatar. -->
        <Avatar name="Alan Turing" src="/media/missing.jpg" />
        <Avatar name="" alt="Unknown member" />
        <span class="flex items-center gap-2 text-sm text-body">
            <Avatar name="Barbara Liskov" alt="" size="sm" />
            Barbara Liskov
        </span>
    </div>
{/if}

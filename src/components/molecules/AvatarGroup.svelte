<script lang="ts">
    import { mergeStrings } from "../util/ready-made-strings.js";
    import { zabiStringsFor } from "../util/zabi-strings.js";
    import type { HTMLAttributes } from "svelte/elements";
    import Avatar from "../atoms/Avatar.svelte";
    import {
        DEFAULT_AVATAR_GROUP_STRINGS,
        splitGroup,
        type AvatarGroupStrings,
        type AvatarPerson,
        type AvatarSize,
    } from "../util/avatar.js";
    import { cn } from "../util/cn.js";

    /**
     * A row of overlapping avatars: who is going, the members, who rated.
     *
     * It is a list, each avatar named by its person. Past `max` the rest
     * stand behind a "+3" of the same size and shape. Not interactive.
     *
     * Between two avatars is a ring in the colour of the surface under the
     * group. It cannot read that colour, so it is the raised surface (a
     * card) unless the group is told otherwise:
     *
     * ```svelte
     * <AvatarGroup {people} style="--zabi-avatar-ring: var(--color-surface-base)" />
     * ```
     *
     * Other attributes (`id`, `data-*`, `style`, ...) land on the list.
     */
    type Props = Omit<HTMLAttributes<HTMLUListElement>, "class" | "aria-label"> & {
        /** The people, in the order they are shown. */
        people: AvatarPerson[];
        /**
         * How many are shown before the rest become "+N". Below 1 is 1. One
         * person too many is shown and not counted: there is no "+1".
         */
        max?: number;
        /** Diameter of each avatar: 24, 32 and 48px at the default text size. */
        size?: "sm" | "md" | "lg";
        /**
         * `fixed` keeps the avatars, their overlap and the "+N" in px.
         * `text` sets them in rem, so the row grows with the text; passed to
         * each Avatar. Default `fixed`.
         */
        scale?: "fixed" | "text";
        /** Accessible name of the list ("Who's going"). */
        label?: string;
        /** Overrides for the built-in strings. */
        strings?: Partial<AvatarGroupStrings>;
        /** The language the initials are worked out in; passed to each Avatar. Without it, the page's. */
        locale?: string;
        /** Extra classes for the list. */
        class?: string;
    };

    let {
        people,
        max = 4,
        size = "md",
        scale = "fixed",
        label,
        strings,
        locale,
        class: className = "",
        ...restProps
    }: Props = $props();

    /** The app-wide words for this component, from a `ZabiStringsProvider` above it, if there is one. */
    const provided = zabiStringsFor("avatarGroup");
    const text = $derived(mergeStrings(DEFAULT_AVATAR_GROUP_STRINGS, provided(), strings));
    const split = $derived(splitGroup(people.length, max));
    const shown = $derived(people.slice(0, split.shown));
    const hiddenNames = $derived(people.slice(split.shown).map((person) => person.name));

    // A quarter of the circle lies under the next one.
    const OVERLAP: Record<AvatarSize, string> = {
        sm: "-ms-[6px]",
        md: "-ms-[8px]",
        lg: "-ms-[12px]",
    };
    const CHIP: Record<AvatarSize, string> = {
        sm: "size-[24px] text-[10px]",
        md: "size-[32px] text-[12px]",
        lg: "size-[48px] text-[16px]",
    };
    // With `scale="text"` the same, in rem, as Avatar's.
    const TEXT_OVERLAP: Record<AvatarSize, string> = {
        sm: "-ms-[0.375rem]",
        md: "-ms-[0.5rem]",
        lg: "-ms-[0.75rem]",
    };
    const TEXT_CHIP: Record<AvatarSize, string> = {
        sm: "size-[1.5rem] text-[0.625rem]",
        md: "size-[2rem] text-[0.75rem]",
        lg: "size-[3rem] text-[1rem]",
    };
    const overlap = $derived(scale === "text" ? TEXT_OVERLAP : OVERLAP);
    const chip = $derived(scale === "text" ? TEXT_CHIP : CHIP);

    /** The ring that parts one circle from the next. A shadow, so it takes no room; forced colours draw the avatars' own borders instead. */
    const ring = "rounded-pill shadow-[0_0_0_2px_var(--zabi-avatar-ring,var(--color-surface-raised))]";
</script>

<!-- `role`, because a list without bullets loses its role in Safari. -->
<ul
    class={cn("m-0 flex list-none items-center p-0", className)}
    role="list"
    aria-label={label || undefined}
    data-avatar-group
    data-size={size}
    data-scale={scale}
    {...restProps}
>
    {#each shown as person, index (index)}
        <li class={cn("flex", index > 0 && (overlap[size] ?? overlap.md))}>
            <Avatar name={person.name} src={person.src} children={person.picture} {size} {scale} {locale} class={ring} />
        </li>
    {/each}
    {#if split.hidden > 0}
        <li class={cn("flex", overlap[size] ?? overlap.md)}>
            <!-- The same circle as an avatar, in the neutral pair: it is a count, not a person. -->
            <span
                class={cn(
                    "inline-flex shrink-0 items-center justify-center border border-transparent bg-neutral-subtle leading-none font-semibold text-neutral-text tabular-nums select-none",
                    chip[size] ?? chip.md,
                    ring,
                )}
                role="img"
                aria-label={text.more(split.hidden, hiddenNames)}
                data-avatar-more
            >
                <span aria-hidden="true">+{split.hidden}</span>
            </span>
        </li>
    {/if}
</ul>

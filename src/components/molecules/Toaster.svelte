<script lang="ts">
    import ToasterToast from './ToasterToast.svelte';
    import { toastStore } from './toast-store.js';
    import { cn } from "../util/cn.js";
    import type { HTMLAttributes } from "svelte/elements";

    /**
     * The stack of toasts, fixed to the bottom of the screen: in the corner
     * from 640px up, across the width with 16px on each side below that.
     *
     * It keeps clear of what is at the bottom of a phone screen. The home
     * indicator and a notch at the side are read from the safe-area insets
     * (the page has to ask for them with `viewport-fit=cover`). Inside an
     * `AppShell` the stack sits above the shell's tab bar, which the shell
     * reports in `--app-shell-bottom-inset`. For anything else fixed to the
     * bottom (a `BottomTabBar` on its own, a `StickyActionBar`, a
     * `FloatingActionButton`), say how tall it is with
     * `--toaster-bottom-offset` on the Toaster or any ancestor:
     *
     * ```svelte
     * <Toaster style="--toaster-bottom-offset: calc(4rem + 1px)" />
     * ```
     */
    type Props = Omit<HTMLAttributes<HTMLDivElement>, "class" | "role" | "aria-label"> & {
        class?: string;
    };

    let { class: className = '', ...restProps }: Props = $props();

    /**
     * One utility per property, so a class from the caller still replaces it
     * at every width; what differs below 640px is carried by the three
     * variables. From 640px up this is what it always was: 1rem from the
     * bottom and the right, 24rem wide, 1rem of padding.
     */
    const placement = [
        "[--toaster-edge:0px] sm:[--toaster-edge:1rem]",
        "[--toaster-width:100vw] sm:[--toaster-width:24rem]",
        // In px below 640px: a gutter that grew with the text would take the room the text needs.
        "[--toaster-padding:16px] sm:[--toaster-padding:1rem]",
        "bottom-[calc(max(var(--app-shell-bottom-inset,0px),env(safe-area-inset-bottom,0px))_+_var(--toaster-bottom-offset,0px)_+_var(--toaster-edge))]",
        "right-[calc(env(safe-area-inset-right,0px)_+_var(--toaster-edge))]",
        "w-[min(var(--toaster-width),calc(100vw_-_env(safe-area-inset-left,0px)_-_env(safe-area-inset-right,0px)_-_2_*_var(--toaster-edge)))]",
        "p-(--toaster-padding)",
    ].join(" ");

    let region = $state<HTMLDivElement>();

    /** What had focus before it entered the region; where it goes back to. */
    let cameFrom: HTMLElement | null = null;

    function handleFocusIn(event: FocusEvent) {
        const from = event.relatedTarget;
        if (from instanceof HTMLElement && !region?.contains(from)) cameFrom = from;
    }

    /**
     * Dismissing the toast that holds focus (its action, or Dismiss) removes
     * the focused control, and the browser would drop focus on `<body>`. It
     * goes to the neighbouring toast instead, or back to where it came from.
     * Which toast held focus has to be read before the list is re-rendered.
     */
    let shownIds: string[] = [];
    let focusAfterDismiss: { neighbours: string[] } | null = null;

    $effect.pre(() => {
        const ids = $toastStore.map((toast) => toast.id);
        const holder = region
            ? (document.activeElement?.closest<HTMLElement>('[data-toast-id]') ?? null)
            : null;
        const held = holder && region?.contains(holder) ? holder.dataset.toastId : undefined;
        if (held !== undefined && !ids.includes(held)) {
            const at = shownIds.indexOf(held);
            // The next toast first, then the ones before it, nearest first.
            focusAfterDismiss = {
                neighbours: [...shownIds.slice(at + 1), ...shownIds.slice(0, at).reverse()],
            };
        }
        shownIds = ids;
    });

    $effect(() => {
        void $toastStore;
        const pending = focusAfterDismiss;
        focusAfterDismiss = null;
        if (!pending || !region) return;
        // Something else took focus in the meantime (the action opened a dialog): leave it.
        const active = document.activeElement;
        if (active && active !== document.body && !region.contains(active)) return;

        const toasts = [...region.querySelectorAll<HTMLElement>('[data-toast-id]')];
        for (const id of pending.neighbours) {
            const next = toasts
                .find((toast) => toast.dataset.toastId === id)
                ?.querySelector<HTMLElement>('button');
            if (next) {
                next.focus();
                return;
            }
        }
        if (cameFrom?.isConnected) cameFrom.focus();
    });
</script>

<div
    {...restProps}
    class={cn("pointer-events-none fixed z-toast flex min-w-0 flex-col gap-2", placement, className)}
    role="region"
    aria-label="Notifications"
    data-zabi-toaster
    bind:this={region}
    onfocusin={handleFocusIn}
>
    <!-- Each toast owns its role="status"/"alert"; a region-level aria-live would announce twice. -->
    {#each $toastStore as toast (toast.id)}
        <ToasterToast {toast} />
    {/each}
</div>

declare module '*.svelte' {
    import type { ComponentType, SvelteComponent } from 'svelte';
    const component: ComponentType<SvelteComponent>;
    export default component;
}

// Svelte 5 types
declare global {
    function $props<T = any>(): T;
    function $state<T = any>(initial?: T): T;
    function $derived<T>(fn: () => T): T;
    function $effect(fn: () => void | (() => void)): void;

    namespace svelteHTML {
        interface HTMLAttributes<T> {
            [key: string]: any;
        }
        interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}

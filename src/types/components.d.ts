/// <reference types="svelte" />

declare module '*.svelte' {
    import type { ComponentType } from 'svelte';
    const component: ComponentType;
    export default component;
}

declare namespace svelteHTML {
    interface HTMLAttributes<T> {
        'on:click'?: (event: CustomEvent<any> & { target: EventTarget & T }) => void;
        'on:login'?: (event: CustomEvent<any>) => void;
        'on:logout'?: (event: CustomEvent<any>) => void;
        'on:createAccount'?: (event: CustomEvent<any>) => void;
    }
} 
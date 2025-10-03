/// <reference types="svelte" />

declare module '*.svelte' {
    import type { ComponentType } from 'svelte';
    const component: ComponentType;
    export default component;
}

declare namespace svelteHTML {
    interface HTMLAttributes<T> {
        'on:click'?: (event: CustomEvent<any> & { target: EventTarget & T }) => void;
        'on:input'?: (event: CustomEvent<any> & { target: EventTarget & T }) => void;
        'on:change'?: (event: CustomEvent<any> & { target: EventTarget & T }) => void;
        'on:focus'?: (event: CustomEvent<any> & { target: EventTarget & T }) => void;
        'on:blur'?: (event: CustomEvent<any> & { target: EventTarget & T }) => void;
        'on:keydown'?: (event: CustomEvent<any> & { target: EventTarget & T }) => void;
        'on:keyup'?: (event: CustomEvent<any> & { target: EventTarget & T }) => void;
        'on:close'?: (event: CustomEvent<any> & { target: EventTarget & T }) => void;
        'on:clear'?: (event: CustomEvent<any> & { target: EventTarget & T }) => void;
        'on:upload'?: (event: CustomEvent<any> & { target: EventTarget & T }) => void;
        'on:login'?: (event: CustomEvent<any>) => void;
        'on:logout'?: (event: CustomEvent<any>) => void;
        'on:createAccount'?: (event: CustomEvent<any>) => void;
    }
} 
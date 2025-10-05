// Svelte 5 compatibility types for zabi-components
// This ensures proper TypeScript support for Svelte 5 features

declare module 'svelte' {
    export interface ComponentEvents<T> {
        [key: string]: any;
    }

    export interface ComponentProps<T> {
        [key: string]: any;
    }
}

// Enhanced event types for Svelte 5
export interface Svelte5EventDetail {
    event: Event;
    value?: any;
    field?: string;
    checked?: boolean;
}

// Component event maps for better TypeScript inference
export interface ComponentEventMap {
    click: Svelte5EventDetail;
    input: Svelte5EventDetail;
    change: Svelte5EventDetail;
    focus: Svelte5EventDetail;
    blur: Svelte5EventDetail;
    keydown: Svelte5EventDetail;
    keyup: Svelte5EventDetail;
    submit: Svelte5EventDetail;
    reset: Svelte5EventDetail;
}

// Generic component type for better type safety
export type ZabiComponent<T = any> = {
    new(...args: any[]): {
        $set(props: Partial<T>): void;
        $destroy(): void;
        $on(event: string, handler: (event: CustomEvent) => void): () => void;
    };
};

// Event handler types
export type EventHandler<T = any> = (event: CustomEvent<T>) => void;

// Props type for components
export type ComponentProps<T = any> = T & {
    class?: string;
    className?: string;
    style?: string;
    [key: string]: any;
};

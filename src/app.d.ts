// App-wide type definitions for SvelteKit

/** Injected by Vite's `define` from package.json's version field. */
declare const __PKG_VERSION__: string;
/** The site's generated brands; see vite-plugin-brand-themes.js. */
declare module 'virtual:zabi-brand-themes' {
    import type { CreateThemeOptions, CreateThemeResult } from '../create-theme/index';
    import type { GeneratedBrand } from '$lib/marketing/brand-inputs';

    const themes: Record<GeneratedBrand, CreateThemeResult & { options: CreateThemeOptions }>;
    export default themes;
    /** The stylesheet's own `--zabi-brand-50 … 950`. */
    export const defaultBrandRamp: Record<string, string>;
}

declare module '$app/navigation' {
    export function goto(url: string | URL, options?: { replaceState?: boolean; noScroll?: boolean; keepFocus?: boolean; }): Promise<void>;
    export function invalidate(url: string | URL): Promise<void>;
    export function invalidateAll(): Promise<void>;
    export function preloadData(url: string | URL): Promise<void>;
    export function preloadCode(url: string | URL): Promise<void>;
    export function beforeNavigate(callback: (navigation: { from: URL | null; to: URL | null; cancel: () => void }) => void): void;
    export function afterNavigate(callback: (navigation: { from: URL | null; to: URL | null }) => void): void;
    export const page: import('$app/stores').Readable<{
        url: URL;
        params: Record<string, string>;
        route: { id: string | null };
        data: Record<string, any>;
        form: Record<string, any> | null;
        error: App.Error | null;
        status: number;
    }>;
    export const navigating: import('$app/stores').Readable<{
        from: URL | null;
        to: URL | null;
        type: 'link' | 'goto' | 'popstate' | 'form';
    } | null>;
    export const updated: import('$app/stores').Readable<boolean>;
}

declare module '$app/stores' {
    import { Readable } from 'svelte/store';
    export const page: Readable<{
        url: URL;
        params: Record<string, string>;
        route: { id: string | null };
        data: Record<string, any>;
        form: Record<string, any> | null;
        error: App.Error | null;
        status: number;
    }>;
    export const navigating: Readable<{
        from: URL | null;
        to: URL | null;
        type: 'link' | 'goto' | 'popstate' | 'form';
    } | null>;
    export const updated: Readable<boolean>;
}

declare global {
    namespace App {
        interface Error {
            message: string;
            stack?: string;
        }
    }
}

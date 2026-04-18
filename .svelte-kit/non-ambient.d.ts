
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/(playwright)" | "/" | "/chaos-lab" | "/(playwright)/chaos-lab" | "/components" | "/components/demos" | "/components/[name]" | "/docs" | "/lib";
		RouteParams(): {
			"/components/[name]": { name: string }
		};
		LayoutParams(): {
			"/(playwright)": Record<string, never>;
			"/": { name?: string };
			"/chaos-lab": Record<string, never>;
			"/(playwright)/chaos-lab": Record<string, never>;
			"/components": { name?: string };
			"/components/demos": Record<string, never>;
			"/components/[name]": { name: string };
			"/docs": Record<string, never>;
			"/lib": Record<string, never>
		};
		Pathname(): "/" | "/chaos-lab" | "/chaos-lab/" | "/components" | "/components/" | "/components/demos" | "/components/demos/" | `/components/${string}` & {} | `/components/${string}/` & {} | "/docs" | "/docs/" | "/lib" | "/lib/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): string & {};
	}
}
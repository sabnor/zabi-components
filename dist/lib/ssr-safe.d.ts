export declare function isBrowser(): boolean;
export declare function safeWindow(): Window | undefined;
export declare function safeDocument(): Document | undefined;
export declare function safeRequestAnimationFrame(callback: FrameRequestCallback): number | undefined;
export declare function safeSetTimeout(callback: () => void, delay: number): NodeJS.Timeout | undefined;
export declare function safeClearTimeout(id: NodeJS.Timeout | undefined): void;
//# sourceMappingURL=ssr-safe.d.ts.map
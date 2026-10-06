<script lang="ts">
    import { mergeStrings } from "../util/ready-made-strings.js";
    import { zabiStringsFor } from "../util/zabi-strings.js";
    import Input from "./Input.svelte";
    import { onMount, tick } from "svelte";
    import { isInsideToastRegion } from "../util/focus-utils.js";
    import {
        measurePlacement,
        watchViewport,
        type PanelPlacement,
    } from "../util/fit-in-viewport.js";
    import {
        DEFAULT_COLOR_PICKER_STRINGS,
        type ColorPickerStrings,
    } from "../util/ready-made-strings.js";

    interface Props {
        /** Extra classes for the host element. */
        class?: string;
        value?: string;
        label?: string;
        disabled?: boolean;
        placeholder?: string;
        /** The accessible names of its parts, for another language. */
        strings?: Partial<ColorPickerStrings>;
        onchange?: (event: Event) => void;
    }

    let {
        class: className = "",
        value = $bindable<Exclude<Props["value"], undefined>>(),
        label = "",
        disabled = false,
        placeholder = "#000000",
        strings,
        onchange,
        ...restProps
    }: Props = $props();

    // No fallback on a bindable prop: Svelte refuses `bind:…={undefined}` on
    // one that has a fallback (`props_invalid_value`), and a page that throws
    // while it hydrates never becomes interactive. The default is applied
    // here instead: at once, for the server and the first render, and again
    // whenever a parent hands back `undefined`.
    const applyDefaults = () => {
        if (value === undefined) value = "";
    };
    applyDefaults();
    $effect.pre(applyDefaults);

    /** The app-wide words for this component, from a `ZabiStringsProvider` above it, if there is one. */
    const provided = zabiStringsFor("colorPicker");
    const text = $derived(mergeStrings(DEFAULT_COLOR_PICKER_STRINGS, provided(), strings));

    let isOpen = $state(false);
    /** The pointer that is down on the colour map, if one is. */
    let dragPointer: number | null = null;
    let pickerContainer: HTMLDivElement | undefined;

    /**
     * Where the popover is. It hangs from the right edge of the swatch and is
     * 20rem wide, so with the swatch in the left half of a phone screen it ran
     * off the left edge. It is slid back to 8px from the edge, narrowed when
     * it is wider than the screen, and placed against the viewport when a box
     * that scrolls around it would cut it off (`fixed`). A popover that fits
     * is not touched.
     */
    let popoverElement = $state<HTMLDivElement | null>(null);
    let placed = $state<PanelPlacement | null>(null);

    $effect(() => {
        const panel = popoverElement;
        const anchor = panel?.parentElement;
        if (!isOpen || !panel || !anchor) {
            placed = null;
            return;
        }
        const update = () => {
            // `top-12` is 3rem from the top of the box around the swatch,
            // which can be a little taller than the swatch: the gap is what
            // is left under that box, so the popover is where the class puts it.
            const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
            const gap = rem * 3 - anchor.getBoundingClientRect().height;
            placed = measurePlacement(
                anchor,
                panel,
                { block: "bottom", inline: "end" },
                // Placed with `right`, in either writing direction, and always below.
                { margin: 8, gap, flipBlock: false, flipInline: false, rtl: false },
            );
        };
        update();
        return watchViewport(update, panel);
    });
    let colorMap = $state<HTMLCanvasElement | undefined>();
    let swatchButton: HTMLButtonElement | undefined;
    let colorMapContainer: HTMLDivElement | undefined;

    // Working color in HSL (h: 0–360; s, l: 0–100).
    let hue = $state(0);
    let saturation = $state(100);
    let lightness = $state(50);

    function isValidHex(hex: string): boolean {
        const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        return hexPattern.test(hex);
    }

    /** `#f00` → `#ff0000`; 6-digit input is returned unchanged. */
    function expandHex(hex: string): string {
        if (hex.length !== 4) return hex;
        return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
    }

    function hexToHsl(rawHex: string): [number, number, number] {
        const hex = expandHex(rawHex);
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0;
        let s = 0;
        const l = (max + min) / 2;

        if (max !== min) {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r:
                    h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                    break;
                case g:
                    h = ((b - r) / d + 2) / 6;
                    break;
                case b:
                    h = ((r - g) / d + 4) / 6;
                    break;
            }
        }

        return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
    }

    function hslToHex(h: number, s: number, l: number): string {
        l /= 100;
        const a = (s * Math.min(l, 1 - l)) / 100;
        const f = (n: number) => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color)
                .toString(16)
                .padStart(2, "0");
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }

    function updateFromHex(hex: string) {
        if (isValidHex(hex)) {
            const [h, s, l] = hexToHsl(hex);
            hue = h;
            saturation = s;
            lightness = l;
        }
    }

    function updateHexFromHsl() {
        const hex = hslToHex(hue, saturation, lightness);
        value = hex;
        if (onchange) {
            onchange(new Event("change"));
        }
    }

    const variant = $derived(value && !isValidHex(value) ? "error" : "default");

    const message = $derived(
        value && !isValidHex(value) ? text.invalidHex : "",
    );

    function handleInput(event: Event) {
        if (onchange) onchange(event);
        updateFromHex(value);
    }

    function normalizeHexValue(rawValue: string): string {
        let hexValue = rawValue.trim();

        if (hexValue && !hexValue.startsWith("#")) {
            hexValue = "#" + hexValue;
        }

        return hexValue;
    }

    function commitCurrentValue(event: Event) {
        const normalizedHex = normalizeHexValue(value);

        if (normalizedHex === "" || isValidHex(normalizedHex)) {
            value = normalizedHex;
            updateFromHex(normalizedHex);
            if (onchange) onchange(event);
        }
    }

    function handleBlur(event: Event) {
        commitCurrentValue(event);
    }

    async function togglePicker(event?: MouseEvent) {
        if (!disabled) {
            if (isOpen) {
                commitCurrentValue(new Event("change"));
            }
            isOpen = !isOpen;
            if (isOpen && value && isValidHex(value)) {
                updateFromHex(value);
            }
            // A click from the keyboard has no pointer (`detail` is 0): focus
            // goes in, to the first stop of the popover. A press keeps it.
            if (isOpen && event && event.detail === 0) {
                await tick();
                saturationInput?.focus({ preventScroll: true });
            }
        }
    }

    /** Escape inside the popover, or on the swatch while it is open: close, and back to the swatch. */
    function handleEscape(event: KeyboardEvent) {
        if (event.key !== "Escape" || !isOpen) return;
        // Consumed here: a Modal or Drawer around the picker stays open.
        event.stopPropagation();
        event.preventDefault();
        commitCurrentValue(new Event("change"));
        isOpen = false;
        swatchButton?.focus({ preventScroll: true });
    }

    // The map is drawn for the hue it is open at, and again for any change of
    // it: the hue slider, a typed hex, or a `value` set from outside.
    $effect(() => {
        void hue;
        if (isOpen && colorMap) drawColorMap();
    });

    // A `value` changed from outside while open (not the one the sliders just made).
    $effect(() => {
        if (!isOpen || !value || !isValidHex(value)) return;
        if (expandHex(value).toLowerCase() !== hslToHex(hue, saturation, lightness)) {
            updateFromHex(value);
        }
    });

    function drawColorMap() {
        if (!colorMap) return;
        const ctx = colorMap.getContext("2d");
        if (!ctx) return;

        const width = colorMap.width;
        const height = colorMap.height;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const s = (x / width) * 100;
                const l = 100 - (y / height) * 100;
                const hex = hslToHex(hue, s, l);
                ctx.fillStyle = hex;
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }

    /**
     * The colour map: saturation across, lightness up.
     *
     * It is two sliders on one surface, and is built as that: two visually
     * hidden `<input type="range">`, which is what a screen reader, a switch
     * and a voice command already know how to name, read and set ("Saturation,
     * slider, 50%"). A single element cannot say it: `role="slider"` has one
     * value, and an unnamed `role="button"`, which this was, has none.
     *
     * For the keyboard the two act as one map. Left and right move
     * saturation and up and down lightness, from whichever slider has focus,
     * and focus goes to the one that moved, so its new value is what is
     * read out. Shift moves by ten. Only the first is a Tab stop.
     *
     * The surface takes pointer events, so a finger and a pen work as a mouse
     * does; it used to listen for `mousedown` alone. The whole surface is the
     * target (the mark on it is not something to hit), and `touch-none`
     * keeps a drag on it from scrolling the page.
     */
    let saturationInput = $state<HTMLInputElement | null>(null);
    let lightnessInput = $state<HTMLInputElement | null>(null);

    const percent = (value: number) => Math.max(0, Math.min(100, Math.round(value)));

    function setFromPoint(event: PointerEvent) {
        if (!colorMapContainer) return;
        const rect = colorMapContainer.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        saturation = percent(((event.clientX - rect.left) / rect.width) * 100);
        lightness = percent(100 - ((event.clientY - rect.top) / rect.height) * 100);
        updateHexFromHsl();
    }

    function handleMapPointerDown(event: PointerEvent) {
        if (event.pointerType === "mouse" && event.button !== 0) return;
        dragPointer = event.pointerId;
        try {
            colorMapContainer?.setPointerCapture(event.pointerId);
        } catch {
            /* a test DOM, or a pointer that is already gone */
        }
        setFromPoint(event);
        // The keys carry on from where the pointer left it.
        saturationInput?.focus({ preventScroll: true });
        // Not a text selection, and not a second focus change from the press itself.
        event.preventDefault();
    }

    function handleMapPointerMove(event: PointerEvent) {
        if (dragPointer !== event.pointerId) return;
        setFromPoint(event);
    }

    function handleMapPointerUp(event: PointerEvent) {
        if (dragPointer !== event.pointerId) return;
        dragPointer = null;
    }

    function handleMapKeydown(event: KeyboardEvent) {
        const step = event.shiftKey ? 10 : 1;
        const across = event.key === "ArrowRight" ? step : event.key === "ArrowLeft" ? -step : 0;
        const up = event.key === "ArrowUp" ? step : event.key === "ArrowDown" ? -step : 0;
        if (across === 0 && up === 0) return;
        // The slider's own handling would move the focused one for all four keys.
        event.preventDefault();
        if (across !== 0) {
            saturation = percent(saturation + across);
            saturationInput?.focus({ preventScroll: true });
        } else {
            lightness = percent(lightness + up);
            lightnessInput?.focus({ preventScroll: true });
        }
        updateHexFromHsl();
    }

    /** Home, End, Page Up and Down, and what assistive technology sets: the slider's own value. */
    function handleMapInput(axis: "saturation" | "lightness", event: Event) {
        const next = percent(Number((event.currentTarget as HTMLInputElement).value));
        if (axis === "saturation") saturation = next;
        else lightness = next;
        updateHexFromHsl();
    }

    function handleHueChange(event: Event) {
        const target = event.target as HTMLInputElement;
        hue = parseInt(target.value);
        updateHexFromHsl();
    }

    function setPickerContainer(node: HTMLDivElement) {
        pickerContainer = node;
        return {
            destroy() {
                if (pickerContainer === node) {
                    pickerContainer = undefined;
                }
            },
        };
    }

    function setColorMap(node: HTMLCanvasElement) {
        colorMap = node;
        return {
            destroy() {
                if (colorMap === node) {
                    colorMap = undefined;
                }
            },
        };
    }

    function setColorMapContainer(node: HTMLDivElement) {
        colorMapContainer = node;
        return {
            destroy() {
                if (colorMapContainer === node) {
                    colorMapContainer = undefined;
                }
            },
        };
    }

    function handleClickOutside(event: MouseEvent) {
        // A toast lies over the panel; a press on it is for the toast.
        if (isInsideToastRegion(event.target)) return;
        if (
            pickerContainer &&
            !pickerContainer.contains(event.target as Node) &&
            !(event.target as HTMLElement).closest(
                "[data-color-picker-open]",
            )
        ) {
            commitCurrentValue(new Event("change"));
            isOpen = false;
        }
    }

    onMount(() => {
        if (value && isValidHex(value)) {
            updateFromHex(value);
        }
        window.addEventListener("mousedown", handleClickOutside);

        // Teardown is returned from onMount rather than registered with
        // onDestroy: onDestroy also runs on the server, where there is no window.
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    });

    const displayColor = $derived(value && isValidHex(value) ? value : placeholder);
    const pickerIndicatorX = $derived(`${saturation}%`);
    const pickerIndicatorY = $derived(`${100 - lightness}%`);
    /** What a slider of the map says: its own value, and the colour the two make. */
    const mapValueText = (value: number) => `${Math.round(value)}%, ${hslToHex(hue, saturation, lightness)}`;
    /** A ring around a surface whose slider has keyboard focus: the sliders themselves are not drawn. */
    const RING_WITHIN =
        "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus-ring";
</script>

<div class={className} {...restProps}>
    <div class="flex items-start gap-2">
        <div class="flex-1">
            <Input
                bind:value
                {label}
                {placeholder}
                {disabled}
                {variant}
                {message}
                oninput={handleInput}
                onblur={handleBlur}
                aria-label={label ? undefined : text.hexInput}
            />
        </div>
        <div class="relative shrink-0 mt-6">
            <button
                type="button"
                onclick={togglePicker}
                {disabled}
                class="focus-ring w-11 h-11 rounded-control border-2 border-card shrink-0 cursor-pointer hover:ring-2 hover:ring-border active:ring-2 active:ring-border-strong transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                style="background-color: {displayColor};"
                aria-label={label ? `${label}, ${text.open}` : text.open}
                bind:this={swatchButton}
                onkeydown={handleEscape}
                aria-expanded={isOpen}
                data-color-picker-open
            ></button>

            {#if isOpen}
                <div
                    use:setPickerContainer
                    bind:this={popoverElement}
                    class="absolute top-12 right-0 z-popover border border-border-overlay bg-surface-overlay rounded-overlay shadow-lg p-4 w-80"
                    style:position={placed?.fixed ? "fixed" : undefined}
                    style:top={placed?.fixed ? `${placed.fixed.top}px` : undefined}
                    style:left={placed?.fixed ? `${placed.fixed.left}px` : undefined}
                    style:right={placed?.fixed
                        ? "auto"
                        : placed && placed.inlineOffset !== 0
                          ? `${placed.inlineOffset}px`
                          : undefined}
                    style:width={placed?.fixed ? `${placed.fixed.width}px` : undefined}
                    style:max-width={placed && placed.maxWidth !== null ? `${placed.maxWidth}px` : undefined}
                    role="dialog"
                    aria-label={text.picker}
                    tabindex="-1"
                    onkeydown={handleEscape}
                >
                    <div class="space-y-4">
                        <!-- The sliders inside are the controls; the pointer
                        handlers are on the surface they share. -->
                        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                        <div
                            use:setColorMapContainer
                            class="relative w-full h-48 rounded-container cursor-crosshair touch-none select-none {RING_WITHIN}"
                            role="group"
                            aria-label={text.area}
                            onpointerdown={handleMapPointerDown}
                            onpointermove={handleMapPointerMove}
                            onpointerup={handleMapPointerUp}
                            onpointercancel={handleMapPointerUp}
                        >
                            <canvas
                                use:setColorMap
                                width={256}
                                height={192}
                                class="w-full h-full rounded-container"
                            ></canvas>
                            <input
                                bind:this={saturationInput}
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={saturation}
                                class="sr-only"
                                aria-label={text.saturation}
                                aria-valuetext={mapValueText(saturation)}
                                oninput={(event) => handleMapInput("saturation", event)}
                                onkeydown={handleMapKeydown}
                            />
                            <input
                                bind:this={lightnessInput}
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                value={lightness}
                                tabindex="-1"
                                class="sr-only"
                                aria-label={text.lightness}
                                aria-orientation="vertical"
                                aria-valuetext={mapValueText(lightness)}
                                oninput={(event) => handleMapInput("lightness", event)}
                                onkeydown={handleMapKeydown}
                            />
                            <!-- White with a dark edge: seen on the white corner of the map as on the black. -->
                            <div
                                class="absolute w-4 h-4 border-2 border-white rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.6)] pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                                style="left: {pickerIndicatorX}; top: {pickerIndicatorY};"
                            ></div>
                        </div>

                        <div class="space-y-2">
                            <!-- A real slider, drawn by the two layers around
                            it. It is transparent, so the ring for keyboard
                            focus is on this box; and the box is a finger tall
                            on a touch screen, where 24px was not. -->
                            <div
                                class="relative h-6 pointer-coarse:h-11 rounded-control {RING_WITHIN}"
                            >
                                <div
                                    class="absolute inset-0 rounded-control"
                                    style="background: linear-gradient(to right, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%));"
                                ></div>
                                <input
                                    type="range"
                                    min="0"
                                    max="360"
                                    value={hue}
                                    oninput={handleHueChange}
                                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    aria-label={text.hue}
                                />
                                <div
                                    class="absolute top-0 bottom-0 w-3 bg-card shadow-sm pointer-events-none my-px rounded-full border border-base-950"
                                    style="left: {(hue / 360) * 100}%;"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>

<script lang="ts">
    import Input from "./Input.svelte";
    import { onMount, onDestroy } from "svelte";

    interface Props {
        value?: string;
        label?: string;
        disabled?: boolean;
        placeholder?: string;
        onchange?: (event: Event) => void;
    }

    let {
        value = "",
        label = "",
        disabled = false,
        placeholder = "#000000",
        onchange,
        ...restProps
    }: Props = $props();

    let isOpen = $state(false);
    let pickerContainer: HTMLDivElement;
    let colorMap: HTMLCanvasElement;
    let colorMapContainer: HTMLDivElement;
    let hueSlider: HTMLInputElement;
    let isDragging = $state(false);

    // HSL values (0-360, 0-100, 0-100)
    let hue = $state(0);
    let saturation = $state(100);
    let lightness = $state(50);

    function isValidHex(hex: string): boolean {
        const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        return hexPattern.test(hex);
    }

    function hexToHsl(hex: string): [number, number, number] {
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

    const variant = $derived(() => {
        if (value && !isValidHex(value)) {
            return "error";
        }
        return "default";
    });

    const message = $derived(() => {
        if (value && !isValidHex(value)) {
            return "Please enter a valid hex color (e.g., #ff0000 or #f00)";
        }
        return "";
    });

    function handleInput(event: Event) {
        if (onchange) onchange(event);
        updateFromHex(value);
    }

    function handleBlur(event: Event) {
        const target = event.target as HTMLInputElement;
        let hexValue = target.value.trim();

        if (hexValue && !hexValue.startsWith("#")) {
            hexValue = "#" + hexValue;
        }

        if (hexValue === "" || isValidHex(hexValue)) {
            value = hexValue;
            updateFromHex(hexValue);
            if (onchange) onchange(event);
        }
    }

    function togglePicker() {
        if (!disabled) {
            isOpen = !isOpen;
            if (isOpen && value && isValidHex(value)) {
                updateFromHex(value);
            }
        }
    }

    function drawColorMap() {
        if (!colorMap) return;
        const ctx = colorMap.getContext("2d");
        if (!ctx) return;

        const width = colorMap.width;
        const height = colorMap.height;

        // Draw saturation/lightness gradient
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

    function handleColorMapClick(event: MouseEvent) {
        if (!colorMapContainer || !colorMap) return;
        const rect = colorMapContainer.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        saturation = Math.max(0, Math.min(100, (x / rect.width) * 100));
        lightness = Math.max(0, Math.min(100, 100 - (y / rect.height) * 100));

        updateHexFromHsl();
        drawColorMap();
    }

    function handleColorMapDrag(event: MouseEvent) {
        if (isDragging) {
            handleColorMapClick(event);
        }
    }

    function handleHueChange(event: Event) {
        const target = event.target as HTMLInputElement;
        hue = parseInt(target.value);
        updateHexFromHsl();
        drawColorMap();
    }

    $effect(() => {
        if (isOpen && colorMap) {
            // Use setTimeout to ensure canvas is rendered
            setTimeout(() => {
                drawColorMap();
            }, 0);
        }
    });

    $effect(() => {
        if (hue !== undefined && colorMap && isOpen) {
            drawColorMap();
        }
    });

    $effect(() => {
        if (value && isValidHex(value) && !isDragging) {
            updateFromHex(value);
        }
    });

    function handleClickOutside(event: MouseEvent) {
        if (
            pickerContainer &&
            !pickerContainer.contains(event.target as Node) &&
            !(event.target as HTMLElement).closest(
                '[aria-label="Open color picker"]',
            )
        ) {
            isOpen = false;
        }
    }

    onMount(() => {
        if (value && isValidHex(value)) {
            updateFromHex(value);
        }
        window.addEventListener("mousedown", handleClickOutside);
        window.addEventListener("mouseup", () => {
            isDragging = false;
        });
        window.addEventListener("mousemove", handleColorMapDrag);
    });

    onDestroy(() => {
        window.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener("mouseup", () => {});
        window.removeEventListener("mousemove", handleColorMapDrag);
    });

    const displayColor = $derived(() => {
        if (value && isValidHex(value)) {
            return value;
        }
        return placeholder;
    });

    const currentHslColor = $derived(() => {
        return `hsl(${hue}, 100%, 50%)`;
    });

    const pickerIndicatorX = $derived(() => {
        return `${(saturation / 100) * 100}%`;
    });

    const pickerIndicatorY = $derived(() => {
        return `${100 - (lightness / 100) * 100}%`;
    });
</script>

<div {...restProps}>
    <div class="flex items-start gap-2">
        <div class="flex-1">
            <Input
                bind:value
                {label}
                {placeholder}
                {disabled}
                variant={variant()}
                message={message()}
                oninput={handleInput}
                onblur={handleBlur}
                aria-label="Hex color input"
            />
        </div>
        <div class="relative shrink-0 mt-6">
            <button
                type="button"
                onclick={togglePicker}
                {disabled}
                class="w-11 h-11 rounded-lg border-2 border-card shrink-0 cursor-pointer hover:ring-2 hover:ring-brand-500 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                style="background-color: {displayColor()};"
                aria-label="Open color picker"
                aria-expanded={isOpen}
            ></button>

            {#if isOpen}
                <div
                    bind:this={pickerContainer}
                    class="absolute top-12 right-0 z-50 bg-input rounded-2xl shadow-lg p-4 w-80"
                    role="dialog"
                    aria-label="Color picker"
                >
                    <div class="space-y-4">
                        <!-- Color Map -->
                        <div
                            bind:this={colorMapContainer}
                            class="relative w-full h-48 rounded-xl overflow-hidden cursor-crosshair"
                            onmousedown={(e) => {
                                isDragging = true;
                                handleColorMapClick(e);
                            }}
                            role="button"
                            tabindex="0"
                        >
                            <canvas
                                bind:this={colorMap}
                                width={256}
                                height={192}
                                class="w-full h-full"
                            ></canvas>
                            <!-- Color indicator -->
                            <div
                                class="absolute w-4 h-4 border-2 border-white rounded-full shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                                style="left: {pickerIndicatorX()}; top: {pickerIndicatorY()};"
                            ></div>
                        </div>

                        <!-- Hue Slider -->
                        <div class="space-y-2">
                            <div
                                class="relative h-6 rounded-lg overflow-hidden"
                            >
                                <div
                                    class="absolute inset-0"
                                    style="background: linear-gradient(to right, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%));"
                                ></div>
                                <input
                                    bind:this={hueSlider}
                                    type="range"
                                    min="0"
                                    max="360"
                                    value={hue}
                                    oninput={handleHueChange}
                                    class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    aria-label="Hue slider"
                                />
                                <div
                                    class="absolute top-0 bottom-0 w-3 bg-card shadow-md pointer-events-none my-0.25 rounded-full border border-base-950"
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

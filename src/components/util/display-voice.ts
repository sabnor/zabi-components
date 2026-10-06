/**
 * The display voice: the weight and tracking of a figure or a display line.
 * Both are read from custom properties that are declared nowhere, so any
 * ancestor can set them (`--zabi-display-weight: 400` for a light serif) and
 * the defaults are what the display face looked like before. The `number:`
 * hint is what makes Tailwind read the weight as a weight and not a family.
 * Heading `variant="display"` and Stat share this string.
 */
export const displayVoice =
    "font-[number:var(--zabi-display-weight,700)] tracking-[var(--zabi-display-tracking,-0.02em)]";

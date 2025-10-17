

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.BhaQNqTu.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/IlX5ep4s.js"];
export const stylesheets = ["_app/immutable/assets/0.BtGStH-Y.css"];
export const fonts = [];

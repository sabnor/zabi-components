

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.679n55Hk.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Bw_PCV9Z.js"];
export const stylesheets = ["_app/immutable/assets/0.DAwc1AI6.css"];
export const fonts = [];

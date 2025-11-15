

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.BvCfz-Vj.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Bw_PCV9Z.js"];
export const stylesheets = ["_app/immutable/assets/0.BXeDcrVt.css"];
export const fonts = [];

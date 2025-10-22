

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.BKPOb50C.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/HjNLiXEX.js"];
export const stylesheets = ["_app/immutable/assets/0.CSSgZSbY.css"];
export const fonts = [];

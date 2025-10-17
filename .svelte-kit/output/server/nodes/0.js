

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.0aW5DmUV.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DMn9L947.js"];
export const stylesheets = ["_app/immutable/assets/0.DACEerdU.css"];
export const fonts = [];

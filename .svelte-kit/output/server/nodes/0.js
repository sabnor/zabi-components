

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.CHD8VdiX.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/DXvaqvvF.js","_app/immutable/chunks/D5y7ldBA.js"];
export const stylesheets = ["_app/immutable/assets/0.DZjEVqe1.css"];
export const fonts = [];

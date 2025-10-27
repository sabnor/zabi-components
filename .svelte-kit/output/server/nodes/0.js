

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DnzODyua.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/BmHceE-Q.js"];
export const stylesheets = ["_app/immutable/assets/0.C-na14sQ.css"];
export const fonts = [];

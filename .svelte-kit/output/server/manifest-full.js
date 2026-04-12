export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.DiRjZJ8_.js",app:"_app/immutable/entry/app.Br8Rjagl.js",imports:["_app/immutable/entry/start.DiRjZJ8_.js","_app/immutable/chunks/CFm9SEez.js","_app/immutable/chunks/DHLvZG3Y.js","_app/immutable/chunks/DXvaqvvF.js","_app/immutable/entry/app.Br8Rjagl.js","_app/immutable/chunks/DXvaqvvF.js","_app/immutable/chunks/DHLvZG3Y.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/Cj7K_5lK.js","_app/immutable/chunks/C9vLgVhF.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/components",
				pattern: /^\/components\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/docs",
				pattern: /^\/docs\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

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
		client: {start:"_app/immutable/entry/start.C1nkLKjn.js",app:"_app/immutable/entry/app.3h9v5Gph.js",imports:["_app/immutable/entry/start.C1nkLKjn.js","_app/immutable/chunks/BULCx9zo.js","_app/immutable/chunks/CaLJrp-n.js","_app/immutable/chunks/DjtL8Tgn.js","_app/immutable/entry/app.3h9v5Gph.js","_app/immutable/chunks/DjtL8Tgn.js","_app/immutable/chunks/CaLJrp-n.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/B_k2URqP.js","_app/immutable/chunks/FLXuXY6v.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

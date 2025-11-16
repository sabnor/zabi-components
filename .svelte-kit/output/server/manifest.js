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
		client: {start:"_app/immutable/entry/start.LbRQZsDU.js",app:"_app/immutable/entry/app.Df0uoZQK.js",imports:["_app/immutable/entry/start.LbRQZsDU.js","_app/immutable/chunks/C3nMFjNX.js","_app/immutable/chunks/Cw7p2apT.js","_app/immutable/chunks/Bw_PCV9Z.js","_app/immutable/entry/app.Df0uoZQK.js","_app/immutable/chunks/Bw_PCV9Z.js","_app/immutable/chunks/Cw7p2apT.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/0BSVzhmt.js","_app/immutable/chunks/DOhzVgG1.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

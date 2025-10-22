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
		client: {start:"_app/immutable/entry/start.CQxJrEI4.js",app:"_app/immutable/entry/app.CbouZEiU.js",imports:["_app/immutable/entry/start.CQxJrEI4.js","_app/immutable/chunks/STl5LHY9.js","_app/immutable/chunks/B6KDH_bT.js","_app/immutable/chunks/W2MGHFu9.js","_app/immutable/entry/app.CbouZEiU.js","_app/immutable/chunks/W2MGHFu9.js","_app/immutable/chunks/B6KDH_bT.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CXMscgXE.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

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
		client: {start:"_app/immutable/entry/start.D9uc00xC.js",app:"_app/immutable/entry/app.ReOx-2hL.js",imports:["_app/immutable/entry/start.D9uc00xC.js","_app/immutable/chunks/BU5pu3or.js","_app/immutable/chunks/Dg3YkKBp.js","_app/immutable/chunks/D8FGe-99.js","_app/immutable/entry/app.ReOx-2hL.js","_app/immutable/chunks/D8FGe-99.js","_app/immutable/chunks/Dg3YkKBp.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/DZBXBsWf.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
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

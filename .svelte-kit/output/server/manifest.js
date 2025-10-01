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
		client: {start:"_app/immutable/entry/start.CDwUwixO.js",app:"_app/immutable/entry/app.ByyYiAsa.js",imports:["_app/immutable/entry/start.CDwUwixO.js","_app/immutable/chunks/B6yXW9B4.js","_app/immutable/chunks/hZ0iOJ2Y.js","_app/immutable/chunks/C_DQJDim.js","_app/immutable/entry/app.ByyYiAsa.js","_app/immutable/chunks/C_DQJDim.js","_app/immutable/chunks/hZ0iOJ2Y.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/DCQpT9Ew.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

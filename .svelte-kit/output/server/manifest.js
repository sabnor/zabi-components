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
		client: {start:"_app/immutable/entry/start.B-dfB4vH.js",app:"_app/immutable/entry/app.DA27cZJ7.js",imports:["_app/immutable/entry/start.B-dfB4vH.js","_app/immutable/chunks/-kVAL_PE.js","_app/immutable/chunks/xVKriLbs.js","_app/immutable/chunks/CxlnSeYs.js","_app/immutable/entry/app.DA27cZJ7.js","_app/immutable/chunks/CxlnSeYs.js","_app/immutable/chunks/xVKriLbs.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/C_cfvL72.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

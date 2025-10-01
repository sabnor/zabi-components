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
		client: {start:"_app/immutable/entry/start.FgxalMyH.js",app:"_app/immutable/entry/app.BU_r8_hj.js",imports:["_app/immutable/entry/start.FgxalMyH.js","_app/immutable/chunks/B5KHa4cn.js","_app/immutable/chunks/DXYoZI2j.js","_app/immutable/chunks/4iPNAT8i.js","_app/immutable/entry/app.BU_r8_hj.js","_app/immutable/chunks/4iPNAT8i.js","_app/immutable/chunks/DXYoZI2j.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/Af9PoHMU.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

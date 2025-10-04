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
		client: {start:"_app/immutable/entry/start.eWd2bC0T.js",app:"_app/immutable/entry/app.CwTVScT_.js",imports:["_app/immutable/entry/start.eWd2bC0T.js","_app/immutable/chunks/P4vVW4js.js","_app/immutable/chunks/Cz1I8OLL.js","_app/immutable/chunks/BtvgvnMz.js","_app/immutable/entry/app.CwTVScT_.js","_app/immutable/chunks/BtvgvnMz.js","_app/immutable/chunks/Cz1I8OLL.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/C13aVR5a.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

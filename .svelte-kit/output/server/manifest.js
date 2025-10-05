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
		client: {start:"_app/immutable/entry/start.BZFFbXjo.js",app:"_app/immutable/entry/app.CSNxo-Pi.js",imports:["_app/immutable/entry/start.BZFFbXjo.js","_app/immutable/chunks/0SFT31pa.js","_app/immutable/chunks/BGoc5axv.js","_app/immutable/chunks/Cq0pg0pJ.js","_app/immutable/entry/app.CSNxo-Pi.js","_app/immutable/chunks/Cq0pg0pJ.js","_app/immutable/chunks/BGoc5axv.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/BuwcwXuA.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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

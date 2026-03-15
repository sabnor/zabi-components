function n(){return typeof window<"u"}let r=0;function t(e="id"){return n()?`${e}-${Math.random().toString(36).substr(2,9)}`:`${e}-ssr-${++r}`}export{t as g};

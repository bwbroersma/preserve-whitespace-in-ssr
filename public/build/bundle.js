'use strict';

function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
const escaped = {
    '"': '&quot;',
    "'": '&#39;',
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;'
};
function escape(html) {
    return String(html).replace(/["'&<>]/g, match => escaped[match]);
}
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(parent_component ? parent_component.$$.context : []),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, options = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, options);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}

/* src/App.svelte generated by Svelte v3.21.0 */

const css = {
	code: "main.svelte-1tky8bj{text-align:center;padding:1em;max-width:240px;margin:0 auto}h1.svelte-1tky8bj{color:#ff3e00;text-transform:uppercase;font-size:4em;font-weight:100}@media(min-width: 640px){main.svelte-1tky8bj{max-width:none}}",
	map: "{\"version\":3,\"file\":\"App.svelte\",\"sources\":[\"App.svelte\"],\"sourcesContent\":[\"<script>\\n\\texport let name;\\n</script>\\n\\n<main>\\n\\t<h1> Hello {name}!</h1>\\n\\t<p>Visit the <a href=\\\"https://svelte.dev/tutorial\\\">Svelte tutorial</a> to learn how to build Svelte apps.</p>\\n</main>\\n\\n<style>\\n\\tmain {\\n\\t\\ttext-align: center;\\n\\t\\tpadding: 1em;\\n\\t\\tmax-width: 240px;\\n\\t\\tmargin: 0 auto;\\n\\t}\\n\\n\\th1 {\\n\\t\\tcolor: #ff3e00;\\n\\t\\ttext-transform: uppercase;\\n\\t\\tfont-size: 4em;\\n\\t\\tfont-weight: 100;\\n\\t}\\n\\n\\t@media (min-width: 640px) {\\n\\t\\tmain {\\n\\t\\t\\tmax-width: none;\\n\\t\\t}\\n\\t}\\n</style>\\n\"],\"names\":[],\"mappings\":\"AAUC,IAAI,eAAC,CAAC,AACL,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,GAAG,CACZ,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AAED,EAAE,eAAC,CAAC,AACH,KAAK,CAAE,OAAO,CACd,cAAc,CAAE,SAAS,CACzB,SAAS,CAAE,GAAG,CACd,WAAW,CAAE,GAAG,AACjB,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AAC1B,IAAI,eAAC,CAAC,AACL,SAAS,CAAE,IAAI,AAChB,CAAC,AACF,CAAC\"}"
};

const App = create_ssr_component(($$result, $$props, $$bindings, $$slots) => {
	let { name } = $$props;
	if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
	$$result.css.add(css);

	return `<main class="${"svelte-1tky8bj"}"><h1 class="${"svelte-1tky8bj"}">Hello ${escape(name)}!</h1>
	<p>Visit the <a href="${"https://svelte.dev/tutorial"}">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>`;
});

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

module.exports = app;
//# sourceMappingURL=bundle.js.map

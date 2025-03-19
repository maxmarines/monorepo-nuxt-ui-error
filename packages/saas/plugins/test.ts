import {
	defineNuxtModule,
	createResolver,
	resolvePath,
	installModule,
} from "@nuxt/kit";

export default defineNuxtModule({
	async setup(_, nuxt) {
		const resolver = createResolver(import.meta.url);

		const cssPath = "~/assets/css/main.css";
		const resolvedCss = await resolvePath(cssPath, {
			extensions: [".css", ".sass", ".scss", ".less", ".styl"],
		});

		await installModule("@nuxtjs/tailwindcss", { cssPath });

		if (nuxt.options.vite.warmupEntry !== false && resolvedCss) {
			nuxt.hook("vite:serverCreated", async (server, env) => {
				await server.transformRequest(resolvedCss, { ssr: env.isServer });
			});
		}
	},
});

const path = require("path");
const fs = require("fs");
const express = require("express");

/**
 * Integrates the built Nuxt application with Express
 * Serves the Nuxt app at /v2/* routes as a SPA
 */
function integrateNuxt(app) {
	const nuxtOutputPath = path.join(__dirname, ".output-nuxt");
	const nuxtPublicPath = path.join(nuxtOutputPath, "public");
	const indexHtmlPath = path.join(nuxtPublicPath, "index.html");

	// Check if Nuxt build exists
	if (!fs.existsSync(nuxtOutputPath) || !fs.existsSync(indexHtmlPath)) {
		console.log("[NUXT] Build not found. Run 'cd nuxt-app && npm run build' to build the Vue3 frontend.");
		return;
	}

	console.log("[NUXT] Integrating Nuxt 4 application...");

	// Serve Nuxt static assets with proper caching
	app.use(
		"/v2",
		express.static(nuxtPublicPath, {
			maxAge: "1d",
			etag: true,
			lastModified: true,
			index: false, // Don't automatically serve index.html
			setHeaders: (res, filepath) => {
				// Cache JS/CSS files longer
				if (filepath.includes("/_nuxt/")) {
					res.set("Cache-Control", "public, max-age=31536000, immutable");
				}
			},
		})
	);

	// Handle all /v2/* routes by serving the SPA index.html
	app.get("/v2*", (req, res) => {
		res.sendFile(indexHtmlPath);
	});

	console.log("[NUXT] Vue3/Nuxt4 frontend available at /v2");
}

module.exports = { integrateNuxt };

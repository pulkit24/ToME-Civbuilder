const path = require("path");
const fs = require("fs");
const express = require("express");

/**
 * Integrates the built Nuxt application with Express
 * Serves the Nuxt app at /v2/* routes as a static site
 */
function integrateNuxt(app) {
	const nuxtOutputPath = path.join(__dirname, ".output-nuxt");
	const nuxtPublicPath = path.join(nuxtOutputPath, "public");
	const indexHtmlPath = path.join(nuxtPublicPath, "index.html");

	// Check if Nuxt build exists
	if (!fs.existsSync(nuxtOutputPath)) {
		console.log("[NUXT] Build not found. Run 'npm run build:nuxt' to build the Vue3 frontend.");
		return;
	}

	console.log("[NUXT] Integrating Nuxt 4 application...");

	// Serve all Nuxt static assets at /v2
	app.use(
		"/v2",
		express.static(nuxtPublicPath, {
			maxAge: "1d",
			etag: true,
			lastModified: true,
			index: "index.html",
			setHeaders: (res, filepath) => {
				// Cache JS/CSS files longer
				if (filepath.includes("/_nuxt/")) {
					res.set("Cache-Control", "public, max-age=31536000, immutable");
				}
			},
		})
	);

	// Handle SPA fallback for /v2/* routes
	app.get("/v2/*", (req, res) => {
		if (fs.existsSync(indexHtmlPath)) {
			res.sendFile(indexHtmlPath);
		} else {
			res.status(404).send("Frontend not built");
		}
	});

	console.log("[NUXT] Vue3/Nuxt4 frontend available at /v2");
}

module.exports = { integrateNuxt };

import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    base: "/tele2_landing/",
    root: "src/",
    publicDir: resolve(__dirname, 'public'),
    build: {
        outDir: "../dist",
        minify: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html')
            }
        }
    },
    resolve: {
        alias: {
            '/scripts': resolve(__dirname, 'src/scripts'),
            '/styles': resolve(__dirname, "src/styles"),
            '/components': resolve(__dirname, 'src/components')
        }
    }
});
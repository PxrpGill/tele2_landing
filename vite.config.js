import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
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
    server: {
        open: true
    },
    resolve: {
        alias: {
            '/scripts': resolve(__dirname, 'src/scripts'),
            '/styles': resolve(__dirname, "src/styles")
        }
    }
});
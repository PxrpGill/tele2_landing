import { defineConfig } from "vite";
import { resolve } from "path";
import { Features, browserslistToTargets } from "lightningcss";
import browserslist from "browserslist";
import handlebars from "vite-plugin-handlebars";


const components = 'src/components';

export default defineConfig({
    base: "/tele2_landing/",
    root: "src/",
    publicDir: resolve(__dirname, 'public'),
    css: {
        devSourcemap: true,
        transformer: 'lightningcss',
        lightningcss: {
            targets: browserslistToTargets(browserslist('>= 0.25%')),
            include:
                Features.Colors |
                Features.Nesting |
                Features.MediaRangeSyntax,

            exclude:
                Features.LogicalProperties
        },
    },
    cssMinify: 'lightningcss',
    build: {
        outDir: "../dist",
        minify: true,
        cssMinify: 'lightningcss',
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
    },
    plugins: [
        handlebars({
            partialDirectory: [
                resolve(__dirname, `${components}/header`),
                resolve(__dirname, `${components}/sections`),
                resolve(__dirname, `${components}/sections/rate`),
                resolve(__dirname, `${components}/sections/tariff`),
                resolve(__dirname, `${components}/footer`),
                resolve(__dirname, `${components}/dialog_question`),
                resolve(__dirname, `${components}/dialog_change`),
                resolve(__dirname, `${components}/info_message`),
                resolve(__dirname, `${components}/participate`)
            ]
        }),
    ]
});

import { transform, bundleAsync } from 'lightningcss';
import path from 'path';
import fs from 'fs';

let mixins = new Map();

const baseUrl = 'src/styles/unformatted';

const files = [
    "style.css",
    "header.css",
    "main.css",
    "footer.css",

    "sections/rate.css",
    "sections/slider.css",
    "sections/stocks.css",
    "sections/tariff.css",

    "modal/change_region.css",
    "modal/participate.css"
];

async function processFiles() {
    for (let key of files) {
        const filePath = path.join(baseUrl, key);

        const { code: buffer } = await bundleAsync({
            filename: filePath,
            minify: true,
            resolver: {
                read(filePath) {
                    return fs.readFileSync(filePath, 'utf8');
                },
                resolve(specifier, from) {
                    return path.resolve(path.dirname(from), specifier);
                }
            }
        });

        let res = transform({
            filename: key,
            minify: true,
            code: Buffer.from(buffer),
            customAtRules: {
                mixin: {
                    prelude: '<custom-ident>',
                    body: 'style-block'
                },
                apply: {
                    prelude: '<custom-ident>'
                }
            },
            visitor: {
                Rule: {
                    custom: {
                        mixin(rule) {
                            mixins.set(rule.prelude.value, rule.body.value);
                            return [];
                        },
                        apply(rule) {
                            return mixins.get(rule.prelude.value);
                        }
                    }
                }
            }
        });
        fs.writeFileSync(`src/styles/formatted/${key}`, res.code.toString());
    }
}

processFiles();

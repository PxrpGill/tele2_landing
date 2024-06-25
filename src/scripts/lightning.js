import { transform, bundleAsync } from 'lightningcss';
import path from 'path';
import fs from 'fs';

let mixins = new Map();

const baseUrl = 'src/styles/unformatted';
const sectionsUrl = `${baseUrl}/sections`;
const modalUrl = `${baseUrl}/modal`;

const files = {
    "style.css": fs.readFileSync(`${baseUrl}/style.css`),
    "header.css": fs.readFileSync(`${baseUrl}/header.css`),
    "main.css": fs.readFileSync(`${baseUrl}/main.css`),
    "footer.css": fs.readFileSync(`${baseUrl}/footer.css`),

    "sections/rate.css": fs.readFileSync(`${sectionsUrl}/rate.css`),
    "sections/slider.css": fs.readFileSync(`${sectionsUrl}/slider.css`),
    "sections/stocks.css": fs.readFileSync(`${sectionsUrl}/stocks.css`),
    "sections/tariff.css": fs.readFileSync(`${sectionsUrl}/tariff.css`),

    "modal/change_region.css": fs.readFileSync(`${modalUrl}/change_region.css`),
    "modal/participate.css": fs.readFileSync(`${modalUrl}/participate.css`)
}

for (let key in files) {
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
        code: buffer.toString('utf-8'),
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
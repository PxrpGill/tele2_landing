import { transform } from 'lightningcss';
import fs from 'fs';

let mixins = new Map();

const baseUrl = 'src/styles/unformatted';
const sectionsUrl = `${baseUrl}/sections`;
const modalUrl = `${baseUrl}/modal`;

const files = {
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
    let res = transform({
        filename: key,
        minify: true,
        code: files[key],
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
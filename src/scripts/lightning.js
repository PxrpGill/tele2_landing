import { transform } from 'lightningcss';
import fs from 'fs';

let mixins = new Map();

const files = {
    "header.css": fs.readFileSync('src/styles/header.css'),
    "mixins_position.css": fs.readFileSync('src/styles/mixins_position.css')
}

for (let key in files) {
    let res = transform({
        filename: 'style.css',
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

    fs.writeFileSync(`src/styles/${key}`, res.code.toString());
}
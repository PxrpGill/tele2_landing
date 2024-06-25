import { transform } from 'lightningcss';
import fs from 'fs';

let mixins = new Map();

let cssCode = fs.readFileSync('src/styles/style.css');

let res = transform({
    filename: 'style.css',
    minify: true,
    code: cssCode,
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

fs.writeFileSync('src/styles/transformed_style.css', res.code.toString());


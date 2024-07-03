import postcssMixins from 'postcss-mixins';
import postcssSimpleVars from 'postcss-simple-vars';
import postcssCalc from 'postcss-calc';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';
import lightningcssPlugin from 'postcss-lightningcss';
import postcssDialogPolyfill from 'postcss-dialog-polyfill';


export default {
    plugins: [
        postcssMixins(),
        postcssSimpleVars(),
        postcssCalc(),
        autoprefixer(),
        postcssImport(),
        postcssDialogPolyfill(),
        lightningcssPlugin({
            browsers: '>= .25%',
            lightningcssOptions: {
                minify: true,
                sourceMap: true,
                targets: {
                    safari: (13 << 16) | (2 << 8),
                },
            }
        })
    ]
};

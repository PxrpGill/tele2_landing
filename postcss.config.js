import postcssMixins from 'postcss-mixins';
import postcssSimpleVars from 'postcss-simple-vars';
import postcssCalc from 'postcss-calc';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';


export default {
    plugins: [
        postcssMixins(),
        postcssSimpleVars(),
        postcssCalc(),
        autoprefixer(),
        postcssImport(),
    ]
};

import postcssMixins from 'postcss-mixins';
import postcssSimpleVars from 'postcss-simple-vars';
import postcssCalc from 'postcss-calc';
import autoprefixer from 'autoprefixer';

export default {
    plugins: [
        postcssMixins(),
        postcssSimpleVars(),
        postcssCalc(),
        autoprefixer(),
    ]
};

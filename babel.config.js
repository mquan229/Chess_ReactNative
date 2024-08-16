/* eslint-disable prettier/prettier */
module.exports = {
  presets: [
  'module:@react-native/babel-preset',
  '@babel/preset-react',
     ],

    plugins :[
      ["@babel/plugin-transform-react-jsx", {
        "runtime": "automatic"
      }]
    ]
};

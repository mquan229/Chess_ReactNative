module.exports = {
  presets: [
    'module:@react-native/babel-preset',
    '@babel/preset-react',
  ],

  plugins: [
    'react-native-reanimated/plugin', 
    [
      '@babel/plugin-transform-react-jsx',
      {
        runtime: 'automatic',
      },
    ],
  ],
};
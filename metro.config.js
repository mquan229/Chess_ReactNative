const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: [
      'db',
      'mp3',
      'ttf',
      'png',
      'jpg',
      'jpeg',
      'svg', // Add support for SVG files
    ],
    sourceExts: [
      'js',
      'json',
      'ts',
      'tsx',
      'jsx',
      'svg', // Add support for SVG files
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);

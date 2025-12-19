module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-worklets-core/plugin',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          /**
           * Regular expression is used to match all files inside `./src` directory and map each `.src/folder/[..]` to `~folder/[..]` path
           */
          '@src': './src',
          '@modules': './src/modules',
          '@core-components': './src/core-components',
          '@core-services': './src/core-services',
          '@core-stores': './src/core-stores',
          '@core-utils': './src/core-utils',
          '@core-navigations': './src/core-navigations',
          '@core-plugins': './src/core-plugins',
          '@core-constants': './src/core-constants',
          '@i18n': './src/i18n',
          '@themes': './src/themes',
          '@assets': './assets/',
        },
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
      },
    ],
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanCodes'],
      },
    ],
  ],
  sourceMaps: true,
};

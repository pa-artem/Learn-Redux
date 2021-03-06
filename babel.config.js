const plugins = [
  'babel-plugin-styled-components',
  [
    '@babel/plugin-transform-runtime',
    {
      absoluteRuntime: false,
      corejs: false,
      helpers: true,
      regenerator: true,
    },
  ],
  [
    'module-resolver',
    {
      alias: {
        '@app': './src/app',
        '@features': './src/features',
        '@hooks': './src/hooks',
        '@ui-components': './src/ui-components',
        '@global-styles': './src/global-styles',
      },
    },
  ],
];

if (process.env.SERVE) {
  plugins.push('react-refresh/babel');
}

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true,
        },
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins,
};

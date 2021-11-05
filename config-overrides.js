const SassRuleRewire = require('react-app-rewire-sass-rule')
const path = require('path')

module.exports = function override(config, env) {
  require('react-app-rewire-postcss')(config, {
    plugins: (loader) => [require('postcss-rtl')()]
  })

  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      '@api': path.resolve(__dirname, 'src/api'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@classes': path.resolve(__dirname, 'src/classes'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@containers': path.resolve(__dirname, 'src/containers'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@locale': path.resolve(__dirname, 'src/locale'),
      '@navigation': path.resolve(__dirname, 'src/navigation'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@router': path.resolve(__dirname, 'src/router'),
      '@theme': path.resolve(__dirname, 'src/theme'),
      '@utils': path.resolve(__dirname, 'src/utils')
    }
  }

  config = new SassRuleRewire()
    .withRuleOptions({
      test: /\.s[ac]ss$/i,
      use: [
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              includePaths: ['node_modules', 'src/assets']
            }
          }
        }
      ]
    })
    .rewire(config, env)

  return config
}

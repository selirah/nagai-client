const SassRuleRewire = require('react-app-rewire-sass-rule')

module.exports = function override(config, env) {
  require('react-app-rewire-postcss')(config, {
    plugins: (loader) => [require('postcss-rtl')()]
  })

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

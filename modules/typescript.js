export default function () {
  // Nuxt resolves .ts extension
  this.nuxt.options.extensions.push('ts')

  // Extend webpack build
  this.extendBuild((config) => {
    // Add ts-loader to import .ts
    config.module.rules.push({
      test: /\.ts$/,
      loader: 'ts-loader',
      options: { appendTsSuffixTo: [/\.vue$/] }
    })

    // Webpack resolves .ts extension
    if (!config.resolve.extensions.includes('.ts')) {
      config.resolve.extensions.push('.ts')
    }
  })
}

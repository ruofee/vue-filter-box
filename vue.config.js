module.exports = {
  css: {
    extract: false
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.externals = ['vue', 'Vue',]
    }
  }
}
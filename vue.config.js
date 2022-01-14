module.exports = {
  publicPath: process.env.NODE_ENV === 'actual_production'
    ? '/andy_at/'
    : '/'
}

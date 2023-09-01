// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  devtools: { enabled: true },
  build: {
  },

}

module.exports = {
  css: [
    'bootstrap/dist/css/bootstrap.css'
  ],
  plugins: [
    // ...
    { src: '~/plugins/bootstrap.js', mode: 'client' },
  ],
}

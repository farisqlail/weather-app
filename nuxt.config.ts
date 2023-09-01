// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  devtools: { enabled: true },
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
    vendor: ['jquery', 'bootstrap'],
    
  },
  plugins: [
    // ...
    { src: '~/plugins/bootstrap.js', mode: 'client' },
  ],
}

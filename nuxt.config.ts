// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  devtools: { enabled: true },
  build: {
  },
  routeRules: {
    '/examples/*': { redirect: '/redirect-route' },
    '/modify-headers-route': { headers: { 'x-magic-of': 'nuxt and vercel' } },
    '/spa': { ssr: false },
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
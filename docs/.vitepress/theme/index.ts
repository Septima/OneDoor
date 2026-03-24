// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Wide from './layouts/Wide.vue'
import matomo from '@datagouv/vitepress-plugin-matomo'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('wide', Wide)
    matomo({
      router: router,
      siteID: 3,
      trackerUrl: "https://matomo.septima.dk/"
    })
  }
} satisfies Theme

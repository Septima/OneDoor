import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitepress'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'

const version = process.env.npm_package_version
const appPath =
  process.env.NODE_ENV === 'development' || process.env.WIDGET_TARGET === 'dev' ? 'dev' : version
const sitemapBasePath = process.env.FORCE_CDN_LATEST ? `latest` : appPath

export default defineConfig({
  markdown: {
    languageAlias: {
      svg: 'html'
    }
  },
  transformHead({ pageData, siteData }) {
    const head = []
    if (pageData.frontmatter.hidden) {
      head.push(['meta', { name: 'robots', content: 'noindex, nofollow' }])
    }
    if (pageData.frontmatter.title) {
      head.push([
        'meta',
        { property: 'og:title', content: `${pageData.frontmatter.title} | ${siteData.title}` }
      ])
    }
    if (pageData.frontmatter.description) {
      head.push(['meta', { property: 'og:description', content: pageData.frontmatter.description }])
    }
    const canonicalUrl = `https://widget.cdn.septima.dk/${sitemapBasePath}/${pageData.relativePath}`
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '.html')
    head.push(['link', { rel: 'canonical', href: canonicalUrl }])
    return head
  },
  lang: 'da',
  title: 'Septima Widget',
  description: 'Nem og fleksibel integration af kort og geodata i CMS',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: 'https://septima.dk/favicons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        href: 'https://septima.dk/favicons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      }
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        href: 'https://septima.dk/favicons/apple-touch-icon.png',
        sizes: '180x180'
      }
    ],
    ['meta', { property: 'og:locale', content: 'da_DK' }],
    ['meta', { property: 'og:url', content: 'https://septima.dk/showcases/septima-widget' }],
    ['meta', { property: 'og:type', content: 'website' }],
    [
      'meta',
      { property: 'og:image', content: 'https://septima.dk/images/og-images/og-image-widget.jpg' }
    ]
  ],
  appearance: false,
  lastUpdated: true,
  sitemap: {
    hostname: `https://widget.cdn.septima.dk/${sitemapBasePath}/`
  },
  srcExclude: ['**/components/common/*.md', '**/devexamples/*.*'],
  themeConfig: {
    logo: '/img/doc-ui/logo-septima-black.svg',
    siteTitle: false,
    nav: [
      { text: 'Eksempler', link: '/examples' },
      { text: 'Komponenter', link: '/components' },
      { text: 'API', link: '/api' },
      {
        text: `${version}`,
        items: [
          { text: 'Versionsoversigt', link: '/changelog' },
          { text: 'Issuetracker', link: 'https://github.com/Septima/widget-issues/issues' }
        ]
      }
    ],
    search: {
      provider: 'local',
      options: {
        _render(src, env, md) {
          const html = md.render(src, env)
          if (env.relativePath.startsWith('example')) {
            if (env.frontmatter.hidden === true) {
              return ''
            }
            if (env.content.replace(/\\n/g) === '') {
              return ''
            }
          } else if (env.relativePath.startsWith('devexamples')) {
            return ''
          }
          return html
        }
      }
    },
    sidebar: {
      '/components': [
        {
          text: 'Komponenter',
          items: [
            { text: 'Oversigt', link: '/components' },
            { text: 'Map', link: '/components/map' },
            { text: 'Data', link: '/components/data' },
            {
              text: 'Helpers',
              collapsed: false,
              items: [
                {
                  text: 'Layer',
                  link: '/components/helpers/layer',
                  items: [{ text: 'Legend', link: '/components/helpers/legend' }]
                },
                { text: 'Style', link: '/components/helpers/style' },
                { text: 'Template', link: '/components/helpers/template' },
                { text: 'ZoomOptions', link: '/components/helpers/zoomoptions' }
              ]
            },
            {
              text: 'Basis',
              collapsed: false,
              items: [
                { text: 'Analytics', link: '/components/analytics' },
                { text: 'Context', link: '/components/context' },
                { text: 'Directlink', link: '/components/directlink' },
                { text: 'Draw', link: '/components/draw' },
                { text: 'Fullextent', link: '/components/fullextent' },
                { text: 'Fullscreen', link: '/components/fullscreen' },
                { text: 'Google Streetview', link: '/components/googlestreetview' },
                { text: 'Hover', link: '/components/hover' },
                { text: 'Info', link: '/components/info' },
                { text: 'Location', link: '/components/location' },
                { text: 'Maplinks', link: '/components/maplinks' },
                { text: 'Measure', link: '/components/measure' },
                { text: 'Oblique', link: '/components/oblique' },
                { text: 'Overlay', link: '/components/overlay' },
                { text: 'Overviewmap', link: '/components/overviewmap' },
                { text: 'Print', link: '/components/print' },
                { text: 'Search', link: '/components/search' },
                { text: 'Swipe', link: '/components/swipe' },
                { text: 'Upload', link: '/components/upload' },
                { text: 'ZoomToLayer', link: '/components/zoomtolayer' }
              ]
            },
            {
              text: 'Flere',
              collapsed: false,
              items: [
                { text: 'Chart', link: '/components/chart' },
                { text: 'Conflict', link: '/components/conflict' },
                { text: 'Filter', link: '/components/filter' },
                { text: 'Flow', link: '/components/flow' },
                { text: 'Form', link: '/components/form' },
                { text: 'HTML', link: '/components/html' },
                { text: 'Højdeprofil', link: '/components/profile' },
                { text: 'Image', link: '/components/image' },
                { text: 'Kommuneplan', link: '/components/kommuneplan' },
                { text: 'Locate', link: '/components/locate' },
                { text: 'Showpoint', link: '/components/showpoint' },

                { text: 'Layerfilter', link: '/components/layerfilter' },
                { text: 'Layerswitch', link: '/components/layerswitch' },
                { text: 'Layerswitch2', link: '/components/layerswitch2' },
                { text: 'Layertoggle', link: '/components/layertoggle' },
                { text: 'Route', link: '/components/route' },
                { text: 'Routing', link: '/components/routing' },

                { text: 'Story', link: '/components/story' },
                { text: 'Table', link: '/components/table' }
              ]
            }
          ]
        }
      ]
    },
    outline: {
      label: 'På denne side'
    },
    returnToTopLabel: 'Gå til toppen',
    docFooter: {
      prev: 'Forrige',
      next: 'Næste'
    },
    lastUpdated: {
      text: 'Opdateret',
      formatOptions: {
        dateStyle: 'short'
      }
    },
    footer: {
      copyright: 'Septima Widget · <a href="https://septima.dk/" target="_blank">Septima</a>'
    }
  },
  vite: {
    publicDir: '../public',
    plugins: [
      pagefindPlugin({
        btnPlaceholder: 'Søg i Septima Widget',
        placeholder: 'Søg i dokumentation og eksempler',
        emptyText: 'Skriv det du gerne vil finde noget om',
        heading: '{{searchResult}} sider',
        showDate: false,
        pageResultCount: 7,
        excludeSelector: ['#eksempler', '.examples', '.components', '.details.custom-block'],
        filter(searchItem) {
          if (searchItem.meta.hidden === true) {
            return false
          }
          return !searchItem.route.includes('devexamples')
        }
      })
    ],
    define: {
      __APP_VERSION__: JSON.stringify(version),
      __APP_PATH__: JSON.stringify(appPath)
    },
    resolve: {
      alias: {
        '@/api/widgetapi': () => {
          if (process.env.FORCE_CDN_LATEST) {
            return `https://widget.cdn.septima.dk/latest/widgetapi.mjs`
          } else if (process.env.NODE_ENV === 'production') {
            return `https://widget.cdn.septima.dk/${appPath}/widgetapi.mjs`
          } else {
            return fileURLToPath(new URL('../../src/api/widgetapi.js', import.meta.url))
          }
        },
        '@': () => {
          return fileURLToPath(new URL('../../src', import.meta.url))
        },
        '@components': fileURLToPath(new URL('../sitecomponents', import.meta.url))
      }
    }
  }
})

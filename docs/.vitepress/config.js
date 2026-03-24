import { defineConfig } from 'vitepress'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const packageJson = JSON.parse(
  readFileSync(join(__dirname, '../../package.json'), 'utf-8')
)
const oneDoorVersion =
  packageJson?.dependencies?.['@septima/onedoor-server'] ??
  packageJson?.devDependencies?.['@septima/onedoor-server'] ??
  process.env.ONEDOOR_VERSION ??
  '1.0.0'
const version = String(oneDoorVersion).replace(/^\D+/, '')

export default defineConfig({
  lang: 'da',
  title: 'OneDoor',
  description: 'Formidling af geografiske data',
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
    ]
  ],
  appearance: false,
  lastUpdated: true,
  themeConfig: {
    logo: '/img/doc-ui/logo-septima-black.svg',
    siteTitle: false,
    nav: [
      { text: 'Quickguide', link: '/quickguide/installation' },
      { text: 'Examples', link: '/examples/' },
      { text: 'Reference', link: '/api/reference' },
      {
        text: `v${version}`,
        items: [
          { text: 'Versionsoversigt', link: '/changelog' },
          { text: 'Issuetracker', link: 'https://github.com/Septima/OneDoor/issues' },
          { text: 'Discussions', link: 'https://github.com/Septima/OneDoor/discussions' },
          { text: 'Wiki', link: 'https://github.com/Septima/OneDoor/wiki' }
        ]
      }
    ],
    search: {
      provider: 'local'
    },
    sidebar: {
      '/quickguide/': [
        {
          text: 'Quickguide',
          items: [
            { text: 'Installation', link: '/quickguide/installation' },
            { text: 'Konfiguration', link: '/quickguide/configuration' }
          ]
        }
      ],
      '/examples/': [
        {
          text: 'Examples',
          items: [
            { text: 'Oversigt', link: '/examples/' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'Reference',
          items: [
            { text: 'API Reference', link: '/api/reference' }
          ]
        }
      ],
      '/changelog': [
        {
          text: 'Dokumentation',
          items: [
            { text: 'Versionsoversigt', link: '/changelog' }
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
      copyright: 'OneDoor · <a href="https://septima.dk/" target="_blank">Septima</a>'
    }
  }
})

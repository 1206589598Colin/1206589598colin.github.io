const { description } = require('../../package')
const { getSidebar } = require('./config/sidebar/index');
module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: '一名GO+PHP工程师',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    // logo: 'https://gitee.com/static/images/logo-black.svg?t=158106664',
    nav: [
      {
        text: '码云Gitee',
        link: 'https://gitee.com/ColinWWL/blog'
      }
      // ,
      // {
      //   text: 'Vuepress',
      //   link: 'https://vuepress2.netlify.app/zh/guide/'
      // }
    ],
    sidebar: getSidebar(),
    lastUpdated: "上次更新"
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    ['@vuepress/plugin-back-to-top'],
    ['@vuepress/plugin-medium-zoom'],
    ['vuepress-plugin-mermaidjs'],
    ['@markspec/vuepress-plugin-plantuml'],
    ['@vuepress/medium-zoom'],
  ],
  // base: '/blog/',
  base: '/',
  markdown: {
    extendMarkdown: md => {
      md.set({ breaks: true })
      md.use(require('markdown-it-plantuml'), {
        imageFormat: 'png',
        openMarker: '``` plantuml',
        closeMarker: '```',
        server: 'http://172.18.0.3:8080'
      })
    }
  }
}
import { defineConfig } from 'vitepress'

// NOTE: vitepress-sidebar will help.

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Unreally",
  description: "Unreal Engine User Interface Notes",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/test/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Site',
        items: [
          { text: 'Journal', link: '/journal' },
          { text: 'Documentation', link: '/documentation' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/morklympious/unreally' }
    ]
  }
})

import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'GPU Mesh',
  description: 'document for GPU Mesh',
  themeConfig: {
    nav: [{ text: 'Home', link: '/' }],
    sidebar: {},
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ccjr1120/gpu-mesh' }
    ]
  }
})

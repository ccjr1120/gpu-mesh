import { DefaultTheme, defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'

// 加载示例中的所有meshes
export function loadExampleMeshes() {
  // 获取所有文件夹
  const exampleDir = path.resolve(__dirname, '../examples/components/meshes')
  const exampleFolders = fs.readdirSync(exampleDir)
  // 遍历每个文件夹, 得到options,vertex,fragment
  return exampleFolders.reduce((pre, folder) => {
    pre[folder] = {
      options: fs.readFileSync(
        path.resolve(exampleDir, folder, 'options.js'),
        'utf-8'
      ),
      vertex: fs.readFileSync(
        path.resolve(exampleDir, folder, 'vert.wgsl'),
        'utf-8'
      ),
      fragment: fs.readFileSync(
        path.resolve(exampleDir, folder, 'frag.wgsl'),
        'utf-8'
      )
    }
    return pre
  }, {})
}
// 将目录转换成sidebar
function transformSidebar(dir: string) {
  const fullPath = path.resolve(__dirname, dir)
  const files = fs.readdirSync(fullPath)
  const sidebarKey = fullPath.split('/').pop()!
  const items = files.map((file) => {
    if (file === 'index.md') {
      return { text: 'Getting Started', link: `/${sidebarKey}/` }
    }
    const fileName = file.replace('.md', '')
    return { text: fileName, link: `/${sidebarKey}/${fileName}` }
  })
  return {
    [sidebarKey]: {
      text: sidebarKey,
      items
    }
  }
}
export default defineConfig({
  title: 'GPU Mesh',
  description: 'document for GPU Mesh',
  base: '/gpu-mesh/',
  themeConfig: {
    nav: [{ text: 'Home', link: '/' }],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ccjr1120/gpu-mesh' }
    ],
    sidebar: ['../guide'].map(transformSidebar).reduce((pre, cur) => {
      const [k, v] = Object.entries(cur)[0]!
      pre[k] = v
      return pre
    }, {} as DefaultTheme.Sidebar)
  },
  vite: {
    define: {
      __MESHES: JSON.stringify(loadExampleMeshes())
    },
    ssr: {
      noExternal: ['monaco-editor']
    }
  }
})

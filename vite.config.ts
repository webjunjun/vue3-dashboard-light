import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// 在vite的配置文件里是加载不了环境变量的 需要使用 loadEnv 去加载
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log(env.VITE_APP_BASE_API)

  return {
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      AutoImport({
        // 可以自动引入的库
        imports: ['vue', 'vue-router', '@vueuse/core'],
        dts: true,
        eslintrc: {
          enabled: true, // 是否自动生成 eslint 规则，建议生成之后设置 false 
          filepath: './.eslintrc-auto-import.json', // 指定自动导入函数 eslint 规则的文件
        },
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [fileURLToPath(new URL('./src/assets/icons', import.meta.url))],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        // 引入全局变量文件
        scss: {
          // 全局导入scss 以下两种形式都可以 在其他组件再次引入会报错
          // additionalData: '@import "@/styles/variables.scss";'
          additionalData: `@use "@/styles/variables.scss" as *;`
        }
      }
    },
    server: {
      host: '0.0.0.0', // 显示IP地址开发方式
      port: 9527,
      strictPort: false, // 端口号被占用就使用下一个
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-credentials': 'true',
        'access-control-allow-methods': 'POST, GET, PUT, OPTIONS, DELETE'
      },
      // proxy: {
      //   '/api': {
      //     target: 'http://localhost',
      //     changeOrigin: true,
      //     ws: true,
      //     rewrite: (path: string) => path.replace(/^\/api/, ''),
      //   },
      // }
    }
  }
})

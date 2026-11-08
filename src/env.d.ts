/// <reference types="vite/client" />

// vite-plugin-svg-icons 提供的虚拟模块
declare module 'virtual:svg-icons-register'

//声明window上自定义属性，如事件总线
declare interface Window {
  // eventBus: any;
  pendingMap: Map<string, AbortController>;
}

interface ImportMetaEnv {
  readonly VITE_APP_TOKEN: string
  readonly VITE_APP_APPID: string
  readonly VITE_APP_SECRET: string
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}

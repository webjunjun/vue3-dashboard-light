import { readFileSync } from 'node:fs'

import pluginVue from 'eslint-plugin-vue'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// unplugin-auto-import 生成的全局变量声明（eslintrc 格式 JSON）
const autoImportGlobals = JSON.parse(
  readFileSync(new URL('./.eslintrc-auto-import.json', import.meta.url), 'utf-8')
).globals

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}']
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**']
  },
  pluginVue.configs['flat/essential'],
  vueTsConfigs.recommended,
  skipFormatting,
  {
    name: 'app/auto-import-globals',
    languageOptions: {
      globals: autoImportGlobals
    }
  }
)

import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          // 主要品牌色系
          primary: '#435A4F', // 原 bs-primary
          secondary: '#C38154', // 原 bs-secondary
          success: '#198754', // 原 bs-success
          info: '#8B4513', // 原 bs-info
          warning: '#FFC107', // 原 bs-warning
          error: '#DC3545', // 原 bs-danger (Vuetify 使用 error 替代 danger)

          // 基礎色系
          background: '#F6F4E8', // 原 bs-body-bg
          surface: '#F6F4E8', // 與背景色統一

          // 灰階色系
          'gray-100': '#EBE0D4', // 原 bs-gray-100
          'gray-200': '#DECEBD', // 原 bs-gray-200
          'gray-300': '#D1BCA7', // 原 bs-gray-300
          'gray-400': '#C4AA90', // 原 bs-gray-400
          'gray-500': '#B7987A', // 原 bs-gray-500
          'gray-600': '#AA8664', // 原 bs-gray-600
          'gray-700': '#9D744D', // 原 bs-gray-700
          'gray-800': '#906237', // 原 bs-gray-800
          'gray-900': '#835021', // 原 bs-gray-900

          // 文字相關
          'on-background': '#835021', // 原 bs-body-color
          'on-surface': '#835021', // 主要文字顏色
        },
      },
    },
  },
})

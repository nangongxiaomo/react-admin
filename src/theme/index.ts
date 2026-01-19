import { type ThemeConfig } from 'antd'

export const getAeroTheme = (isDarkMode: boolean): ThemeConfig => {
  return {
    token: {
      colorPrimary: '#7c3aed', // Violet 600
      colorInfo: '#7c3aed',
      borderRadius: 8,
      fontSize: 14,
      // 这里的关键：暗色模式下使用带有微弱紫色调的深灰
      colorBgLayout: isDarkMode ? '#020617' : '#f8fafc', // Slate 950 : Slate 50
      colorBgContainer: isDarkMode ? '#0f172a' : '#ffffff', // Slate 900 : White
      colorBgElevated: isDarkMode ? '#1e293b' : '#ffffff', // Slate 800 (弹窗/下拉框)

      // 文字颜色：暗色模式下避免纯白，使用 Slate 200 更有质感
      colorTextBase: isDarkMode ? '#e2e8f0' : '#1e293b',
      colorBorderSecondary: isDarkMode ? '#1e293b' : '#f1f5f9'
    },
    components: {
      Layout: {
        headerBg: isDarkMode ? '#0f172a' : '#ffffff',
        siderBg: isDarkMode ? '#0f172a' : '#ffffff',
        headerHeight: 64
      },
      Menu: {
        // 侧边栏菜单的高级感
        itemBg: 'transparent',
        itemSelectedBg: isDarkMode ? 'rgba(124, 58, 237, 0.15)' : '#f5f3ff',
        itemSelectedColor: isDarkMode ? '#a78bfa' : '#7c3aed',
        itemHoverBg: isDarkMode ? 'rgba(255, 255, 255, 0.04)' : '#f5f3ff',
        itemActiveBg: 'transparent',
        activeBarBorderWidth: 0,
        itemMarginInline: 10,
        itemBorderRadius: 8
      },
      Button: {
        controlHeight: 38,
        // 暗色模式按钮去掉边框，用背景色区分
        colorBorder: isDarkMode ? '#334155' : '#d9d9d9'
      },
      Card: {
        // 暗色模式下卡片加个浅浅的边框，而不是阴影
        colorBorderSecondary: isDarkMode ? '#1e293b' : '#f1f5f9'
      },
      Input: {
        colorBgContainer: isDarkMode ? '#1e293b' : '#ffffff',
        colorBorder: isDarkMode ? '#334155' : '#d9d9d9'
      }
    }
  }
}

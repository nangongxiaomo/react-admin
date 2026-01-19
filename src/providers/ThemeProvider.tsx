import { ConfigProvider, theme, App as AntdApp } from 'antd'
import { useThemeStore } from '@/stores/theme'
import { getAeroTheme } from '@/theme'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // 这里使用 hook，当 isDarkMode 改变时，此组件会重新渲染
  const isDarkMode = useThemeStore(state => state.isDarkMode)

  return (
    <ConfigProvider
      theme={{
        zeroRuntime: true,
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        ...getAeroTheme(isDarkMode)
      }}
    >
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  )
}

import { ConfigProvider, theme, App as AntdApp } from 'antd'
import { useThemeStore } from '@/stores/theme'
import { getAeroTheme } from '@/theme'
import { useShallow } from 'zustand/react/shallow'

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useThemeStore(useShallow(state => state.isDarkMode))

  return (
    <ConfigProvider
      theme={{
        zeroRuntime: true,
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        ...getAeroTheme(isDarkMode)
      }}
    >
      <AntdApp message={{ maxCount: 3 }}>{children}</AntdApp>
    </ConfigProvider>
  )
}

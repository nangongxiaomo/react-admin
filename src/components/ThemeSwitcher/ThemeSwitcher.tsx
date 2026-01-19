import { useThemeStore } from '@/stores/theme'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'

export function ThemeSwitcher() {
  const { isDarkMode, toggleTheme } = useThemeStore()

  return (
    <Tooltip title={isDarkMode ? '切换到亮色模式' : '切换到暗色模式'}>
      <Button
        type="text"
        shape="circle"
        onClick={toggleTheme}
        className="flex items-center justify-center text-lg"
        icon={isDarkMode ? <SunOutlined className="text-yellow-400" /> : <MoonOutlined className="text-violet-600" />}
      />
    </Tooltip>
  )
}

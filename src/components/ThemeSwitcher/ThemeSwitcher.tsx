import { useThemeStore } from '@/stores/theme'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'
import { Tooltip, Switch } from 'antd'

export function ThemeSwitcher() {
  const { isDarkMode, toggleTheme } = useThemeStore()

  return (
    <Tooltip title="切换模式">
      <Switch
        onChange={toggleTheme}
        defaultChecked={isDarkMode}
        checked={isDarkMode}
        unCheckedChildren={<SunOutlined className="text-yellow-400" />}
        checkedChildren={<MoonOutlined className="text-violet-600" />}
      />
    </Tooltip>
  )
}

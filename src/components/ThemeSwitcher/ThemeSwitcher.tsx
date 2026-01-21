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
        styles={{ root: { backgroundColor: '#7f22fe' } }}
        unCheckedChildren={<SunOutlined />}
        checkedChildren={<MoonOutlined />}
      />
    </Tooltip>
  )
}

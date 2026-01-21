import { Layout, Avatar, Tooltip, theme } from 'antd'
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher'
import { useShallow } from 'zustand/react/shallow'
import { useUserStore } from '@/stores/user'
import { useNavigate } from 'react-router'

export default function Header() {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const { user, logout } = useUserStore(useShallow(state => ({ user: state.user, logout: state.logout })))
  const navigate = useNavigate()

  return (
    <Layout.Header className="flex items-center gap-x-4 justify-end px-4" style={{ background: colorBgContainer }}>
      <ThemeSwitcher />
      <div
        className="flex items-center gap-4 cursor-pointer hover:drop-shadow-md"
        onClick={() => {
          logout()
          navigate('/login', { replace: true })
        }}
      >
        <Tooltip title="点击头像退出登录">
          <Avatar size={36}>{user?.name}</Avatar>
        </Tooltip>
      </div>
    </Layout.Header>
  )
}

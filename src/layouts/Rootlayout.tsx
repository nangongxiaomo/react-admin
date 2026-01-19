import { Suspense, useLayoutEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { STORAGE_KEYS } from '@/constants'
import { Layout, theme, Avatar, Tooltip } from 'antd'
import { useShallow } from 'zustand/react/shallow'
import { useAuthStore } from '@/stores/user'
import Sidebar from '@/components/Sidebar/Sidebar'
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher'

const { Header, Content } = Layout

function Rootlayout() {
  const { user, logout } = useAuthStore(useShallow(state => ({ user: state.user, logout: state.logout })))
  const location = useLocation()
  const navigate = useNavigate()

  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken()

  useLayoutEffect(() => {
    const user = localStorage.getItem(STORAGE_KEYS.AUTH_STORAGE)
    if (!user) {
      navigate('/login', { replace: true })
    }
  }, [location.pathname, navigate])

  if (!user) {
    return null
  }

  return (
    <Layout className="h-screen w-screen overflow-hidden">
      <Sidebar />
      <Layout>
        <Header className="flex items-center gap-x-2 justify-end px-4" style={{ background: colorBgContainer }}>
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
        </Header>

        <Content className="p-6 overflow-auto">
          <div className="min-h-full  p-6" style={{ borderRadius: borderRadiusLG, background: colorBgContainer }}>
            <Suspense>
              <Outlet />
            </Suspense>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Rootlayout

import { Suspense, useLayoutEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { STORAGE_KEYS } from '@/constants'
import { Layout, theme } from 'antd'
import { useShallow } from 'zustand/react/shallow'
import { useUserStore } from '@/stores/user'
import Sidebar from '@/components/Sidebar/Sidebar'
import Header from '@/components/Header/Header'

function Rootlayout() {
  const { user } = useUserStore(useShallow(state => ({ user: state.user })))
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
        <Header />
        <Layout.Content className="p-6 overflow-auto">
          <div className="min-h-full  p-6" style={{ borderRadius: borderRadiusLG, background: colorBgContainer }}>
            <Suspense>
              <Outlet />
            </Suspense>
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}

export default Rootlayout

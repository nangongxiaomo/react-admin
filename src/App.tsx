import { createBrowserRouter, RouterProvider } from 'react-router'
import { transformMenuToRoutes, getRouterConfig } from '@/router'
import { useUserStore } from './stores/user'
import { useShallow } from 'zustand/react/shallow'
import { AntdStaticSetter } from './utils/AntdGlobal'

export default function App() {
  const user = useUserStore(useShallow(state => state.user))

  const router = () => {
    const dynamicRoutes = transformMenuToRoutes(user?.menuList || [])
    const fullConfig = getRouterConfig(dynamicRoutes)
    return createBrowserRouter(fullConfig)
  }

  return (
    <>
      <AntdStaticSetter />
      <RouterProvider router={router()} />
    </>
  )
}

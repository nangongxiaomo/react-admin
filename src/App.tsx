import { createBrowserRouter, RouterProvider } from 'react-router'
import { transformMenuToRoutes, getRouterConfig } from '@/router'
import { useAuthStore } from './stores/user'
import { useShallow } from 'zustand/react/shallow'

export default function App() {
  const user = useAuthStore(useShallow(state => state.user))

  const router = () => {
    const dynamicRoutes = transformMenuToRoutes(user?.menuList || [])
    const fullConfig = getRouterConfig(dynamicRoutes)
    return createBrowserRouter(fullConfig)
  }

  return <RouterProvider router={router()} />
}

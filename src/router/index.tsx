import { type RouteObject, redirect } from 'react-router'
import Rootlayout from '@/layouts/Rootlayout'
import { STORAGE_KEYS } from '@/constants'

const modules = import.meta.glob([
  '/src/pages/*/*.tsx',
  '!/src/pages/Login/**', // 排除 Login
  '!/src/pages/NotFound/**' // 排除 NotFound
])
export const transformMenuToRoutes = (menuList: MenuItem[] | null): RouteObject[] => {
  if (!menuList) return []
  const filteredMenuList = menuList.filter(item => item.component)
  return filteredMenuList.map(item => {
    const componentPath = `/src/pages/${item.component}/${item.component}.tsx`
    const importFn = modules[componentPath]
    if (!importFn) {
      console.warn(`未找到匹配组件: ${componentPath}，请检查文件名是否严格一致。`)
      return {
        path: item.url.replace(/^\//, ''),
        element: <div>页面组件 {item.component} 开发中...</div>
      }
    }

    return {
      index: item.url === '/',
      path: item.url.replace(/^\//, ''),
      lazy: async () => {
        const module = (await importFn()) as { default: React.ComponentType<Record<string, unknown>> }
        return { Component: module.default }
      }
    }
  })
}

/**
 * 基础静态路由结构
 * @param dynamicChildren 动态生成的子路由
 */
export const getRouterConfig = (dynamicChildren: RouteObject[] = []): RouteObject[] => [
  {
    path: '/',
    element: <Rootlayout />,
    HydrateFallback: hydrateFallbackElement,
    loader: () => {
      const user = localStorage.getItem(STORAGE_KEYS.AUTH_STORAGE)
      if (!user) return redirect('/login')
      return null
    },
    children: [
      ...dynamicChildren,
      {
        path: '*',
        lazy: async () => ({ Component: (await import('../pages/NotFound/NotFound.tsx')).default })
      }
    ]
  },
  {
    path: '/login',
    HydrateFallback: hydrateFallbackElement,
    loader: () => {
      const user = localStorage.getItem(STORAGE_KEYS.AUTH_STORAGE)
      if (user) return redirect('/')
      return null
    },
    lazy: async () => ({ Component: (await import('../pages/Login/Login.tsx')).default })
  }
]
function hydrateFallbackElement() {
  return null
}

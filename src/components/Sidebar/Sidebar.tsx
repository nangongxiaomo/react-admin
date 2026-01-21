import { useUserStore } from '@/stores/user'
import * as Icons from '@ant-design/icons'
import { Menu, Layout, theme } from 'antd'
import React from 'react'
import { useNavigate, useLocation } from 'react-router'
import { useShallow } from 'zustand/react/shallow'

const iconMap = (iconName: string) => {
  const IconComponent = Icons[iconName as keyof typeof Icons]
  return IconComponent ? React.createElement(IconComponent as React.ComponentType) : <Icons.DesktopOutlined />
}

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { menuList } = useUserStore(useShallow(state => ({ menuList: state.user?.menuList })))
  const { token } = theme.useToken()

  const menuItems =
    menuList?.map(item => ({
      key: item.url,
      label: item.name,
      icon: iconMap(item.icon as never),
      children:
        (item.children?.length ?? 0) > 0
          ? item.children?.map((child: MenuItem) => ({
              key: child.url,
              label: child.name,
              icon: iconMap(child.icon as never)
            }))
          : null
    })) ?? []

  return (
    <Layout.Sider trigger={null} collapsible width={240} className="shadow-md" style={{ background: token.colorBgContainer }}>
      <div className="text-xl font-black py-6 text-center tracking-tighter" style={{ color: token.colorTextBase }}>
        LOGO
        <span className="text-indigo-500">.</span>
      </div>
      <Menu mode="inline" selectedKeys={[location.pathname]} items={menuItems} onClick={({ key }) => navigate(key)} />
    </Layout.Sider>
  )
}

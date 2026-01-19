declare interface MenuItem {
  name: string
  url: string
  icon?: React.ReactNode
  component?: React.ReactNode
  children?: MenuItem[]
}
declare interface User {
  name: string
  token: string
  email: string
  menuList: MenuItem[] | null
  id: string
}


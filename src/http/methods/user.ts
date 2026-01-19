import { alova } from '../index'

export const login = ({ email, password }: { email: string; password: string }) =>
  alova.Post<User>('/login', {
    email,
    password
  })

import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { STORAGE_KEYS } from '../../constants'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}
export const useUserStore = create<AuthState>()(
  devtools(
    persist(
      set => ({
        user: null,
        isAuthenticated: localStorage.getItem(STORAGE_KEYS.AUTH_STORAGE) !== null,
        login: user => set({ user, isAuthenticated: true }),
        logout: () => {
          set({ user: null, isAuthenticated: false })
          localStorage.removeItem(STORAGE_KEYS.AUTH_STORAGE)
        }
      }),
      {
        name: 'auth-storage'
      }
    )
  )
)

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '@/constants'

interface ThemeState {
  isDarkMode: boolean
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      isDarkMode: false,
      toggleTheme: () =>
        set(state => {
          const nextMode = !state.isDarkMode
          if (nextMode) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          return { isDarkMode: nextMode }
        })
    }),
    { name: STORAGE_KEYS.THEME_STORAGE }
  )
)

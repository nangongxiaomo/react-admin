export const STORAGE_KEYS = {
  AUTH_STORAGE: 'auth-storage',
  THEME_STORAGE: 'theme-storage'
} as const

export const HTTP_CODE = {
  ERR_OK: 200, //数据请求成功
  ERR_DATA_NULL: 500,
  ERR_OVER: 100,
  ERR_NULL: 401,
  ERR_BAD: 400,
  ERR_TIMEOUT: 'timeout'
} as const

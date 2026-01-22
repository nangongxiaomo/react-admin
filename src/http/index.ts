import { createAlova } from 'alova'
import reactHook from 'alova/react'
import { axiosRequestAdapter } from '@alova/adapter-axios'
import { antdUtils } from '../utils/AntdGlobal'
import { HTTP_CODE } from '../constants'
import { useUserStore } from '../stores/user'

export type Response<T> = {
  code: number
  msg: string
  data: T
}
const TIMEOUT = 10000

export const alova = createAlova({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  statesHook: reactHook,
  timeout: TIMEOUT,
  cacheLogger: import.meta.env.DEV,
  requestAdapter: axiosRequestAdapter(),
  async beforeRequest(method) {
    if (!method.meta?.auth) {
      return
    }
    method.config.headers['token'] = useUserStore.getState()?.user?.token ?? ''
  },
  responded: {
    onSuccess: async response => {
      if (response.status !== HTTP_CODE.ERR_OK) {
        return Promise.reject(response.statusText)
      }

      if (response.data.code !== HTTP_CODE.ERR_OK) {
        return Promise.reject(response.data.msg)
      }

      return response.data.data
    },
    onError: error => {
      const err = error.toString()
      if (err.includes(HTTP_CODE.ERR_TIMEOUT)) {
        antdUtils.message?.error('网络超时, 请稍后重试')
      }
      return Promise.reject(err)
    }
  }
})

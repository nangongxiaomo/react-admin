import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import reactHook from 'alova/react'

import { HTTP_CODE } from '../constants'
import { useAuthStore } from '../stores/user'

const TIMEOUT = 10000

export const alova = createAlova({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  statesHook: reactHook,
  timeout: TIMEOUT,
  cacheLogger: import.meta.env.DEV,
  requestAdapter: adapterFetch(),
  async beforeRequest(method) {
    if (!method.meta?.auth) {
      return
    }
    method.config.headers['token'] = useAuthStore.getState()?.user?.token ?? ''
  },
  responded: {
    onSuccess: async (response, method) => {
      if (response.status !== HTTP_CODE.ERR_OK) {
        console.log(`接口请求失败:${method.url}`)
        return Promise.reject(response.statusText)
      }
      const json = await response.json()

      if (json.code !== HTTP_CODE.ERR_OK) {
        console.log(`接口内容异常:${method.url}`)
        return Promise.reject(json.msg)
      }

      return json.data
    },
    onError: error => {
      const err = error.toString()
      const msg = err.includes(HTTP_CODE.ERR_TIMEOUT) ? HTTP_CODE.ERR_TIMEOUT : err
      return Promise.reject(msg)
    }
  }
})

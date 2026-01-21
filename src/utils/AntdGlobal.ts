import { useEffect } from 'react'
import { App } from 'antd'
import type { MessageInstance } from 'antd/es/message/interface'
import type { ModalStaticFunctions } from 'antd/es/modal/confirm'
import type { NotificationInstance } from 'antd/es/notification/interface'

interface AntdStaticMethods {
  message: MessageInstance | null
  modal: Omit<ModalStaticFunctions, 'warn'> | null
  notification: NotificationInstance | null
}

// 依然维持这个全局对象
export const antdUtils: AntdStaticMethods = {
  message: null,
  modal: null,
  notification: null
}

export const AntdStaticSetter = () => {
  const { message, modal, notification } = App.useApp()

  useEffect(() => {
    antdUtils.message = message
    antdUtils.modal = modal
    antdUtils.notification = notification

    return () => {
      antdUtils.message = null
      antdUtils.modal = null
      antdUtils.notification = null
    }
  }, [message, modal, notification])

  return null
}

import { Button, Result } from 'antd'
import { useNavigate } from 'react-router'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <Result
      status="404"
      title="404"
      subTitle="页面已消失在星空了"
      extra={
        <Button type="primary" onClick={() => navigate(-1)}>
          返回上一页
        </Button>
      }
    />
  )
}

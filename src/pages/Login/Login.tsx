import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { blobs } from './animateData'
import { useNavigate } from 'react-router'
import { useAuthStore } from '@/stores/user'
import { useShallow } from 'zustand/react/shallow'
import { login } from '@/http/methods/user'
import { message } from 'antd'

const loginSchema = z.object({
  email: z.email('请输入有效的电子邮箱地址'), // Zod 自带强大的邮箱格式校验
  password: z.string().min(6, '密码长度至少为 6 位').max(20, '密码长度最多 20 位')
})
type LoginFormValues = z.infer<typeof loginSchema>

export default function Login() {
  const [messageApi] = message.useMessage()
  const navigate = useNavigate()
  const loginDispatch = useAuthStore(useShallow(state => state.login))
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  })
  const onSubmit = async ({ email, password }: LoginFormValues) => {
    try {
      const res = await login({ email, password })
      loginDispatch(res)
      navigate('/')
    } catch (error) {
      messageApi.error('登录失败')
      console.log(error)
    }
  }
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="fixed inset-0 z-0 pointer-events-none">
        {blobs.map((blob, i) => (
          <div
            key={i}
            className={`absolute size-162.5 rounded-full blur-[130px] animate-random-float ${blob.color} mix-blend-multiply dark:mix-blend-soft-light`}
            style={
              {
                left: blob.left,
                top: blob.top,
                '--x1': blob.x1,
                '--y1': blob.y1,
                '--x2': blob.x2,
                '--y2': blob.y2,
                '--x3': blob.x3,
                '--y3': blob.y3,
                animationDelay: blob.delay
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <div className="z-10 w-full max-w-md">
        <div className="rounded-2xl border border-white/20 bg-white/70 p-8 shadow-2xl backdrop-blur-xl dark:border-white/5 dark:bg-zinc-900/70">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">欢迎回来</h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">请登录您的账号以继续</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">邮箱地址</label>
              <input
                {...register('email')}
                type="email"
                name="email"
                className="mt-1 block w-full rounded-lg border border-zinc-200 bg-white/50 px-4 py-2.5 text-zinc-900 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-white"
                placeholder="name@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">密码</label>
              <input
                {...register('password')}
                type="password"
                name="password"
                className="mt-1 block w-full rounded-lg border border-zinc-200 bg-white/50 px-4 py-2.5 text-zinc-900 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-800 dark:bg-zinc-950/50 dark:text-white"
                placeholder="输入密码"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="group relative flex w-full cursor-pointer items-center justify-center rounded-lg bg-zinc-900 py-3 text-sm font-semibold text-white transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-indigo-600 dark:hover:bg-indigo-500"
            >
              {isSubmitting ? '登录中...' : '立即登录'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

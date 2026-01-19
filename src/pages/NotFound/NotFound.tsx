import { useNavigate } from 'react-router'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-zinc-950">
      <div className="text-center">
        <p className="text-6xl font-black tracking-tighter text-indigo-600 dark:text-indigo-500">404</p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">页面消失在星空了</h1>

        <p className="mt-6 text-base leading-7 text-zinc-600 dark:text-zinc-400">抱歉，我们找不到您要寻找的页面。它可能已被移动或删除。</p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          {/* 返回上一页按钮 */}
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer text-sm font-semibold text-zinc-900 dark:text-zinc-200 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            返回上一页 <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </div>

      {/* 装饰用的背景模糊圆影 */}
      <div className="fixed -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden blur-3xl">
        <div className="aspect-square size-80 bg-linear-to-tr from-indigo-500/20 to-purple-500/20 opacity-50 rounded-full" />
      </div>
    </main>
  )
}

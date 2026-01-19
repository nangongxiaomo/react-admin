const colors = ['bg-indigo-500/30', 'bg-purple-500/30', 'bg-emerald-500/20', 'bg-pink-500/20', 'bg-blue-500/20']
export const blobs = colors.map((color, i) => ({
  color,
  // 初始位置：将屏幕分成几个区域，确保每个象限都有色块
  left: `${(i % 2 === 0 ? 10 : 60) + Math.random() * 20}%`,
  top: `${(i < 2 ? 10 : 60) + Math.random() * 20}%`,
  x1: `${(Math.random() - 0.5) * 60}vw`,
  y1: `${(Math.random() - 0.5) * 60}vh`,
  x2: `${(Math.random() - 0.5) * 60}vw`,
  y2: `${(Math.random() - 0.5) * 60}vh`,
  x3: `${(Math.random() - 0.5) * 60}vw`,
  y3: `${(Math.random() - 0.5) * 60}vh`,
  delay: `${Math.random() * -20}s`
}))

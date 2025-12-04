export const metadata = {
  title: 'Spotlight 搜索',
  description: 'macOS 风格搜索页',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}

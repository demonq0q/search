export const metadata = {
  title: 'NewTab',
  description: 'macOS 风格搜索页',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}

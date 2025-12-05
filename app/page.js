'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  const [query, setQuery] = useState('')
  const [engine, setEngine] = useState('google')
  const [isFocused, setIsFocused] = useState(false)
  const [time, setTime] = useState(new Date())
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (!query.trim()) return
    
    const urls = {
      google: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      bing: `https://www.bing.com/search?q=${encodeURIComponent(query)}`
    }
    window.open(urls[engine], '_blank')
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })
  }

  const theme = isDark ? darkTheme : lightTheme

  return (
    <div style={{...styles.container, background: theme.background}}>
      {/* 主题切换按钮 */}
      <button 
        onClick={() => setIsDark(!isDark)} 
        style={styles.themeToggle}
        title={isDark ? '切换日间模式' : '切换夜间模式'}
      >
        {isDark ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        )}
      </button>

      {/* 时间显示 */}
      <div style={styles.timeContainer}>
        <div style={{...styles.time, color: theme.timeColor}}>{formatTime(time)}</div>
        <div style={{...styles.date, color: theme.dateColor}}>{formatDate(time)}</div>
      </div>

      {/* 搜索引擎 Logo 切换 */}
      <div style={styles.logoSwitch}>
        <button
          onClick={() => setEngine('google')}
          style={{
            ...styles.logoBtn,
            opacity: engine === 'google' ? 1 : 0.4,
            transform: engine === 'google' ? 'scale(1.1)' : 'scale(1)',
            background: engine === 'google' ? theme.logoBtnActive : 'transparent'
          }}
        >
          <svg height="28" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </button>
        <button
          onClick={() => setEngine('bing')}
          style={{
            ...styles.logoBtn,
            opacity: engine === 'bing' ? 1 : 0.4,
            transform: engine === 'bing' ? 'scale(1.1)' : 'scale(1)',
            background: engine === 'bing' ? theme.logoBtnActive : 'transparent'
          }}
        >
          <svg height="28" viewBox="0 0 24 24">
            <path fill="#00809d" d="M5 3v16.5l4 2.25 8-4.5v-4.5l-6 3.25V7.5L5 3z"/>
            <path fill="#00809d" d="M11 7.5v7.25l6-3.25v4.5l-8 4.5-4-2.25V3l6 4.5z" opacity="0.7"/>
          </svg>
        </button>
      </div>

      {/* 搜索框 */}
      <form onSubmit={handleSearch} style={{
        ...styles.searchBox,
        width: isFocused ? '720px' : '560px',
        background: isFocused ? theme.searchBoxFocused : theme.searchBox,
        boxShadow: isFocused ? theme.searchBoxShadowFocused : theme.searchBoxShadow,
        transform: isFocused ? 'translateY(-2px)' : 'translateY(0)'
      }}>
        <div style={{
          ...styles.searchIconLeft,
          opacity: isFocused ? 0.6 : 0.4
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="搜索网页..."
          style={{...styles.input, color: theme.inputColor}}
          autoFocus
        />
        
        <div style={{...styles.divider, background: theme.dividerColor}}></div>
        
        <button type="submit" style={{
          ...styles.searchBtn,
          background: engine === 'google' 
            ? 'linear-gradient(135deg, #4285F4 0%, #1a73e8 100%)' 
            : 'linear-gradient(135deg, #00809d 0%, #006680 100%)'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </form>

      <p style={{...styles.hint, color: theme.hintColor}}>按 Enter 使用 {engine === 'google' ? 'Google' : 'Bing'} 搜索</p>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::placeholder { color: ${theme.placeholderColor}; font-weight: 300; }
        input:focus::placeholder { opacity: 0.5; }
      `}</style>
    </div>
  )
}


const darkTheme = {
  background: 'linear-gradient(135deg, #1e3a5f 0%, #0d1b2a 50%, #1a1a2e 100%)',
  timeColor: '#fff',
  dateColor: 'rgba(255,255,255,0.6)',
  logoBtnActive: 'rgba(255,255,255,0.1)',
  searchBox: 'linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(248,250,252,0.7) 100%)',
  searchBoxFocused: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(248,250,252,0.98) 100%)',
  searchBoxShadow: '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5)',
  searchBoxShadowFocused: '0 20px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.2), inset 0 1px 0 rgba(255,255,255,0.8)',
  iconColor: '#666',
  inputColor: '#333',
  dividerColor: 'rgba(0,0,0,0.1)',
  hintColor: 'rgba(255,255,255,0.5)',
  placeholderColor: '#aaa'
}

const lightTheme = {
  background: 'linear-gradient(135deg, #e8f4fc 0%, #d4e8f2 50%, #c9dff0 100%)',
  timeColor: '#1a1a2e',
  dateColor: 'rgba(0,0,0,0.5)',
  logoBtnActive: 'rgba(0,0,0,0.08)',
  searchBox: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.8) 100%)',
  searchBoxFocused: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 100%)',
  searchBoxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
  searchBoxShadowFocused: '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,1)',
  iconColor: '#666',
  inputColor: '#333',
  dividerColor: 'rgba(0,0,0,0.1)',
  hintColor: 'rgba(0,0,0,0.4)',
  placeholderColor: '#999'
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '10vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
    transition: 'background 0.5s ease'
  },
  themeToggle: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(128,128,128,0.15)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  },
  timeContainer: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  time: {
    fontSize: '48px',
    fontWeight: '200',
    letterSpacing: '-1px',
    textShadow: '0 2px 15px rgba(0,0,0,0.1)',
    transition: 'color 0.5s ease'
  },
  date: {
    fontSize: '14px',
    fontWeight: '300',
    marginTop: '6px',
    letterSpacing: '0.5px',
    transition: 'color 0.5s ease'
  },
  logoSwitch: {
    display: 'flex',
    gap: '16px',
    marginBottom: '32px'
  },
  logoBtn: {
    border: 'none',
    cursor: 'pointer',
    padding: '12px 16px',
    borderRadius: '14px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)'
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '50px',
    overflow: 'hidden',
    maxWidth: '90%',
    padding: '6px 6px 6px 20px',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
  },
  searchIconLeft: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '12px',
    transition: 'opacity 0.3s'
  },
  input: {
    flex: 1,
    padding: '14px 8px',
    fontSize: '16px',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontWeight: '400',
    letterSpacing: '0.2px'
  },
  divider: {
    width: '1px',
    height: '28px',
    marginRight: '6px'
  },
  searchBtn: {
    width: '48px',
    height: '48px',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
  },
  hint: {
    marginTop: '20px',
    fontSize: '13px',
    fontWeight: '300',
    letterSpacing: '0.5px',
    transition: 'color 0.5s ease'
  }
}

// src/app/login/page.js
'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Globe,
} from 'lucide-react'

export default function LoginPage() {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const router = useRouter()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    })

    if (res?.error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Registration failed')
        setLoading(false)
        return
      }

      setSuccess('Account created! Signing you in...')

      // Auto login after register
      await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password,
      })

      router.push('/dashboard')
      router.refresh()
    } catch {
      setError('Something went wrong')
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #3E2C23 0%, #5a3d2b 100%)',
        padding: '80px 24px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* BG Decoration */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 5 + i, repeat: Infinity }}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            background: '#FFF6DE',
            width: `${200 + i * 150}px`,
            height: `${200 + i * 150}px`,
            left: `${-5 + i * 25}%`,
            top: `${-10 + i * 20}%`,
            pointerEvents: 'none',
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: '#FFF6DE',
          borderRadius: '28px',
          padding: '48px 40px',
          width: '100%',
          maxWidth: '440px',
          boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <Globe size={32} color="#3E2C23" />
        </div>
        <div
          style={{
            textAlign: 'center',
            fontSize: '22px',
            fontWeight: 800,
            color: '#3E2C23',
            marginBottom: '4px',
          }}
        >
          Talento<span style={{ color: '#d4a96a' }}>Nova</span>
        </div>

        {/* Mode Toggle */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(62,44,35,0.08)',
            borderRadius: '12px',
            padding: '4px',
            margin: '24px 0',
          }}
        >
          {['login', 'register'].map((m) => (
            <motion.button
              key={m}
              onClick={() => {
                setMode(m)
                setError('')
                setSuccess('')
              }}
              animate={{
                background: mode === m ? '#3E2C23' : 'transparent',
                color: mode === m ? '#FFF6DE' : '#3E2C23',
              }}
              style={{
                flex: 1,
                padding: '10px',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '14px',
                textTransform: 'capitalize',
              }}
            >
              {m === 'login' ? '🔑 Sign In' : '✨ Register'}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.form
            key={mode}
            initial={{ opacity: 0, x: mode === 'login' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === 'login' ? 20 : -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={mode === 'login' ? handleLogin : handleRegister}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            {/* Name field (register only) */}
            {mode === 'register' && (
              <div style={{ position: 'relative' }}>
                <User
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#7a5c45',
                  }}
                />
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  style={inputStyle}
                />
              </div>
            )}

            {/* Email */}
            <div style={{ position: 'relative' }}>
              <Mail
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#7a5c45',
                }}
              />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                style={inputStyle}
              />
            </div>

            {/* Password */}
            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#7a5c45',
                }}
              />
              <input
                name="password"
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder={
                  mode === 'register'
                    ? 'Password (min. 6 characters)'
                    : 'Password'
                }
                required
                style={{ ...inputStyle, paddingRight: '48px' }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#7a5c45',
                }}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Error / Success */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    background: 'rgba(229,62,62,0.1)',
                    border: '1px solid rgba(229,62,62,0.3)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    color: '#c53030',
                    fontSize: '14px',
                    textAlign: 'center',
                  }}
                >
                  ❌ {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{
                    background: 'rgba(56,161,105,0.1)',
                    border: '1px solid rgba(56,161,105,0.3)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    color: '#276749',
                    fontSize: '14px',
                    textAlign: 'center',
                  }}
                >
                  ✅ {success}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              style={{
                background: loading
                  ? 'rgba(62,44,35,0.5)'
                  : '#3E2C23',
                color: '#FFF6DE',
                border: 'none',
                padding: '16px',
                borderRadius: '14px',
                fontWeight: 700,
                fontSize: '16px',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '4px',
              }}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{
                    width: '20px',
                    height: '20px',
                    border: '2px solid rgba(255,246,222,0.3)',
                    borderTopColor: '#FFF6DE',
                    borderRadius: '50%',
                  }}
                />
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>

            <p
              style={{
                textAlign: 'center',
                fontSize: '13px',
                color: '#7a5c45',
                marginTop: '8px',
              }}
            >
              {mode === 'login' ? (
                <>
                  New here?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('register')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#3E2C23',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    Create account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#3E2C23',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </motion.form>
        </AnimatePresence>

        <div
          style={{
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '12px',
            color: '#7a5c45',
          }}
        >
          🔒 Seed credentials: admin@consultancy.com / admin123
        </div>
      </motion.div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '14px 14px 14px 44px',
  border: '1.5px solid rgba(62,44,35,0.15)',
  borderRadius: '12px',
  background: 'rgba(62,44,35,0.04)',
  color: '#3E2C23',
  fontSize: '15px',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}
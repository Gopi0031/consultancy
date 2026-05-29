// src/app/login/page.js
'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Globe,
  Sparkles,
  Shield,
  CheckCircle,
} from 'lucide-react'

export default function LoginPage() {
  const [mode, setMode] = useState('login')
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
        background: '#C0E1D2',
        padding: '90px 20px 40px',
        margin:'90px',
        borderRadius:'180px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ─── Animated Background Circles ─── */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.06, 0.14, 0.06],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            background: '#3E2C23',
            width: `${200 + i * 150}px`,
            height: `${200 + i * 150}px`,
            left: `${-5 + i * 25}%`,
            top: `${-10 + i * 20}%`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* ─── Floating Decorative Icons ─── */}
      {[
        { Icon: Globe, x: '8%', y: '15%', delay: 0 },
        { Icon: Shield, x: '85%', y: '20%', delay: 0.5 },
        { Icon: Sparkles, x: '10%', y: '80%', delay: 1 },
        { Icon: CheckCircle, x: '88%', y: '75%', delay: 1.5 },
      ].map(({ Icon, x, y, delay }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.3, 0],
            y: [-20, 20, -20],
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            left: x,
            top: y,
            color: '#DE802B',
            pointerEvents: 'none',
            display: 'none',
          }}
          className="floating-icon"
        >
          <Icon size={32} />
        </motion.div>
      ))}

      {/* ─── Main Card ─── */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring', damping: 20 }}
        style={{
          background: '#FFFFFF',
          borderRadius: '28px',
          padding: 'clamp(28px, 5vw, 48px) clamp(24px, 4vw, 40px)',
          width: '100%',
          maxWidth: '460px',
          boxShadow:
            '0 30px 80px rgba(62,44,35,0.25), 0 10px 30px rgba(0,0,0,0.1)',
          position: 'relative',
          zIndex: 10,
          border: '1px solid rgba(62,44,35,0.06)',
        }}
      >
        {/* Top Decorative Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background:
              'linear-gradient(90deg, #DE802B 0%, #FFB870 50%, #DE802B 100%)',
            borderTopLeftRadius: '28px',
            borderTopRightRadius: '28px',
            transformOrigin: 'left',
          }}
        />

        {/* Logo Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', damping: 12 }}
          style={{
            textAlign: 'center',
            marginBottom: '14px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              background: '#3E2C23',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
              boxShadow: '0 10px 30px rgba(62,44,35,0.3)',
            }}
          >
            <Globe size={32} color="#DE802B" />
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            textAlign: 'center',
            fontSize: 'clamp(20px, 3vw, 24px)',
            fontWeight: 800,
            color: '#3E2C23',
            marginBottom: '6px',
            letterSpacing: '-0.5px',
          }}
        >
          Talento<span style={{ color: '#DE802B' }}>Nova</span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            textAlign: 'center',
            fontSize: '13px',
            color: '#3E2C23',
            opacity: 0.7,
            marginBottom: '24px',
          }}
        >
          {mode === 'login'
            ? 'Welcome back! Sign in to continue'
            : 'Create your account to get started'}
        </motion.p>

        {/* Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{
            display: 'flex',
            background: '#E5EEE4',
            borderRadius: '14px',
            padding: '5px',
            marginBottom: '24px',
            position: 'relative',
          }}
        >
          {/* Sliding active background */}
          <motion.div
            animate={{
              x: mode === 'login' ? 0 : '100%',
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'absolute',
              top: '5px',
              left: '5px',
              width: 'calc(50% - 5px)',
              height: 'calc(100% - 10px)',
              background: '#3E2C23',
              borderRadius: '10px',
              boxShadow: '0 4px 12px rgba(62,44,35,0.2)',
            }}
          />

          {['login', 'register'].map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m)
                setError('')
                setSuccess('')
              }}
              style={{
                flex: 1,
                padding: '11px',
                border: 'none',
                background: 'transparent',
                color: mode === m ? '#DE802B' : '#3E2C23',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '14px',
                textTransform: 'capitalize',
                position: 'relative',
                zIndex: 1,
                transition: 'color 0.3s',
              }}
            >
              {m === 'login' ? ' Sign In' : ' Register'}
            </button>
          ))}
        </motion.div>

        {/* Form */}
        <AnimatePresence mode="wait">
          <motion.form
            key={mode}
            initial={{ opacity: 0, x: mode === 'login' ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: mode === 'login' ? 30 : -30 }}
            transition={{ duration: 0.3 }}
            onSubmit={mode === 'login' ? handleLogin : handleRegister}
            style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            {/* Name field (register only) */}
            <AnimatePresence>
              {mode === 'register' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ position: 'relative', overflow: 'hidden' }}
                >
                  <User size={18} style={iconStyle} />
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required={mode === 'register'}
                    style={inputStyle}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ position: 'relative' }}
            >
              <Mail size={18} style={iconStyle} />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                style={inputStyle}
              />
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ position: 'relative' }}
            >
              <Lock size={18} style={iconStyle} />
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
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#DE802B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                }}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </motion.button>
            </motion.div>

            {/* Error / Success */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    background: 'rgba(229,62,62,0.1)',
                    border: '1px solid rgba(229,62,62,0.3)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    color: '#c53030',
                    fontSize: '14px',
                    textAlign: 'center',
                    fontWeight: 600,
                  }}
                >
                  ❌ {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  style={{
                    background: 'rgba(56,161,105,0.1)',
                    border: '1px solid rgba(56,161,105,0.3)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    color: '#276749',
                    fontSize: '14px',
                    textAlign: 'center',
                    fontWeight: 600,
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
              whileHover={{
                scale: loading ? 1 : 1.02,
                boxShadow: loading
                  ? 'none'
                  : '0 16px 40px rgba(222, 128, 43, 0.5)',
              }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              style={{
                background: loading ? 'rgba(62,44,35,0.4)' : '#DE802B',
                color: '#3E2C23',
                border: 'none',
                padding: '16px',
                borderRadius: '14px',
                fontWeight: 800,
                fontSize: '15px',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '8px',
                boxShadow: loading
                  ? 'none'
                  : '0 8px 24px rgba(222, 128, 43, 0.4)',
                transition: 'all 0.3s',
              }}
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    width: '20px',
                    height: '20px',
                    border: '2.5px solid rgba(62,44,35,0.3)',
                    borderTopColor: '#3E2C23',
                    borderRadius: '50%',
                  }}
                />
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    style={{ display: 'flex' }}
                  >
                    <ArrowRight size={18} />
                  </motion.span>
                </>
              )}
            </motion.button>

            {/* Toggle Link */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                textAlign: 'center',
                fontSize: '13px',
                color: '#3E2C23',
                marginTop: '8px',
                opacity: 0.85,
              }}
            >
              {mode === 'login' ? (
                <>
                  New here?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('register')
                      setError('')
                      setSuccess('')
                    }}
                    style={linkBtnStyle}
                  >
                    Create account
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login')
                      setError('')
                      setSuccess('')
                    }}
                    style={linkBtnStyle}
                  >
                    Sign in
                  </button>
                </>
              )}
            </motion.p>
          </motion.form>
        </AnimatePresence>

        {/* Demo Credentials Box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{
            marginTop: '24px',
            padding: '14px',
            background: '#E5EEE4',
            borderRadius: '12px',
            border: '1px dashed rgba(62,44,35,0.2)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              color: '#DE802B',
              fontWeight: 700,
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            <Shield size={12} />Admin Demo Credentials
          </div>
          <div
            style={{
              fontSize: '12px',
              color: '#3E2C23',
              fontFamily: 'monospace',
              lineHeight: 1.6,
              opacity: 0.85,
            }}
          >
            <div>📧 admin@consultancy.com</div>
            <div>🔑 admin123</div>

            
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{
            marginTop: '24px',
            padding: '14px',
            background: '#E5EEE4',
            borderRadius: '12px',
            border: '1px dashed rgba(62,44,35,0.2)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '11px',
              color: '#DE802B',
              fontWeight: 700,
              marginBottom: '6px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            <Shield size={12} /> User Demo Credentials
          </div>
          <div
            style={{
              fontSize: '12px',
              color: '#3E2C23',
              fontFamily: 'monospace',
              lineHeight: 1.6,
              opacity: 0.85,
            }}
          >
            <div>📧 user@consultancy.com</div>
            <div>🔑 user123</div>

            
          </div>
        </motion.div>
      </motion.div>

      {/* CSS for floating icons (desktop only) */}
      <style jsx>{`
        @media (min-width: 1024px) {
          :global(.floating-icon) {
            display: block !important;
          }
        }
      `}</style>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '14px 14px 14px 46px',
  border: '1.5px solid rgba(62,44,35,0.12)',
  borderRadius: '12px',
  background: '#E5EEE4',
  color: '#3E2C23',
  fontSize: '15px',
  outline: 'none',
  transition: 'all 0.2s',
  boxSizing: 'border-box',
  fontWeight: 500,
  fontFamily: 'inherit',
}

const iconStyle = {
  position: 'absolute',
  left: '14px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#DE802B',
  zIndex: 1,
}

const linkBtnStyle = {
  background: 'none',
  border: 'none',
  color: '#DE802B',
  fontWeight: 800,
  cursor: 'pointer',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
  fontSize: '13px',
  padding: 0,
} 
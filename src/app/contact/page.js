// src/app/contact/page.js
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  CheckCircle,
  Sparkles,
} from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setSuccess(true)
        setForm({ name: '', email: '', phone: '', message: '' })
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to send message')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#E5EEE4',
        paddingTop: '90px',
      }}
    >
      {/* ───────── Animated Hero ───────── */}
      <div
        style={{
          background: '#C0E1D2',
          padding: 'clamp(60px, 8vw, 100px) 24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.12, 0.05] }}
            transition={{ duration: 4 + i, repeat: Infinity }}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              background: '#3E2C23',
              width: `${250 + i * 100}px`,
              height: `${250 + i * 100}px`,
              left: `${10 + i * 25}%`,
              top: `${-30 + i * 20}%`,
              pointerEvents: 'none',
            }}
          />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,246,222,0.1)',
              border: '1px solid rgba(255,246,222,0.2)',
              borderRadius: '50px',
              padding: '8px 18px',
              fontSize: '13px',
              color: '#DE802B',
              marginBottom: '20px',
              fontWeight: 700,
            }}
          >
            <Sparkles size={14} /> CONTACT US
          </div>
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 60px)',
              fontWeight: 800,
              color: '#3E2C23',
              marginBottom: '16px',
              letterSpacing: '-1px',
              lineHeight: 1.1,
            }}
          >
            Get In Touch
          </h1>
          <p
            style={{
              color: '#3E2C23',
              fontSize: 'clamp(15px, 2vw, 18px)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.7,
              padding: '0 16px',
            }}
          >
            We&apos;d love to hear from you. Send us a message!
          </p>
        </motion.div>
      </div>

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(40px, 6vw, 80px) clamp(16px, 4vw, 24px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: 'clamp(32px, 5vw, 60px)',
          alignItems: 'start',
        }}
      >
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{
              fontSize: 'clamp(24px, 3.5vw, 32px)',
              fontWeight: 700,
              color: '#3E2C23',
              marginBottom: '12px',
            }}
          >
            Contact Information
          </h2>
          <p
            style={{
              color: '#3E2C23',
              marginBottom: '40px',
              lineHeight: 1.7,
              opacity: 0.8,
            }}
          >
            Reach out to us and our expert team will get back to you within 24
            hours.
          </p>

          {[
            {
              icon: Mail,
              label: 'Email',
              value: 'info@talentanova.com',
              href: 'mailto:info@talentanova.com',
            },
            {
              icon: Phone,
              label: 'Phone',
              value: '+91 98765 43210',
              href: 'tel:+919876543210',
            },
            {
              icon: MapPin,
              label: 'Office',
              value: 'Guntur, Andhra Pradesh, India',
              href: null,
            },
          ].map(({ icon: Icon, label, value, href }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '20px',
                alignItems: 'flex-start',
                background: '#C0E1D2',
                padding: '16px',
                borderRadius: '14px',
                boxShadow: '0 2px 12px rgba(62,44,35,0.05)',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  background: '#3E2C23',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(62,44,35,0.2)',
                }}
              >
                <Icon size={20} color="#DE802B" />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#3E2C23',
                    fontWeight: 700,
                    marginBottom: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    opacity: 0.7,
                  }}
                >
                  {label}
                </div>
                {href ? (
                  <a
                    href={href}
                    style={{
                      color: '#DE802B',
                      fontWeight: 700,
                      textDecoration: 'none',
                      fontSize: 'clamp(14px, 2vw, 16px)',
                      wordBreak: 'break-word',
                    }}
                  >
                    {value}
                  </a>
                ) : (
                  <div
                    style={{
                      color: '#DE802B',
                      fontWeight: 700,
                      fontSize: 'clamp(14px, 2vw, 16px)',
                    }}
                  >
                    {value}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Office Hours */}
          <div
            style={{
              background: '#3E2C23',
              border: '1px solid rgba(62,44,35,0.1)',
              borderRadius: '16px',
              padding: '20px',
              marginTop: '20px',
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: '#DE802B',
                marginBottom: '12px',
                fontSize: '15px',
              }}
            >
              🕐 Office Hours
            </div>
            <div
              style={{
                color: '#FFF6DE',
                fontSize: '14px',
                lineHeight: 1.9,
                opacity: 0.9,
              }}
            >
              <div>Mon - Fri: 9:00 AM - 6:00 PM</div>
              <div>Saturday: 10:00 AM - 4:00 PM</div>
              <div>Sunday: Closed</div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  padding: 'clamp(40px, 6vw, 60px) clamp(24px, 4vw, 40px)',
                  textAlign: 'center',
                  boxShadow: '0 4px 24px rgba(62,44,35,0.1)',
                  border: '1px solid rgba(62,44,35,0.06)',
                }}
              >
                <motion.div
                  animate={{ scale: [0.8, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    background: 'rgba(56,161,105,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}
                >
                  <CheckCircle size={50} color="#38a169" />
                </motion.div>
                <h3
                  style={{
                    fontSize: 'clamp(20px, 3vw, 24px)',
                    fontWeight: 800,
                    color: '#3E2C23',
                    marginBottom: '12px',
                  }}
                >
                  Message Sent! 🎉
                </h3>
                <p
                  style={{
                    color: '#3E2C23',
                    marginBottom: '28px',
                    opacity: 0.75,
                  }}
                >
                  Thank you for reaching out. We&apos;ll get back to you within
                  24 hours.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSuccess(false)}
                  style={{
                    background: '#DE802B',
                    color: '#3E2C23',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '50px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '15px',
                    boxShadow: '0 4px 16px rgba(222,128,43,0.4)',
                  }}
                >
                  Send Another
                </motion.button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '24px',
                  padding: 'clamp(24px, 4vw, 40px)',
                  boxShadow: '0 4px 24px rgba(62,44,35,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  border: '1px solid rgba(62,44,35,0.06)',
                }}
              >
                <h2
                  style={{
                    fontSize: 'clamp(20px, 3vw, 24px)',
                    fontWeight: 800,
                    color: '#3E2C23',
                    marginBottom: '8px',
                  }}
                >
                  Send a Message
                </h2>

                {/* Name */}
                <div style={{ position: 'relative' }}>
                  <User size={17} style={iconStyle} />
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    required
                    style={formInput}
                  />
                </div>

                {/* Email */}
                <div style={{ position: 'relative' }}>
                  <Mail size={17} style={iconStyle} />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                    style={formInput}
                  />
                </div>

                {/* Phone */}
                <div style={{ position: 'relative' }}>
                  <Phone size={17} style={iconStyle} />
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number (optional)"
                    style={formInput}
                  />
                </div>

                {/* Message */}
                <div style={{ position: 'relative' }}>
                  <MessageSquare
                    size={17}
                    style={{ ...iconStyle, top: '16px', transform: 'none' }}
                  />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    required
                    rows={5}
                    style={{
                      ...formInput,
                      paddingTop: '14px',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      background: 'rgba(229,62,62,0.1)',
                      border: '1px solid rgba(229,62,62,0.25)',
                      borderRadius: '12px',
                      padding: '12px',
                      color: '#c53030',
                      fontSize: '14px',
                      textAlign: 'center',
                      fontWeight: 600,
                    }}
                  >
                    ❌ {error}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  style={{
                    background: loading ? 'rgba(62,44,35,0.5)' : '#DE802B',
                    color: '#3E2C23',
                    border: 'none',
                    padding: '16px',
                    borderRadius: '14px',
                    fontWeight: 800,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: 'clamp(14px, 2vw, 16px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: loading
                      ? 'none'
                      : '0 8px 24px rgba(222,128,43,0.4)',
                  }}
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

const iconStyle = {
  position: 'absolute',
  left: '14px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#DE802B',
}

const formInput = {
  width: '100%',
  padding: '14px 14px 14px 44px',
  border: '1.5px solid rgba(62,44,35,0.12)',
  borderRadius: '12px',
  background: '#E5EEE4',
  color: '#3E2C23',
  fontSize: '15px',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  fontWeight: 500,
}
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
      style={{ minHeight: '100vh', background: '#E5EEE4', paddingTop: '90px' }}
    >
      {/* Header */}
      <div
        style={{
          background: '#C0E1D2',
          padding: '70px 24px',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1
            style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800,
              color: '#3E2C23',
              marginBottom: '12px',
            }}
          >
            Get In Touch
          </h1>
          <p style={{ color: '#3E2C23', fontSize: '17px' }}>
            We&apos;d love to hear from you. Send us a message!
          </p>
        </motion.div>
      </div>

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '80px 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '60px',
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
              fontSize: '32px',
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
                marginBottom: '28px',
                alignItems: 'flex-start',
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
                }}
              >
                <Icon size={20} color="#FFF6DE" />
              </div>
              <div>
                <div
                  style={{
                    fontSize: '13px',
                    color: '#3E2C23',
                    fontWeight: 500,
                    marginBottom: '4px',
                  }}
                >
                  {label}
                </div>
                {href ? (
                  <a
                    href={href}
                    style={{
                      color: '#DE802B',
                      fontWeight: 600,
                      textDecoration: 'none',
                      fontSize: '16px',
                    }}
                  >
                    {value}
                  </a>
                ) : (
                  <div
                    style={{
                      color: '#DE802B',
                      fontWeight: 600,
                      fontSize: '16px',
                    }}
                  >
                    {value}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Hours */}
          <div
            style={{
              background: 'rgba(62,44,35,0.06)',
              border: '1px solid rgba(62,44,35,0.1)',
              borderRadius: '16px',
              padding: '20px',
              marginTop: '32px',
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: '#3E2C23',
                marginBottom: '12px',
              }}
            >
              🕐 Office Hours
            </div>
            <div style={{ color: '#DE802B', fontSize: '14px', lineHeight: 1.8 }}>
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
                  background: '#C0E1D2',
                  borderRadius: '24px',
                  padding: '60px 40px',
                  textAlign: 'center',
                  boxShadow: '0 4px 24px rgba(62,44,35,0.1)',
                }}
              >
                <motion.div
                  animate={{ scale: [0.8, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle size={64} color="#3E2C23" />
                </motion.div>
                <h3
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#3E2C23',
                    margin: '20px 0 12px',
                  }}
                >
                  Message Sent!
                </h3>
                <p style={{ color: '#7a5c45', marginBottom: '28px' }}>
                  Thank you for reaching out. We&apos;ll get back to you within
                  24 hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  style={{
                    background: '#3E2C23',
                    color: '#FFF6DE',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '50px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                style={{
                  background: '#C0E1D2',
                  borderRadius: '24px',
                  padding: '40px',
                  boxShadow: '0 4px 24px rgba(62,44,35,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                }}
              >
                <h2
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#3E2C23',
                    marginBottom: '8px',
                  }}
                >
                  Send a Message
                </h2>

                {/* Name */}
                <div style={{ position: 'relative' }}>
                  <User
                    size={17}
                    style={{
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#DE802B',
                    }}
                  />
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
                  <Mail
                    size={17}
                    style={{
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#DE802B',
                    }}
                  />
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
                  <Phone
                    size={17}
                    style={{
                      position: 'absolute',
                      left: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#DE802B',
                    }}
                  />
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
                    style={{
                      position: 'absolute',
                      left: '14px',
                      top: '16px',
                      color: '#DE802B',
                    }}
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
                      height: 'auto',
                    }}
                  />
                </div>

                {error && (
                  <div
                    style={{
                      background: 'rgba(229,62,62,0.1)',
                      border: '1px solid rgba(229,62,62,0.2)',
                      borderRadius: '10px',
                      padding: '10px',
                      color: '#c53030',
                      fontSize: '14px',
                      textAlign: 'center',
                    }}
                  >
                    ❌ {error}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  style={{
                    background: loading ? 'rgba(62,44,35,0.5)' : '#3E2C23',
                    color: '#DE802B',
                    border: 'none',
                    padding: '16px',
                    borderRadius: '14px',
                    fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
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

const formInput = {
  width: '100%',
  padding: '14px 14px 14px 44px',
  border: '1.5px solid rgba(62,44,35,0.12)',
  borderRadius: '12px',
  background: '#e5eee4',
  color: '#000000',
  fontSize: '18px',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
}
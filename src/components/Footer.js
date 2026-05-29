// src/components/Footer.js
'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowUp, Heart } from 'lucide-react'
import { useState, useEffect } from 'react'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
  { href: '/book', label: 'Book Meeting' },
  { href: '/login', label: 'Login / Register' },
]

const services = [
  'Student Visa Consultation',
  'University Shortlisting',
  'SOP & LOR Review',
  'Job Placement Assistance',
  'IELTS / TOEFL Coaching',
  'Scholarship Guidance',
]

const contactInfo = [
  {
    Icon: Mail,
    text: 'info@talentanova.com',
    href: 'mailto:info@talentanova.com',
  },
  {
    Icon: Phone,
    text: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
  {
    Icon: MapPin,
    text: 'Guntur, Andhra Pradesh, India',
    href: null,
  },
]

const SocialIcons = [
  {
    label: 'Facebook',
    href: '#',
    svg: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '#',
    svg: (
      <svg
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    svg: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919876543210',
    svg: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
]

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <footer
        style={{
          background: 'linear-gradient(180deg, #C0E1D2 0%, #C0E1D2 100%)',
          color: '#3E2C23',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative gradient circle */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(212,169,106,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            padding: 'clamp(40px, 6vw, 60px) clamp(16px, 4vw, 24px) clamp(20px, 3vw, 30px)',
            position: 'relative',
          }}
        >
          

          {/* Main Footer Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: 'clamp(30px, 4vw, 40px)',
              marginBottom: 'clamp(30px, 4vw, 40px)',
            }}
          >
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div
                style={{
                  fontSize: 'clamp(22px, 3vw, 26px)',
                  fontWeight: 800,
                  marginBottom: '14px',
                }}
              >
                Talento<span style={{ color: '#DE802B' }}>Nova</span>
              </div>
              <p
                style={{
                  color: '#3E2C23',
                  lineHeight: 1.8,
                  fontSize: '14px',
                  marginBottom: '22px',
                }}
              >
                Your trusted partner for abroad education and job placement.
                Turning global dreams into reality.
              </p>

              {/* Social Icons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {SocialIcons.map(({ label, href, svg }) => (
                  <motion.a
                    key={label}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: 'rgba(255,246,222,0.08)',
                      border: '1px solid #3E2C23',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#3E2C23',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#DE802B'
                      e.currentTarget.style.color = '#C0E1D2'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,246,222,0.08)'
                      e.currentTarget.style.color = '#3E2C23'
                    }}
                  >
                    {svg}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <FooterHeading>Quick Links</FooterHeading>
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={footerLinkStyle}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#DE802B'
                    e.target.style.paddingLeft = '6px'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#3E2C23'
                    e.target.style.paddingLeft = '0'
                  }}
                >
                  → {link.label}
                </Link>
              ))}
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              <FooterHeading>Our Services</FooterHeading>
              {services.map((s) => (
                <p
                  key={s}
                  style={{
                    color: '#3E2C23',
                    marginBottom: '10px',
                    fontSize: '14px',
                    lineHeight: 1.5,
                  }}
                >
                  • {s}
                </p>
              ))}
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <FooterHeading>Contact Us</FooterHeading>

              {contactInfo.map(({ Icon, text, href }, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    marginBottom: '14px',
                  }}
                >
                  <Icon
                    size={15}
                    style={{ marginTop: '2px', flexShrink: 0, color: '#DE802B' }}
                  />
                  {href ? (
                    <a
                      href={href}
                      style={{
                        color: '#3E2C23',
                        textDecoration: 'none',
                        fontSize: '13px',
                        lineHeight: 1.5,
                        wordBreak: 'break-word',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.target.style.color = '#DE802B')}
                      onMouseLeave={(e) =>
                        (e.target.style.color = 'rgba(255,246,222,0.65)')
                      }
                    >
                      {text}
                    </a>
                  ) : (
                    <span
                      style={{
                        color: '#3E2C23',
                        fontSize: '13px',
                        lineHeight: 1.5,
                      }}
                    >
                      {text}
                    </span>
                  )}
                </div>
              ))}

              {/* Office Hours */}
              <div
                style={{
                  marginTop: '14px',
                  padding: '14px',
                  background: 'rgba(255,246,222,0.04)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,246,222,0.07)',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#DE802B',
                    marginBottom: '8px',
                  }}
                >
                  🕐 Office Hours
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    color: '#3E2C23',
                    lineHeight: 1.9,
                  }}
                >
                  <div>Mon – Fri: 9:00 AM – 6:00 PM</div>
                  <div>Saturday: 10:00 AM – 4:00 PM</div>
                  <div>Sunday: Closed</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div
            style={{
              borderTop: '1px solid rgba(255,246,222,0.07)',
              paddingTop: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '14px',
            }}
          >
            <p
              style={{
                color: '#3E2C23',
                fontSize: '13px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                flexWrap: 'wrap',
              }}
            >
              © {new Date().getFullYear()} TalentoNova. Made with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{ display: 'inline-flex', color: '#e53e3e' }}
              >
                <Heart size={14} fill="#e53e3e" />
              </motion.span>
              in India
            </p>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {['Privacy Policy', 'Terms of Service'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  style={{
                    color: '#3E2C23',
                    textDecoration: 'none',
                    fontSize: '13px',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#DE802B')}
                  onMouseLeave={(e) =>
                    (e.target.style.color = 'rgba(255,246,222,0.45)')
                  }
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: '#C0E1D2',
          color: '#3E2C23',
          border: '2px solid #DE802B',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
          zIndex: 999,
          pointerEvents: showScrollTop ? 'auto' : 'none',
        }}
      >
        <ArrowUp size={20} />
      </motion.button>
    </>
  )
}

function FooterHeading({ children }) {
  return (
    <h3
      style={{
        fontSize: '13px',
        fontWeight: 700,
        marginBottom: '18px',
        color: '#DE802B',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
      }}
    >
      {children}
    </h3>
  )
}

const footerLinkStyle = {
  display: 'block',
  color: '#3E2C23',
  textDecoration: 'none',
  marginBottom: '10px',
  fontSize: '14px',
  transition: 'all 0.2s',
}
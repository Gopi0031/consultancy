// src/components/home/HeroSection.js
'use client'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Globe, Award, Users, Sparkles, Play } from 'lucide-react'

export default function HeroSection({ heroImages = [] }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  const [screen, setScreen] = useState('desktop')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = Array.isArray(heroImages)
    ? heroImages.filter(
        (img) => img && typeof img === 'string' && img.trim() !== ''
      )
    : []

  const hasImages = images.length > 0

  useEffect(() => {
    if (images.length <= 1) return
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth
      if (w < 640) setScreen('mobile')
      else if (w < 1024) setScreen('tablet')
      else setScreen('desktop')
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const isMobile = screen === 'mobile'
  const isTablet = screen === 'tablet'

  const handleMouseMove = (e) => {
    if (isMobile || isTablet) return
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    mouseX.set((clientX / innerWidth - 0.5) * 30)
    mouseY.set((clientY / innerHeight - 0.5) * 30)
  }

  // Universal text shadow for readability over image
  const textShadow = hasImages
    ? '0 2px 20px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.5)'
    : 'none'

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: hasImages
          ? '#C0E1D2'
          : 'linear-gradient(135deg, #C0E1D2 0%, #d4e8dc 40%, #C0E1D2 100%)',
        paddingTop: '70px',
        paddingBottom: isMobile ? '60px' : '40px',
      }}
    >
      {/* ─── Hero Image (Crystal Clear) ─── */}
      {hasImages && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}
        >
          <Image
            src={images[currentImageIndex]}
            alt={`Hero ${currentImageIndex + 1}`}
            fill
            priority
            sizes="100vw"
            quality={100}
            style={{
              objectFit: 'cover',
              objectPosition: 'center center',
            }}
          />

          {/* Subtle gradient ONLY at bottom for dot indicator visibility */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '30%',
              background:
                'linear-gradient(to top, rgba(62,44,35,0.4) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      )}

      {/* ─── Animated Circles (subtle, decorative) ─── */}
      <motion.div
        style={{
          y,
          x: !isMobile ? springX : 0,
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
        }}
      >
        {[...Array(isMobile ? 2 : isTablet ? 4 : 6)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              background: 'rgba(222, 128, 43, 0.06)',
              border: '1px solid rgba(222, 128, 43, 0.1)',
              width: `${100 + i * (isMobile ? 60 : 120)}px`,
              height: `${100 + i * (isMobile ? 60 : 120)}px`,
              left: `${5 + i * 15}%`,
              top: `${5 + i * 12}%`,
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      {/* ─── Floating Icons (Desktop only) ─── */}
      {!isMobile && !isTablet && (
        <motion.div
          style={{
            x: springY,
            y: springX,
            position: 'absolute',
            inset: 0,
            zIndex: 4,
            pointerEvents: 'none',
          }}
        >
          {[
            { Icon: Globe, x: '8%', y: '20%', delay: 0, size: 44 },
            { Icon: Award, x: '88%', y: '15%', delay: 0.5, size: 48 },
            { Icon: Users, x: '88%', y: '75%', delay: 1, size: 40 },
            { Icon: Sparkles, x: '6%', y: '70%', delay: 1.5, size: 36 },
          ].map(({ Icon, x, y: top, delay, size }, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                left: x,
                top,
                color: hasImages
                  ? 'rgba(255,255,255,0.3)'
                  : 'rgba(62, 44, 35, 0.2)',
                filter: hasImages
                  ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))'
                  : 'none',
              }}
              animate={{
                y: [-15, 15, -15],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay,
                ease: 'easeInOut',
              }}
            >
              <Icon size={size} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* ─── Content (NO background card — text shadows only) ─── */}
      <motion.div
        style={{
          opacity,
          position: 'relative',
          zIndex: 10,
          width: '100%',
        }}
      >
        <div
          style={{
            textAlign: 'center',
            padding: isMobile ? '0 20px' : '0 24px',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            whileHover={{ scale: 1.05 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#DE802B',
              border: '2px solid #DE802B',
              borderRadius: '50px',
              padding: isMobile ? '6px 14px' : '9px 20px',
              fontSize: isMobile ? '11px' : '14px',
              color: '#3E2C23',
              marginBottom: isMobile ? '14px' : '20px',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              boxShadow:
                '0 8px 24px rgba(222, 128, 43, 0.5), 0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            <motion.span
              animate={{ rotate: [0, 14, -14, 14, -14, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              style={{ display: 'inline-block' }}
            >
              🌍
            </motion.span>
            Trusted Worldwide
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontSize: isMobile
                ? '34px'
                : isTablet
                ? '52px'
                : 'clamp(44px, 6.5vw, 78px)',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1.1,
              marginBottom: isMobile ? '16px' : '20px',
              letterSpacing: '-1.5px',
              textShadow,
            }}
          >
            Gateway to {isMobile ? <br /> : ' '}
            Global
            {!isMobile && <br />}
            {isMobile ? ' ' : ''}Opportunities
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                display: 'block',
                marginTop: isMobile ? '6px' : '10px',
                fontSize: isMobile
                  ? '40px'
                  : isTablet
                  ? '58px'
                  : 'clamp(48px, 7.5vw, 86px)',
              }}
            >
              <motion.span
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{
                 color:'#DE802B',
                  backgroundSize: '200% auto',
                  display: 'inline-block',
                  
                }}
              >
                Talento Nova
              </motion.span>
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontSize: isMobile ? '15px' : isTablet ? '17px' : '19px',
              color: '#FFFFFF',
              marginBottom: isMobile ? '24px' : '36px',
              lineHeight: 1.7,
              maxWidth: '650px',
              margin: `0 auto ${isMobile ? '24px' : '36px'}`,
              padding: '0 10px',
              fontWeight: 500,
              textShadow,
            }}
          >
            Expert consultancy for abroad education and international job
            placement.{' '}
            <strong
              style={{
                color: '#FFB870',
                fontWeight: 800,
                textShadow: '0 2px 8px rgba(0,0,0,0.6)',
              }}
            >
              UK, USA, Canada, Australia
            </strong>{' '}
            — we guide you every step.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              display: 'flex',
              gap: isMobile ? '10px' : '14px',
              justifyContent: 'center',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              padding: isMobile ? '0 20px' : '0',
              width: '100%',
              maxWidth: isMobile ? '320px' : 'none',
              margin: '0 auto',
            }}
          >
            <Link
              href="/book"
              style={{
                textDecoration: 'none',
                width: isMobile ? '100%' : 'auto',
              }}
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 20px 50px rgba(222, 128, 43, 0.6)',
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: '#3E2C23',
                  color: '#DE802B',
                  border: 'none',
                  padding: isMobile ? '14px 26px' : '16px 32px',
                  borderRadius: '50px',
                  fontSize: isMobile ? '14px' : '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow:
                    '0 12px 35px rgba(222, 128, 43, 0.45), 0 4px 10px rgba(0,0,0,0.3)',
                  width: isMobile ? '100%' : 'auto',
                  whiteSpace: 'nowrap',
                }}
              >
                Book Free Consultation
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ display: 'flex' }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              </motion.button>
            </Link>

            <Link
              href="/services"
              style={{
                textDecoration: 'none',
                width: isMobile ? '100%' : 'auto',
              }}
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  background: '#C0E1D2',
                  color: '#3E2C23',
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'rgba(192, 225, 210, 0.2)',
                  color: '#FFFFFF',
                  border: '2px solid #C0E1D2',
                  padding: isMobile ? '14px 26px' : '16px 32px',
                  borderRadius: '50px',
                  fontSize: isMobile ? '14px' : '15px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: isMobile ? '100%' : 'auto',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                }}
              >
                <Play size={13} fill="currentColor" />
                Explore Services
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
        
        </div>
      </motion.div>

      {/* ─── Image Dot Indicators ─── */}
      {images.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: isMobile ? '20px' : '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '10px',
            zIndex: 10,
            background: 'rgba(62, 44, 35, 0.55)',
            padding: '10px 16px',
            borderRadius: '50px',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}
        >
          {images.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                width: i === currentImageIndex ? 30 : 10,
                background:
                  i === currentImageIndex
                    ? '#DE802B'
                    : 'rgba(192, 225, 210, 0.5)',
              }}
              style={{
                height: 10,
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'background 0.3s',
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* ─── Scroll Indicator (Desktop only) ─── */}
      {!isMobile && !isTablet && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            color: '#FFFFFF',
            fontSize: '10px',
            zIndex: 10,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontWeight: 700,
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              width: '24px',
              height: '36px',
              border: '2px solid #FFFFFF',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '5px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                width: '3px',
                height: '7px',
                background: '#DE802B',
                borderRadius: '2px',
              }}
            />
          </motion.div>
          Scroll
        </motion.div>
      )}
    </section>
  )
}
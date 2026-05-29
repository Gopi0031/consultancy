// src/app/about/page.js
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Target, Eye, Heart, Award, Users, Globe, Sparkles } from 'lucide-react'

const team = [
  {
    name: 'Rajesh Kumar',
    role: 'Founder & CEO',
    exp: '15+ years experience',
    avatar: 'RK',
  },
  {
    name: 'Priya Sharma',
    role: 'Visa Expert',
    exp: '10+ years in UK visas',
    avatar: 'PS',
  },
  {
    name: 'Anand Patel',
    role: 'Career Counselor',
    exp: '8+ years job placement',
    avatar: 'AP',
  },
  {
    name: 'Meera Nair',
    role: 'University Advisor',
    exp: '12+ years guidance',
    avatar: 'MN',
  },
]

export default function AboutPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#E5EEE4',
        paddingTop: '90px',
      }}
    >
      {/* ───────── Hero (Animated like ServicesClient) ───────── */}
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
            <Sparkles size={14} /> ABOUT US
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
            About TalentoNova
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
            We are a team of passionate experts dedicated to making your
            international dreams a reality
          </p>
        </motion.div>
      </div>

      {/* Mission Vision Values */}
      <div
        ref={ref}
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'clamp(40px, 6vw, 80px) clamp(16px, 4vw, 24px)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(20px, 3vw, 28px)',
            marginBottom: 'clamp(60px, 8vw, 80px)',
          }}
        >
          {[
            {
              icon: Target,
              title: 'Our Mission',
              text: 'To empower individuals with the knowledge and resources needed to successfully pursue education and career opportunities abroad.',
            },
            {
              icon: Eye,
              title: 'Our Vision',
              text: 'To be the most trusted consultancy, known for integrity, expertise, and life-changing guidance for every student and professional.',
            },
            {
              icon: Heart,
              title: 'Our Values',
              text: 'Transparency, dedication, and genuine care for our clients. We celebrate every visa approval, admission and job offer as our own success.',
            },
          ].map(({ icon: Icon, title, text }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
              style={{
                background: '#C0E1D2',
                borderRadius: '24px',
                padding: 'clamp(28px, 4vw, 36px) clamp(20px, 3vw, 28px)',
                boxShadow: '0 4px 24px rgba(62,44,35,0.08)',
                textAlign: 'center',
                border: '1px solid rgba(62,44,35,0.05)',
                transition: 'box-shadow 0.3s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  '0 16px 40px rgba(62,44,35,0.15)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  '0 4px 24px rgba(62,44,35,0.08)')
              }
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  background: '#3E2C23',
                  borderRadius: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  boxShadow: '0 8px 20px rgba(62,44,35,0.2)',
                }}
              >
                <Icon size={28} color="#DE802B" />
              </div>
              <h3
                style={{
                  fontSize: 'clamp(18px, 2.5vw, 20px)',
                  fontWeight: 700,
                  color: '#3E2C23',
                  marginBottom: '12px',
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  color: '#3E2C23',
                  lineHeight: 1.7,
                  fontSize: 'clamp(14px, 2vw, 15px)',
                  opacity: 0.8,
                }}
              >
                {text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div
          style={{
            background: '#C0E1D2',
            borderRadius: '28px',
            padding: 'clamp(40px, 6vw, 60px) clamp(24px, 4vw, 40px)',
            marginBottom: 'clamp(60px, 8vw, 80px)',
            boxShadow: '0 4px 24px rgba(62,44,35,0.08)',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(26px, 4vw, 36px)',
              fontWeight: 800,
              color: '#3E2C23',
              textAlign: 'center',
              marginBottom: 'clamp(32px, 5vw, 48px)',
              letterSpacing: '-0.5px',
            }}
          >
            Why Choose Us?
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
              gap: 'clamp(20px, 3vw, 32px)',
            }}
          >
            {[
              { icon: Award, title: '15+ Years', text: 'Of experience' },
              { icon: Users, title: '5000+', text: 'Students helped' },
              { icon: Globe, title: '15+', text: 'Countries' },
              { icon: Target, title: '98%', text: 'Visa success rate' },
            ].map(({ icon: Icon, title, text }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1 + 0.4, type: 'spring' }}
                style={{ textAlign: 'center' }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    background: 'rgba(222,128,43,0.15)',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 12px',
                  }}
                >
                  <Icon size={26} color="#DE802B" />
                </div>
                <div
                  style={{
                    fontSize: 'clamp(24px, 4vw, 32px)',
                    fontWeight: 800,
                    color: '#DE802B',
                    marginBottom: '4px',
                    lineHeight: 1,
                  }}
                >
                  {title}
                </div>
                <div
                  style={{
                    color: '#3E2C23',
                    fontSize: '14px',
                    fontWeight: 600,
                    opacity: 0.8,
                  }}
                >
                  {text}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(32px, 5vw, 48px)',
          }}
        >
          <div
            style={{
              display: 'inline-block',
              background: 'rgba(222, 128, 43, 0.15)',
              border: '1px solid rgba(222, 128, 43, 0.3)',
              borderRadius: '50px',
              padding: '6px 18px',
              fontSize: '13px',
              color: '#DE802B',
              marginBottom: '16px',
              fontWeight: 700,
              letterSpacing: '1px',
            }}
          >
            OUR TEAM
          </div>
          <h2
            style={{
              fontSize: 'clamp(26px, 4vw, 36px)',
              fontWeight: 800,
              color: '#3E2C23',
              marginBottom: '12px',
              letterSpacing: '-0.5px',
            }}
          >
            Meet Our Team
          </h2>
          <p
            style={{
              color: '#3E2C23',
              fontSize: 'clamp(14px, 2vw, 16px)',
              opacity: 0.75,
            }}
          >
            Expert professionals committed to your success
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: 'clamp(16px, 2.5vw, 24px)',
          }}
        >
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              style={{
                background: '#C0E1D2',
                borderRadius: '24px',
                padding: 'clamp(28px, 4vw, 36px) clamp(20px, 3vw, 24px)',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(62,44,35,0.08)',
                border: '1px solid rgba(62,44,35,0.05)',
                transition: 'box-shadow 0.3s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  '0 16px 40px rgba(62,44,35,0.15)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow =
                  '0 4px 20px rgba(62,44,35,0.08)')
              }
            >
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: '#3E2C23',
                  color: '#DE802B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  fontWeight: 800,
                  margin: '0 auto 16px',
                  boxShadow: '0 8px 20px rgba(62,44,35,0.2)',
                }}
              >
                {member.avatar}
              </div>
              <div
                style={{
                  fontSize: 'clamp(16px, 2vw, 18px)',
                  fontWeight: 700,
                  color: '#3E2C23',
                  marginBottom: '4px',
                }}
              >
                {member.name}
              </div>
              <div
                style={{
                  color: '#DE802B',
                  fontWeight: 700,
                  fontSize: '14px',
                  marginBottom: '8px',
                }}
              >
                {member.role}
              </div>
              <div
                style={{
                  color: '#3E2C23',
                  fontSize: '13px',
                  opacity: 0.7,
                }}
              >
                {member.exp}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
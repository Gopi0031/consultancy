// src/app/about/page.js
'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Target, Eye, Heart, Award, Users, Globe } from 'lucide-react'

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
      style={{ minHeight: '100vh', background: '#E5EEE4', paddingTop: '90px' }}
    >
      {/* Hero */}
      <div
        style={{
          background: 'linear-gradient(135deg, #C0E1D2 0%, #C0E1D2 100%)',
          padding: '90px 24px',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 800,
              color: '#3E2C23',
              marginBottom: '16px',
            }}
          >
            About TalentoNova
          </h1>
          <p
            style={{
              color: '#3E2C23',
              fontSize: '18px',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            We are a team of passionate experts dedicated to making your
            international dreams a reality.
          </p>
        </motion.div>
      </div>

      {/* Mission Vision Values */}
      <div
        ref={ref}
        style={{ maxWidth: '1100px',  margin: '0 auto', padding: '80px 24px' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px',
            marginBottom: '80px',
            
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
              style={{
                backgroundColor:'#C0e1d2',
                borderRadius: '24px',
                padding: '36px 28px',
                boxShadow: '0 4px 24px rgba(62,44,35,0.1)',
                textAlign: 'center',
              }}
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
                }}
              >
                <Icon size={28} color="#FFF6DE" />
              </div>
              <h3
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#3E2C23',
                  marginBottom: '12px',
                }}
              >
                {title}
              </h3>
              <p
                style={{
                  color: '#7a5c45',
                  lineHeight: 1.7,
                  fontSize: '15px',
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
            backgroundColor:'#C0e1d2',
            borderRadius: '28px',
            padding: '60px 40px',
            marginBottom: '80px',
          }}
        >
          <h2
            style={{
              fontSize: '36px',
              fontWeight: 800,
              color: '#3E2C23',
              textAlign: 'center',
              marginBottom: '48px',
            }}
          >
            Why Choose Us?
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '32px',
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
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.1 + 0.4 }}
                style={{ textAlign: 'center' }}
              >
                <Icon
                  size={32}
                  color="#3E2C23"
                  style={{ margin: '0 auto 12px' }}
                />
                <div
                  style={{
                    fontSize: '32px',
                    fontWeight: 800,
                    color: '#3E2C23',
                    marginBottom: '4px',
                  }}
                >
                  {title}
                </div>
                <div
                  style={{ color: '#3E2C23', fontSize: '14px' }}
                >
                  {text}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: '36px',
              fontWeight: 800,
              color: '#3E2C23',
              marginBottom: '12px',
            }}
          >
            Meet Our Team
          </h2>
          <p style={{ color: '#7a5c45' }}>
            Expert professionals committed to your success
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
          }}
        >
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              style={{
                background: '#C0E1D2',
                borderRadius: '24px',
                padding: '36px 24px',
                textAlign: 'center',
                boxShadow: '0 4px 20px rgba(62,44,35,0.08)',
              }}
            >
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: '#3E2C23',
                  color: '#FFF6DE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  fontWeight: 800,
                  margin: '0 auto 16px',
                }}
              >
                {member.avatar}
              </div>
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#3E2C23',
                  marginBottom: '4px',
                }}
              >
                {member.name}
              </div>
              <div
                style={{
                  color: '#d4a96a',
                  fontWeight: 600,
                  fontSize: '14px',
                  marginBottom: '8px',
                }}
              >
                {member.role}
              </div>
              <div style={{ color: '#7a5c45', fontSize: '13px' }}>
                {member.exp}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
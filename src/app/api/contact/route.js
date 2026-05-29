// src/app/api/contact/route.js
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { prisma } from '@/lib/prisma'

export async function POST(request) {
  try {
    const { name, email, phone, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      )
    }

    // Save to DB
    await prisma.contact.create({
      data: { name, email, phone: phone || '', message },
    })

    // Send email
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Contact: ${name}`,
      html: `
        <div style="font-family:Arial;max-width:600px;margin:0 auto;background:#FFF6DE;padding:30px;border-radius:12px">
          <h2 style="color:#3E2C23;border-bottom:2px solid #3E2C23;padding-bottom:10px">
            New Contact Message
          </h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;color:#3E2C23;font-weight:bold">Name:</td>
                <td style="padding:10px 0;color:#3E2C23">${name}</td></tr>
            <tr><td style="padding:10px 0;color:#3E2C23;font-weight:bold">Email:</td>
                <td style="padding:10px 0;color:#3E2C23">${email}</td></tr>
            <tr><td style="padding:10px 0;color:#3E2C23;font-weight:bold">Phone:</td>
                <td style="padding:10px 0;color:#3E2C23">${phone || 'Not provided'}</td></tr>
            <tr><td style="padding:10px 0;color:#3E2C23;font-weight:bold;vertical-align:top">Message:</td>
                <td style="padding:10px 0;color:#3E2C23">${message}</td></tr>
          </table>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
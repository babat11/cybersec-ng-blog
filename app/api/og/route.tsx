import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

// Sanitize user input for OG image rendering (A03 - XSS/Injection)
function sanitizeInput(input: string, maxLength = 200): string {
  return input
    .replace(/[<>"'&]/g, '') // strip HTML special chars
    .replace(/[^\x20-\x7E\u00A0-\uFFFF]/g, '') // strip non-printable chars
    .trim()
    .slice(0, maxLength)
}

const ALLOWED_LEVELS = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFO']

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const rawTitle = searchParams.get('title') || 'CyberSec NG'
  const rawLevel = searchParams.get('level') || ''
  const rawCve = searchParams.get('cve') || ''

  // Sanitize all inputs
  const title = sanitizeInput(rawTitle, 120)
  const level = ALLOWED_LEVELS.includes(rawLevel.toUpperCase()) ? rawLevel.toUpperCase() : ''
  const cve = sanitizeInput(rawCve, 30).replace(/[^a-zA-Z0-9\-]/g, '')

  const levelColor = {
    CRITICAL: '#ff0040',
    HIGH: '#ff6b00',
    MEDIUM: '#ffaa00',
    LOW: '#00aaff',
  }[level] || '#00ff88'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0a0a0f',
          display: 'flex',
          flexDirection: 'column',
          padding: '60px',
          fontFamily: 'monospace',
          position: 'relative',
        }}
      >
        {/* Grid background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff0040' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffaa00' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#00ff88' }} />
          <span style={{ color: '#6b7280', fontSize: '14px', marginLeft: '12px' }}>cybersec-ng — threat-alert</span>
        </div>

        {/* THREAT ALERT badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px',
        }}>
          <div style={{
            background: level ? levelColor + '20' : '#00ff8820',
            border: `1px solid ${level ? levelColor : '#00ff88'}`,
            borderRadius: '6px', padding: '6px 16px',
            color: level ? levelColor : '#00ff88',
            fontSize: '14px', fontWeight: 'bold',
          }}>
            {level ? `THREAT LEVEL: ${level}` : '⚡ THREAT ALERT'}
          </div>
          {cve && (
            <div style={{
              background: '#ff004020', border: '1px solid #ff0040',
              borderRadius: '6px', padding: '6px 16px',
              color: '#ff0040', fontSize: '14px',
            }}>
              {cve}
            </div>
          )}
        </div>

        {/* Title */}
        <div style={{
          color: '#ffffff', fontSize: title.length > 60 ? '36px' : '44px',
          fontWeight: 'bold', lineHeight: '1.2', flex: 1,
          maxWidth: '900px',
        }}>
          {title}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#ff0040', fontSize: '20px' }}>▓</span>
            <span style={{ color: '#ffffff', fontSize: '18px', fontWeight: 'bold' }}>CyberSec NG</span>
          </div>
          <span style={{ color: '#6b7280', fontSize: '14px' }}>cybersec-ng.vercel.app</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}

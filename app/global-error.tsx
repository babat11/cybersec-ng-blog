'use client'
import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Report to Sentry
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="en">
      <body style={{ background: '#0a0a0f', color: '#e0e0e0', fontFamily: 'monospace', padding: '2rem' }}>
        <div style={{ maxWidth: '600px', margin: '4rem auto', border: '1px solid #1a1a2e', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ background: '#161625', padding: '10px 14px', display: 'flex', gap: '6px', alignItems: 'center', borderBottom: '1px solid #1a1a2e' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff0040' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffaa00' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#00ff88' }} />
            <span style={{ marginLeft: '8px', color: '#6b7280', fontSize: '13px' }}>bash — critical error</span>
          </div>
          <div style={{ padding: '2rem' }}>
            <p style={{ color: '#ff0040', marginBottom: '8px' }}>⚠ FATAL: Unhandled exception detected</p>
            <p style={{ color: '#6b7280', fontSize: '13px', marginBottom: '24px' }}>
              Error reported automatically. Our team has been notified.
            </p>
            <button
              onClick={reset}
              style={{
                background: '#00ff88', color: '#0a0a0f', border: 'none',
                padding: '10px 20px', borderRadius: '6px', cursor: 'pointer',
                fontFamily: 'monospace', fontWeight: 'bold', fontSize: '13px',
              }}
            >
              ./retry →
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}

import * as Sentry from '@sentry/nextjs'

// Edge runtime config — used by /api/og route
Sentry.init({
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,

  enabled: process.env.NODE_ENV === 'production',

  // Minimal sampling on edge — very low latency budget
  tracesSampleRate: 0.05,
  sampleRate: 1.0,

  environment: process.env.NODE_ENV,
})

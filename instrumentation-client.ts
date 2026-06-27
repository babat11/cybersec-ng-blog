import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance monitoring — capture 10% of transactions (free tier friendly)
  tracesSampleRate: 0.1,

  // Session replay — capture 10% of sessions, 100% of sessions with errors
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Only enable in production
  enabled: process.env.NODE_ENV === 'production',

  // Ignore common non-actionable errors
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Non-Error promise rejection captured',
    /^Network request failed/,
    /^Failed to fetch/,
  ],

  beforeSend(event) {
    // Strip any PII from error events before sending to Sentry
    if (event.request?.headers) {
      delete event.request.headers['Cookie']
      delete event.request.headers['Authorization']
    }
    return event
  },
})

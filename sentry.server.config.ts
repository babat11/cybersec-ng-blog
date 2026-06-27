import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Lower sample rate on server — less noise, stays within free tier
  tracesSampleRate: 0.05,

  // Only enable in production
  enabled: process.env.NODE_ENV === 'production',

  beforeSend(event) {
    // Strip sensitive headers before sending to Sentry
    if (event.request?.headers) {
      delete event.request.headers['Cookie']
      delete event.request.headers['Authorization']
      delete event.request.headers['X-Forwarded-For']
    }
    return event
  },
})

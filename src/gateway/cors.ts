import { CorsOptions } from 'cors'

export const cors = (): CorsOptions => {
  let origin: CorsOptions['origin'] = (process.env.CORS_ORIGINS || '').split('|')

  if (process.env.NODE_ENV === 'development') {
    origin = [
      ...origin,
      'http://localhost:8000',
      'http://localhost:3000',
    ]
  }

  console.log(origin.map(o => `Allowing requests from: ${o}`).join('\n'))

  return {
    origin,
    credentials: true,
  }
}

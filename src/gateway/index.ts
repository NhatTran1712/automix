import 'reflect-metadata'
import express from 'express'
import { server } from './apollo'
import * as Sentry from '@sentry/node'
import { cors } from './cors'

const app = express()
const port = Number(process.env.PORT) || 4000

Sentry.init({ dsn: 'https://48be60c718824788841fe4fef6eec94d@o99321.ingest.sentry.io/5247209' })

server.applyMiddleware({ app, cors: cors() })

app.use(Sentry.Handlers.requestHandler())

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
)

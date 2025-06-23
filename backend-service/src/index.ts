import { serve } from '@hono/node-server'
import { type Context, Hono } from 'hono'
import { swaggerUI } from '@hono/swagger-ui'
import { 
  authRoute, 
  userRoute,
  majorRoute
} from '@/routes/index.ts'
import { openAPISpecs } from 'hono-openapi'
import { cors } from 'hono/cors'
import dotenv from "dotenv"
import type { HTTPResponseError } from 'hono/types'
import { generateMeta } from './utils/generate-meta.ts'
import { HTTPException } from 'hono/http-exception'

dotenv.config()

const port = process.env.PORT || 4000
const app = new Hono()

app.use("*", cors())

app.get('/', (c) => {
  return c.json({
    message: "Alumnio API, see /ui for documentation"
  })
})

// FOR APP ROUTE
app.route("/auth", authRoute)
app.route("/users", userRoute)
app.route("/majors", majorRoute)
// END ROUTE

app.use('/ui', swaggerUI({ url: '/docs' }))

app.get(
  '/docs',
  openAPISpecs(app, {
    documentation: {
      info: {
        title: 'Hono API',
        version: '1.0.0',
        description: 'Greeting API',
      },
      servers: [
        { url: `http://localhost:${port}`, description: 'Local Server' },
      ],
    },
  })
)

// ERROR HANDLING
app.onError((err: Error | HTTPResponseError, c: Context) => {
  return c.json({
    meta: generateMeta(
      "FAILED", 
      err instanceof HTTPException ? err.getResponse().status : 500, 
      err.message
    ),
    data: []
  })
})

serve({
  fetch: app.fetch,
  port: port as number,
  hostname: "0.0.0.0"
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

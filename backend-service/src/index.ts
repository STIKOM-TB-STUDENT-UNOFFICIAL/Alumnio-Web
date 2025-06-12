import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { swaggerUI } from '@hono/swagger-ui'
import { authRoute } from '@/routes/auth-route.ts'
import { openAPISpecs } from 'hono-openapi'

const app = new Hono()

app.get('/', (c) => {
  return c.json({
    message: "Alumnio API, see /ui for documentation"
  })
})

app.route("/auth", authRoute)

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
        { url: 'http://localhost:3000', description: 'Local Server' },
      ],
    },
  })
)

serve({
  fetch: app.fetch,
  port: 4000,
  hostname: "0.0.0.0"
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

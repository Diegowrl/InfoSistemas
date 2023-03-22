import fastify from 'fastify'
import coockie from '@fastify/cookie'
import { veiculosRoutes } from './controller/veiculo'
import { env } from './env'

const app = fastify()

app.register(coockie)
app.register(veiculosRoutes, {
  prefix: 'veiculos',
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })

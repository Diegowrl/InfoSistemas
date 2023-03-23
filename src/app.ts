import fastify from 'fastify'
import coockie from '@fastify/cookie'
import { veiculosRoutes } from './controller/veiculoController'

export const app = fastify()

app.register(coockie)

app.register(veiculosRoutes, {
  prefix: 'veiculos',
})

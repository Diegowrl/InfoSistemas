import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { z } from 'zod'
import { checkSessionIdExist } from '../middlewares/check-session-id-exist'

export async function veiculosRoutes(app: FastifyInstance) {
  app.post('/', { preHandler: [checkSessionIdExist] }, async (req, res) => {
    const createVeiculoBodySchema = z.object({
      placa: z.string(),
      chassi: z.string(),
      renavam: z.string(),
      modelo: z.string(),
      marca: z.string(),
      ano: z.number(),
    })

    const body = createVeiculoBodySchema.parse(req.body)

    let sessionId = req.cookies.session_id

    if (!sessionId) {
      sessionId = randomUUID()

      res.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7dias
      })
    }

    await knex('veiculos').insert({
      id: randomUUID(),
      session_id: sessionId,
      placa: body.placa,
      chassi: body.chassi,
      renavam: body.renavam,
      modelo: body.modelo,
      marca: body.marca,
      ano: body.ano,
    })

    return res.status(201).send()
  })

  app.get('/', { preHandler: [checkSessionIdExist] }, async (req) => {
    const { sessionId } = req.cookies

    const veiculo = await knex('veiculos')
      .where('session_id', sessionId)
      .select()

    return { veiculo }
  })

  app.get('/:id', { preHandler: [checkSessionIdExist] }, async (req) => {
    const { sessionId } = req.cookies
    const getVeiculoBodySchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getVeiculoBodySchema.parse(req.params)

    const veiculo = await knex('veiculos')
      .select()
      .where({
        id,
        session_id: sessionId,
      })
      .first()

    return { veiculo }
  })

  app.delete(
    '/:id',
    { preHandler: [checkSessionIdExist] },
    async (req, res) => {
      const { sessionId } = req.cookies

      const getVeiculoBodySchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getVeiculoBodySchema.parse(req.params)

      await knex('veiculos').delete().where({
        id,
        session_id: sessionId,
      })

      return res.status(201).send()
    },
  )
}

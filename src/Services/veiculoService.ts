import { randomUUID } from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
// import { knex } from '../database'
import { z } from 'zod'
import { db } from '../repositories/veiculoRepository'

export const veiculosService = {
  create: async (req: FastifyRequest, res: FastifyReply) => {
    const createVeiculoBodySchema = z.object({
      placa: z.string(),
      chassi: z.string(),
      renavam: z.string(),
      modelo: z.string(),
      marca: z.string(),
      ano: z.number(),
    })

    const body = createVeiculoBodySchema.parse(req.body)

    let sessionId = req.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      res.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7dias
      })
    }

    await db.insert({
      body,
      session: sessionId,
    })
  },
  getAll: async (req: FastifyRequest, res: FastifyReply) => {
    const { sessionId } = req.cookies

    const veiculo = await db.get(sessionId)

    res.send(veiculo)
  },
  getById: async (req: FastifyRequest, res: FastifyReply) => {
    const { sessionId } = req.cookies
    const getVeiculoBodySchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getVeiculoBodySchema.parse(req.params)

    const veiculo = await db.getById({ id, sessionId })

    res.send(veiculo)
  },
  delete: async (req: FastifyRequest) => {
    const { sessionId } = req.cookies

    const getVeiculoBodySchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getVeiculoBodySchema.parse(req.params)

    await db.deleteById({
      id,
      session_id: sessionId,
    })
  },
  update: async (req: FastifyRequest) => {
    const updateVeiculoBodySchema = z.object({
      id: z.string(),
      placa: z.string(),
      chassi: z.string(),
      renavam: z.string(),
      modelo: z.string(),
      marca: z.string(),
      ano: z.number(),
    })

    const body = updateVeiculoBodySchema.parse(req.body)

    const { sessionId } = req.cookies

    await db.updateById({
      body,
      sessionId,
    })
  },
}

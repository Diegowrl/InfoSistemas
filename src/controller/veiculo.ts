import { FastifyInstance } from 'fastify'
import { checkSessionIdExist } from '../middlewares/check-session-id-exist'
import { veiculosService } from '../Services/veiculoService'

export async function veiculosRoutes(app: FastifyInstance) {
  app.post('/', async (req, res) => {
    await veiculosService.create(req, res)

    return res.status(201).send()
  })

  app.get('/', { preHandler: [checkSessionIdExist] }, async (req, res) => {
    const veiculo = await veiculosService.getAll(req, res)

    return { veiculo }
  })

  app.get('/:id', { preHandler: [checkSessionIdExist] }, async (req, res) => {
    const veiculo = await veiculosService.getById(req, res)

    return { veiculo }
  })

  app.delete(
    '/:id',
    { preHandler: [checkSessionIdExist] },
    async (req, res) => {
      await veiculosService.delete(req)
      return res.status(202).send()
    },
  )

  app.put('/:id', { preHandler: [checkSessionIdExist] }, async (req, res) => {
    await veiculosService.update(req)
    return res.status(202).send()
  })
}

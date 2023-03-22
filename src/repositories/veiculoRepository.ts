import { randomUUID } from 'crypto'
import { knex } from '../database'

export const db = {
  insert: async (req: any) =>
    await knex('veiculos').insert({
      id: randomUUID(),
      session_id: req.session,
      placa: req.body.placa,
      chassi: req.body.chassi,
      renavam: req.body.renavam,
      modelo: req.body.modelo,
      marca: req.body.marca,
      ano: req.body.ano,
    }),

  get: async (sessionId: any) =>
    await knex('veiculos').where('session_id', sessionId).select(),

  getById: async (req: any) =>
    await knex('veiculos')
      .select()
      .where({
        id: req.id,
        session_id: req.sessionId,
      })
      .first(),

  deleteById: async (req: any) =>
    await knex('veiculos')
      .delete()
      .where({ id: req.id, session_id: req.session_id }),

  updateById: async (req: any) =>
    await knex('veiculos')
      .update({
        placa: req.body.placa,
        chassi: req.body.chassi,
        renavam: req.body.renavam,
        modelo: req.body.modelo,
        marca: req.body.marca,
        ano: req.body.ano,
      })
      .where({
        id: req.body.id,
        session_id: req.sessionId,
      }),
}

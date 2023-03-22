// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    veiculos: {
      id: string
      session_id?: string
      placa: string
      chassi: string
      renavam: string
      modelo: string
      marca: string
      ano: number
      created_at: string
    }
  }
}

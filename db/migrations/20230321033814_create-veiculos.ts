import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('veiculos', (table) => {
        table.uuid('id').primary()
        table.uuid('session_id').index()
        table.text('placa').notNullable()
        table.text('chassi').notNullable()
        table.text('renavam').notNullable()
        table.text('modelo').notNullable()
        table.text('marca').notNullable()
        table.dateTime('ano').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('veiculos')
}


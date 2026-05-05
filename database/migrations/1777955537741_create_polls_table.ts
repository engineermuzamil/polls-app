import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'polls'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('user_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')

      table.string('title', 255).notNullable()
      table.string('slug', 255).notNullable().unique()
      table.string('poll_color', 50).notNullable().defaultTo('#6366f1')

      table.timestamp('closes_at', { useTz: true }).notNullable()
      table.timestamp('deleted_at', { useTz: true }).nullable().defaultTo(null)
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

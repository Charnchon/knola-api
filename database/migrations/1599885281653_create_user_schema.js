'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateUserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments('user_id')
      table.string("user_first_name",80).notNullable()
      table.string("user_last_name",80).notNullable()
      table.integer("user_age",3)
      table.string("user_gender",15)
      table.string("user_email").notNullable().unique()
      table.string("user_password").notNullable()
      table.string("user_bio",255)

      table.timestamp('user_timestamps').default(this.fn.now())
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = CreateUserSchema

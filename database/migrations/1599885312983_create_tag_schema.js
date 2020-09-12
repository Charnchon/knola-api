'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateTagSchema extends Schema {
  up () {
    this.create('tags', (table) => {
      table.increments('tag_id')
      table.string('tag_name').notNullable().unique()
    })
  }

  down () {
    this.drop('tags')
  }
}

module.exports = CreateTagSchema

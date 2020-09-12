'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateCommentSchema extends Schema {
  up () {
    this.create('comments', (table) => {
      table.increments("comment_id")
      table.string("comment_content")
      table.integer("user_id").unsigned().notNullable()
      table.integer("blog_id").unsigned().notNullable()
      table.timestamp("comment_date").default(this.fn.now())
      table.foreign("blog_id").references("blogs.blog_id").onDelete("CASCADE").onUpdate("CASCADE")

    })
  }

  down () {
    this.drop('comments')
  }
}

module.exports = CreateCommentSchema

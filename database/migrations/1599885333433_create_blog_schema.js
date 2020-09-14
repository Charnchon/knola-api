'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateBlogSchema extends Schema {
  up () {
    this.create('blogs', (table) => {
      table.increments("blog_id")
      table.string('blog_title',120)
      table.string('blog_content',255)
      table.timestamp("blog_date").default(this.fn.now())
      table.timestamps()
      table.integer("user_id").unsigned().notNullable()
      table.integer("tag_id").unsigned()
      
      table
        .foreign("user_id")
        .references("users.user_id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")

      table
        .foreign("tag_id")
        .references("tags.tag_id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE")


    })
  }

  down () {
    this.drop('blogs')
  }
}

module.exports = CreateBlogSchema

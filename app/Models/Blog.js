'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Blog extends Model {

    static get primaryKey() {
        return 'blog_id'
    }
    static get createdAtColumn() {
        return null
    }

    static get updatedAtColumn() {
        return null
    }
    
}

module.exports = Blog

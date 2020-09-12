'use strict'

const Blog = require('./Blog')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Comment extends Model {

    static get primaryKey() {
        return 'comment_id'
    }

    user() {
        return this.belongsTo("App/Models/User")
    }

    blog() {
        return this.belongsTo("App/Models/Blog")
    }


    static get createdAtColumn() {
        return null
    }

    static get updatedAtColumn() {
        return null
    }
    
}

module.exports = Comment

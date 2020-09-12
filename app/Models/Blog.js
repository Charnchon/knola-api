'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Blog extends Model {

    static get primaryKey() {
        return 'blog_id'
    }

    comment(){
        return this.hasMany("App/Models/Comment")
    }

    user() { 
        return this.belongsTo("App/Models/User")
    }

    tag() { 
        return this.belongsTo("App/Models/Tag")
    }

    static get createdAtColumn() {
        return null
    }

    static get updatedAtColumn() {
        return null
    }
    
    
}

module.exports = Blog

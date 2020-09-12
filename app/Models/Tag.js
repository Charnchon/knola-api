'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tag extends Model {
    
    static get primaryKey() { 
        return 'tag_id'
    }

    static get createdAtColumn() {
        return null
    }

    static get updatedAtColumn() {
        return null
    }

    blog() { 
        return this.hasMany("App/Models/Blog")
    }
    
}

module.exports = Tag

'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
    
    static get primaryKey() {
        return 'user_id'
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

    comment() { 
        return this.hasMany("App/Models/Comment")
    }


    static boot () {
        super.boot()
        this.addHook('beforeCreate', 'UserHook.hashPassword')
    }
    
}

module.exports = User

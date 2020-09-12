'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class DatabaseSeeder {
  async run () {
    const users = await Factory.model("App/Models/User").createMany(10) ; 
  
    const tags = await Factory.model("App/Models/Tag").createMany(10) ;
    
    const blogs = await Factory.model("App/Models/Comment").createMany(10) ; 
    
    const comments = await Factory.model("App/Models/Blog").createMany(10) ; 

  }
}

module.exports = DatabaseSeeder

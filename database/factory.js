'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint("App/Models/User" , (faker) => { 
    return { 
        user_first_name : faker.first() , 
        user_last_name : faker.last() , 
        user_age : faker.age() , 
        user_gender : faker.gender() , 
        user_email : faker.email() , 
        user_password : faker.word() , 
        user_bio : faker.sentence()
    }    
})

Factory.blueprint("App/Models/Tag" , (faker) => { 
    return { 
        tag_name : faker.word({ length: 5 })  
    }    
})

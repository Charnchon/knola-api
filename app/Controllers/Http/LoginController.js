'use strict'
const User = use('App/Models/User');

class LoginController {

    async login({request, auth, response}) {
        const username = request.input("user_username")
        const password = request.input("user_password")
        try {
          if (await auth.attempt(username, password)) {
            let user = await User.findBy('user_username', username)
            let accessToken = await auth.generate(user)
            return response.json({status:200,error:undefined,"user":user, "access_token": accessToken})
          }

        }
        catch (e) {
          return response.json({message: 'You first need to register!'})
        }
    }
    
}

module.exports = LoginController

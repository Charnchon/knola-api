const User = use('App/Models/User')
const Validator = use('Validator')


class UserUtil {
    constructor (UserModel) {
        this._User = UserModel
    }
    getAll (references) {
        
        const users = this._User.query()
        if(references) {
            const extractedReferences = references.split(",")
            users.with(extractedReferences)
        }
        return users.fetch()
    }

    getById (references) {
        const user = this._User.query()
        
        if(references) {
            const extractedReferences = references.split(",")
            users.with(extractedReferences)
        }
        return user.where('user_id',userId).fetch()

    }

    
}

module.exports = UserUtil
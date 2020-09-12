
const Validator = use('Validator')
const Hash = use('Hash')


class UserUtil {

    constructor (UserModel) {
        this._User = UserModel
    }

    _withReferences(request, references) {
        if (references) {
          const extractedReferences = references.split(",")
          request.with(extractedReferences)
        }
        return request;
    }

    getAll (references) {
        const users = this._User.query()
        return this._withReferences(users,references).fetch().then(response => response)
    }

    getById (request,references) {
        const {id} = request.params
        const users = this._User.query().where({user_id : id})
        return this._withReferences(users,references).fetch().then(response => response.first())
    }

    async create(request,references) {
        const {user_id} =  await this._User.create(request.body)
        const {user_password} =  await this._User.query('user_password').where({user_id:user_id})
        const users = this._User.query().where({user_id:user_id})
        const hashPassword = await Hash.make({user_password})
        return this._withReferences(users,references).fetch().then(response => response.first())
    }

    async updateById(request,references){
        const {id} = request.params
        let users = await this._User.find(id)
        if(!users){
            return {status:500,error:`Not Found ${id}`,data:undefined};
        }
        users.merge(request.body)
        await users.save()
        users = this._User.query().where({user_id:id})
        return this._withReferences(users,references).fetch().then(response => response.first())
    }

    async deletById(request){
        const {id} = request.params
        const users = await this._User.find(id)
        if(!users){
            return {status:500,error:`Not Found ${id}`,data:undefined};
        }
        users.delete()
        await users.save()
        return {status:200,error:undefined,data:'successful'};
    }

    
}

module.exports = UserUtil
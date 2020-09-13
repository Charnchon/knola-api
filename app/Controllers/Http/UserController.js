'use strict'
const User = use('App/Models/User')
const Validator = require('../../../service/UserValidator')
const Login = require('../../../service/UserLogin')
const UserUtil = require('../../../util/userUtil')

class UserController {

    async index({request}) {
        const {references = undefined} = request.qs
        const userUtil = new UserUtil(User)
        const users = await userUtil.getAll(references)
        return {status:200,error:undefined,data:users}
    }

    async show ({request}) {
        const {references = undefined} = request.qs
        const userUtil = new UserUtil(User)
        const user = await userUtil.getById(request,references)
        return {status:200,error:undefined,data:user}
    }

    async store({request}) {
        const {references = undefined} = request.qs
        const userUtil = new UserUtil(User)
        const validation = await Validator(request.body)
        if(validation.error){
            return {status: 422, error: validation.error,data: undefined}
        }
        const users = await userUtil.create(request,references)
        return {status:200,error:undefined,data:users};
    }
    
    async update({request}) {
        const {references = undefined} =request.qs
        const userUtil = new UserUtil(User)
        const users = await userUtil.updateById(request,references)
        return {status:200,error:undefined,data:users};

    }

    async destroy ({request}) {
        const {references = undefined} = request.qs
        const userUtil = new UserUtil(User)
        const user = await userUtil.deletById(request,references)
        return {status:200,error:undefined,data:user}
    }

    async login ({ request, auth }) {
        const {user_username, user_password} = request.body
        const users = await auth.attempt(user_username, user_password)
        return {status:200,error:undefined,data:users}
    }
    
}

module.exports = UserController

'use strict'

const Database =  use('Database')
const Validator = use('Validator')
const User = use('App/Models/User')
const UserUtil = require('../../../util/userUtil')

function numberTypeParamValidator(number) {
    if(Number.isNaN(parseInt(number))) 
        return {error:"param: ${number} is not support please input number" }
    return {}
}

class UserController {

    async index({request}) {
        
        const {references = undefined} = request.qs
       
        const userUtil = new UserUtil(User)
        const users = await userUtil.getAll(references)

        return {status:200,error:undefined,data:users}

    }

    async show ({request}) {

        const {id} = request.params
        const {references = undefined} = request.qs

        const validatedValue = numberTypeParamValidator(id)

        const userUtil = new UserUtil(User)
        const users = await userUtil.getById(references)

        return {status:200,error:undefined,data:user || {}}

        // if (validatedValue.error) return {
        //     status : 500,error:validatedValue.error, data:undefined
        // }

        // const user = await User.find(id)
        // return {status:200,error:undefined,data:user || {}}
    }

    async store ({request}) {

        const {user_first_name,user_last_name,user_age,user_gender,user_email,user_password,user_bio} = request.body

        const rules = {
            user_first_name: "required",
            user_last_name: "required",
            user_age: "required",
            user_gender: "required",
            user_email: "required",
            user_password: "required",
            user_bio: "required"
        }

        const validation = await Validator.validateAll(request.body,rules)

        if(validation.fails())
            return {status:422,error:validation.messages(),data:undefined}

        const user = await Database.table("users").insert({user_first_name,user_last_name,user_age,user_gender,user_email,user_password,user_bio})
        
        return {status:200,error:undefined,data:{user_first_name,user_last_name,user_age,user_gender,user_email,user_password,user_bio}}
    }

    
    async update ({request}) {

        const {body,params} = request 
        const {id} = params
        const {title,teacher_id} = body

        const subjectId = await Database.table("subjects").where({subject_id: id})
        .update({title,teacher_id})

        const subject = await Database.table("subjects").where({subject_id: subjectId})
        .first()

        return {status:200,error:undefined,data:subject}

    }

    async destroy ({request}) {

        const {id} = request.params
        const deleteSubject = await Database.table("subjects").where({subject_id:id}).delete()
        return {status:200,error:undefined,data:{message:'success'}}

    }

    async showTeacher({request}) {
        const {id} = request.params
        const subject = await Database
        .table('subjects')
        .where({subject_id : id})
        .innerJoin('teachers','subjects.teacher_id','teachers.teacher_id')
        .first()
        return {status:200,error:undefined,data:subject || {}}
    }

    async showEnrollment({request}) {
        const {id} = request.params
        const subject = await Database
        .table('subjects')
        .where({subject_id : id})
        .innerJoin('enrollments','subjects.subject_id','enrollments.subject_id')
        .first()
        return {status:200,error:undefined,data:subject || {}}

    }

}

module.exports = UserController

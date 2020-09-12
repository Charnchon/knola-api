'use strict'

const Database = use('Database')
const Tag = use('App/Models/Tag')
const TagUtil = reqire('../../../util/tagUtil')



class TagController {

    async index({request}) {
        const {references = undefined} = request.qs
        const tagUtil = new TagUtil(Tag)
        const tags = await tserUtil.getAll(references)
        return {status:200,error:undefined,data:users}
    }

    async show ({request}) {
        const {references = undefined} = request.qs
        const tagUtil = new TagUtil(Tag)
        const tag = await tagUtil.getById(request,references)
        return {status:200,error:undefined,data:tag}
    }

    async store({ request }) {
        const {references = undefined} = request.qs
        const tagUtil = new UserUtil(Tag)
        const tags = await tagUtil.create(request,references)
        return {status:200,error:undefined,data:tags};
    }
    
    async update({request}) {
        const {references = undefined} =request.qs
        const tagUtil = new TagUtil(Tag)
        const tags = await tagUtil.updateById(request,references)
        return {status:200,error:undefined,data:tags}; 

    }

    async destroy ({request}) {
        const {references = undefined} = request.qs
        const tagUtil = new TagUtil(Tag)
        const tag = await tagUtil.deletById(request,references)
        return {status:200,error:undefined,data:tag}
    }
    


}

module.exports = TagController

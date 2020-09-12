'use strict'
const Comment = use('App/Models/Comment')
const CommentUtil = require('../../../util/commentUtil')

class CommentController {

    async index({request}) {
        const {references = undefined} = request.qs
        const commentUtil = new CommentUtil(Comment)
        const comments = await commentUtil.getAll(references)
        return {status:200,error:undefined,data:comments}
    }

    async show ({request}) {
        const {references = undefined} = request.qs
        const commentUtil = new CommentUtil(Comment)
        const comment = await commentUtil.getById(request,references)
        return {status:200,error:undefined,data:comment}
    }

    async store({request}) {
        const {references = undefined} = request.qs
        const commentUtil = new CommentUtil(Comment)
        const comments = await commentUtil.create(request,references)
        return {status:200,error:undefined,data:comments};
    }
    
    async update({request}) {
        const {references = undefined} =request.qs
        const commentUtil = new CommentUtil(Comment)
        const comments = await commentUtil.updateById(request,references)
        return {status:200,error:undefined,data:comments}; 

    }

    async destroy ({request}) {
        const {references = undefined} = request.qs
        const commentUtil = new CommentUtil(Comment)
        const comment = await commentUtil.deletById(request,references)
        return {status:200,error:undefined,data:comment}
    }
    


}

module.exports = CommentController

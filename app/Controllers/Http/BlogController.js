'use strict'
const Blog = use('App/Models/Blog')
const BlogUtil = require('../../../util/blogUtil')

class BlogController {

    async index({request}) {
        const {references = undefined} = request.qs
        const blogUtil = new BlogUtil(Blog)
        const blogs = await blogUtil.getAll(references)
        return {status:200,error:undefined,data:blogs}
    }

    async show ({request}) {
        const {references = undefined} = request.qs
        const blogUtil = new BlogUtil(Blog)
        const blog = await blogUtil.getById(request,references)
        return {status:200,error:undefined,data:blog}
    }

    async store({request}) {
        const {references = undefined} = request.qs
        const blogUtil = new BlogUtil(Blog)
        const blogs = await blogUtil.create(request,references)
        return {status:200,error:undefined,data:blogs};
    }
    
    async update({request}) {
        const {references = undefined} =request.qs
        const blogUtil = new BlogUtil(Blog)
        const blogs = await blogUtil.updateById(request,references)
        return {status:200,error:undefined,data:blogs}; 

    }

    async destroy ({request}) {
        const {references = undefined} = request.qs
        const blogUtil = new BlogUtil(Blog)
        const blog = await blogUtil.deletById(request,references)
        return {status:200,error:undefined,data:blog}
    }
    


}

module.exports = BlogController

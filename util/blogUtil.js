const Validator = use('Validator')

class BlogUtil {

    constructor (BlogModel) {
        this._Blog = BlogModel
    }

    _withReferences(request, references) {
        if (references) {
          const extractedReferences = references.split(",")
          request.with(extractedReferences)
        }
        return request;
    }

    getAll (references) {
        const blogs = this._Blog.query()
        return this._withReferences(blogs,references).fetch().then(response => response)
    }

    getById (id,references) {
        const blogs = this._Blog.query().where({blog_id : id})
        return this._withReferences(blogs,references).fetch().then(response => response.first())
    }

    async create(request,references) {
        const {blog_id} =  await this._Blog.create(request.body)
        const blogs = this._Blog.query().where({blog_id:blog_id})
        return this._withReferences(blogs,references).fetch().then(response => response.first())
    }

    async updateById(request,references){
        const {id} = request.params
        let blogs = await this._Blog.find(id)
        if(!blogs){
            return {status:500,error:`Not Found ${id}`,data:undefined};
        }
        blogs.merge(request.body)
        await blogs.save()
        blogs = this._Blog.query().where({blog_id:id})
        return this._withReferences(blogs,references).fetch().then(response => response.first())
    }

    async deletById(request){
        const {id} = request.params
        const blogs= await this._Blog.find(id)
        if(!blogs){
            return {status:500,error:`Not Found ${id}`,data:undefined};
        }
        blogs.delete()
        await blogs.save()
        return {status:200,error:undefined,data:'successful'};
    }

    
}

module.exports = BlogUtil
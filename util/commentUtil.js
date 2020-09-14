const Validator = use('Validator')

class CommentUtil {

    constructor (CommentModel) {
        this._Comment = CommentModel
    }

    _withReferences(request, references) {
        if (references) {
          const extractedReferences = references.split(",")
          request.with(extractedReferences)
        }
        return request;
    }

    getAll (references) {
        const comments = this._Comment.query()
        return this._withReferences(comments,references).fetch().then(response => response)
    }

    getById (id,references) {
        const comments = this._Comment.query().where({comment_id : id})
        return this._withReferences(comments,references).fetch().then(response => response.first())
    }

    async create(request,references) {
        const {comment_id} =  await this._Comment.create(request.body)
        const comments = this._Comment.query().where({comment_id:comment_id})
        return this._withReferences(comments,references).fetch().then(response => response.first())
    }

    async updateById(request,references){
        const {id} = request.params
        let comments = await this._Comment.find(id)
        if(!comments){
            return {status:500,error:`Not Found ${id}`,data:undefined};
        }
        comments.merge(request.body)
        await comments.save()
        comments = this._Comment.query().where({comment_id:id})
        return this._withReferences(comments,references).fetch().then(response => response.first())
    }

    async deletById(request){
        const {id} = request.params
        const comments= await this._Comment.find(id)
        if(!comments){
            return {status:500,error:`Not Found ${id}`,data:undefined};
        }
        comments.delete()
        await comments.save()
        return {status:200,error:undefined,data:'successful'};
    }

    
}

module.exports = CommentUtil
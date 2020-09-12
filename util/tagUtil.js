const Validator = use('Validator')

class TagUtil {

    constructor (TagModel) {
        this._Tag = TagModel
    }

    _withReferences(request, references) {
        if (references) {
          const extractedReferences = references.split(",")
          request.with(extractedReferences)
        }
        return request;
    }

    getAll (references) {
        const tags = this._Tag.query()
        return this._withReferences(tags,references).fetch().then(response => response)
    }

    getById (request,references) {
        const {id} = request.params
        const tags = this._Tag.query().where({tag_id : id})
        return this._withReferences(tags,references).fetch().then(response => response.first())
    }

    async create(request,references) {
        const {tag_id} =  await this._Tag.create(request.body)
        const tags = this._Tag.query().where({tag_id:tag_id})
        return this._withReferences(tags,references).fetch().then(response => response.first())
    }

    async updateById(request,references){
        const {id} = request.params
        let tags = await this._Tag.find(id)
        if(!tags){
            return {status:500,error:`Not Found ${id}`,data:undefined};
        }
        tags.merge(request.body)
        await tags.save()
        tags = this._Tag.query().where({tag_id:id})
        return this._withReferences(tags,references).fetch().then(response => response.first())
    }

    async deletById(request){
        const {id} = request.params
        const tags= await this._Tag.find(id)
        if(!tags){
            return {status:500,error:`Not Found ${id}`,data:undefined};
        }
        tags.delete()
        await tags.save()
        return {status:200,error:undefined,data:'successful'};
    }

    
}

module.exports = TagUtil
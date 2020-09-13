const Validator = use("Validator")

module.exports = async function commentValidator (data) {

    if(typeof data !== 'object') throw new Error()
    const {
        comment_content
    } = data

    const rules = {
        comment_content : 'required'
    }

    const validation = await Validator.validateAll({
        comment_content
    },rules)
    
    return {
        error: validation.messages()
    }

}
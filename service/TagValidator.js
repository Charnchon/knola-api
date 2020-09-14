const Validator = use("Validator")

module.exports = async function tagValidator (data) {

    if(typeof data !== 'object') throw new Error()
    const {
        tag_name
    } = data

    const rules = {
        tag_name : 'required'
    }

    const validation = await Validator.validateAll({
        tag_name
    },rules)
    
    return {
        error: validation.messages()
    }

}
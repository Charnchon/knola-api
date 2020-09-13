const Validator = use("Validator")

module.exports = async function blogValidator (data) {

    if(typeof data !== 'object') throw new Error()
    const {
        blog_title
    } = data

    const rules = {
        blog_title : 'required'
    }

    const validation = await Validator.validateAll({
        blog_title
    },rules)
    
    return {
        error: validation.messages()
    }

}
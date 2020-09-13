const Validator = use("Validator")

module.exports = async function userValidator (data) {

    if(typeof data !== 'object') throw new Error()
    const {
        user_first_name,user_last_name,user_age,
        user_email,user_username,user_password
    } = data

    const rules = {
        user_first_name : 'required',
        user_last_name: 'required',
        user_age : 'required',
        user_email: 'required|email|unique:users,user_email',
        user_username: 'required|unique:users,user_username|min:8',
        user_password: 'required|min:8',
    }

    const validation = await Validator.validateAll({
        user_first_name,user_last_name,user_age,
        user_email,user_username,user_password
    },rules)
    
    return {
        error: validation.messages()
    }

}
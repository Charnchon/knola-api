module.exports = async function userLogin (data) {

    const users = await auth.attempt(user_username, user_password)
    
    return {status:200,error:undefined,data:users}

}
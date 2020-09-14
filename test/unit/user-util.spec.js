const UserUtil = require("../../util/userUtil")
const User = use('App/Models/User')
const { test, trait } = use("Test/Suite")("User Util")
trait("Test/ApiClient")

test("should get more than one when get multiple users", async ({ assert }) => {
    const userUtil = new UserUtil(User);
    const users = await userUtil.getAll()
    assert.isAbove(users.rows.length, 1)
})

test("should return object of requested created index from UserUtil.", async ({assert}) => {
    const user =  new UserUtil(User)
    const {user_id} = await user.getById(2)
    assert.isOk(user)
})
  
test("should return structured data with no references via post method", async ({client,}) => {
    const user = {
        user_first_name : 'John',
        user_last_name: 'Doe',
        user_age : '18',
        user_email: 'johndoeunqiue01@gmail.com',
        user_username: 'johndoe001unqiue',
        user_password: '123456789',
    }
    const response = await client.post('http://127.0.0.1:4000/api/v1/users').send(user).end()
    response.assertStatus(200)
    response.assertJSONSubset({error: undefined,})
    await User.find(response.body.data.user_id).then((response) =>response.delete())
})

test("should return structured data with no references via put method", async ({client,}) => {
    const user1 = {
        user_first_name : 'John',
        user_last_name: 'Doe',
        user_age : '18',
        user_email: 'johndoeunqiue02@gmail.com',
        user_username: 'johndoe001unqiue',
        user_password: '123456789',
    }
    const response1 = await client.post('http://127.0.0.1:4000/api/v1/users').send(user1).end()
    const user2 = {
        user_first_name : 'John',
        user_last_name: 'Doe'
    }
    const response2 = await client.put(`http://127.0.0.1:4000/api/v1/users/${response1.body.data.user_id}`)
        .send(user2).end()
    response2.assertStatus(200)
    response2.assertJSONSubset({error: undefined,})
    await User.find(response2.body.data.user_id).then((response) =>response.delete())
})

test("should return structured data with no references via delete method", async ({client,assert}) => {
    const user1 = {
        user_first_name : 'John',
        user_last_name: 'Doe',
        user_age : '18',
        user_email: 'johndoeunqiue03@gmail.com',
        user_username: 'johndoe001unqiue',
        user_password: '123456789',
    }
    const response1 = await client.post('http://127.0.0.1:4000/api/v1/users').send(user1).end()
    const userId = await response1.body.data.user_id
    const user2 =  new UserUtil(User)
    const {user_id} = await user2.getById(userId)
    const response2 = await client.delete(`http://127.0.0.1:4000/api/v1/users/${response1.body.data.user_id}`)
        .end()
    response2.assertStatus(200)
    response2.assertJSONSubset({error: undefined})
    assert.isNotOk(response2.body.data.user_id)
})
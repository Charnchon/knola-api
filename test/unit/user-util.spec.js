const UserUtil = require("../../util/userUtil")
const User = use('App/Models/User')
const {test} = use('Test/Suite')('Example')

test("should get more than one when get multiple users", async ({ assert }) => {
    const userUtil = new UserUtil(User);
    const users = await userUtil.getAll()
    assert.isAbove(users.rows.length, 1)
})

// test("should return object of requested created index from UserUtil.", async ({assert,}) => {
//     const { user_id } = await UserUtil(UserModel, user_id);
//     const user = await UserUtil(UserModel).getById(user_id,"")
//     assert.isOk(user);
// })
  
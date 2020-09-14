'use strict'

const {test} = use('Test/Suite')('User Validator')
const userValidator = require('../../service/UserValidator')

test('should return object when pass correct data', async({assert}) => {
  const validateData = await userValidator({
    user_first_name : 'John',
    user_last_name: 'Doe',
    user_age : '18',
    user_email: 'johndoeunqiue@gmail.com',
    user_username: 'johndoe001unqiue',
    user_password: '123456789',
  })
assert.isObject(validateData)
})

test('should return undefined when pass correct data', async ({assert}) => {
  const validatedData = await userValidator({
    user_first_name : 'John',
    user_last_name: 'Doe',
    user_age : '18',
    user_email: 'johndoeunqiue@gmail.com',
    user_username: 'johndoe001unqiue',
    user_password: '123456789',
  })
  assert.equal(validatedData.error, undefined)
})

test('should return only one error if single incorrect data is passed', async ({assert}) => {
  const validatedData = await userValidator({
    user_first_name : 'John',
    user_last_name: 'Doe',
    user_age : '18',
    user_email: 'johndoeunqiue@gmail.com',
    user_username: ''/* null */,
    user_password: '123456789',
  })
  assert.equal(validatedData.error.length, 1)
})

test('should return more than one error if multiple incorrect data is passed', async ({assert}) => {
  const validateData = await userValidator({
    user_first_name : 'John',
    user_last_name: 'Doe',
    user_age : '18',
    user_email: 'Wrong Email',
    user_username: ''/* null */,
    user_password: '123456789',
  })
  assert.isAbove( validateData.error.length, 1)
})


test('should return error when username has already used', async ({assert}) => {
  const validateData = await userValidator({
    user_first_name : 'John',
    user_last_name: 'Doe',
    user_age : '18',
    user_email: 'johndoeunqiue@gmail.com',
    user_username: 'johndoe001',
    user_password: '123456789',
  })
  assert.isOk(validateData.error);
})

test('should return error when email has already used', async ({assert}) => {
  const validateData = await userValidator({
    user_first_name : 'John',
    user_last_name: 'Doe',
    user_age : '18',
    user_email: 'john@gmail.com',
    user_username: 'johndoe001unqiue',
    user_password: '123456789',
  })
  assert.isOk(validateData.error)
})
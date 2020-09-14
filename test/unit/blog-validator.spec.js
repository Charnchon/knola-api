'use strict'

const {test} = use('Test/Suite')('Example')
const blogValidator = require('../../service/BlogValidator')

test('should return error if incorrect data is passed', async ({assert}) => {
  const validateData = await blogValidator({
    blog_title: '' /* null */,
    user_id: '1'
  })
  assert.isOk(validateData.error);
})

test('should return only one error if single incorrect data is passed', async ({assert}) => {
    const validatedData = await blogValidator({
        blog_title: '' /* null */,
        user_id: '1'
    })
    assert.equal(validatedData.error.length, 1)
  })
  
test('should return undefined when pass correct data', async ({assert}) => {
    const validatedData = await blogValidator({
        blog_title: 'I love thailand so bad',
        user_id: '1'
    })
    assert.equal(validatedData.error, undefined)
  })

test('should return object when pass correct data ', async ({assert}) => {
    const validatedData = await blogValidator({
        blog_title: 'I love thailand so bad' ,
        user_id: '1'
    })
    assert.isObject(validatedData);
})

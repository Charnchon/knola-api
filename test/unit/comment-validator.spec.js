'use strict'

const {test} = use('Test/Suite')('Example')
const commentValidator = require('../../service/CommentValidator')

test('should return error if incorrect data is passed', async ({assert}) => {
  const validatedData = await commentValidator({
    comment_content: '' /* null */
  })
  assert.isOk(validatedData.error);
})

test('should return only one error if single incorrect data is passed', async ({assert}) => {
    const validatedData = await commentValidator({
        comment_content: ''/* null */,
    })
    assert.equal(validatedData.error.length, 1)
  })
  
test('should return undefined when pass correct data', async ({assert}) => {
    const validatedData = await commentValidator({
        comment_content: 'I like this post',
        user_id: '1',
        blog_id: '1'
    })
    assert.equal(validatedData.error, undefined)
  })

test('should return object when pass correct data ', async ({assert}) => {
  const validatedData = await commentValidator({
    comment_content: 'I like this post',
    user_id: '1',
    blog_id: '1'
  })
  assert.isObject(validatedData);
})
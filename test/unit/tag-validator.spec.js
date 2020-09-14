'use strict'

const {test} = use('Test/Suite')('Tag Validator')
const tagValidator = require('../../service/TagValidator')

test('should return error when it is tag_name is null', async ({assert}) => {
  const validatedData = await tagValidator({
    tag_name: ''/* null */
  })
  assert.isNotNull( validatedData.tag_name,"it is not null")
})

test('should return only one error if single incorrect data is passed', async ({assert}) => {
  const validatedData = await tagValidator({
    tag_name: ''/* null */
  })
  assert.equal(validatedData.error.length, 1)
})

test('should return undefined when pass correct data', async ({assert}) => {
  const validatedData = await tagValidator({
    tag_name: 'Sci'
  })
  assert.equal(validatedData.error, undefined)
})

test('should return object when pass correct data ', async ({assert}) => {
  const validatedData = await tagValidator({
    tag_name: 'Sci'
  })
  assert.isObject(validatedData);
})

const TagUtil = require("../../util/tagUtil")
const Tag = use('App/Models/Tag')
const { test, trait } = use("Test/Suite")("Tag Util")
trait("Test/ApiClient")

test("should get more than one when get multiple tags", async ({ assert }) => {
    const tagUtil = new TagUtil(Tag)
    const tags = await tagUtil.getAll()
    assert.isAbove(tags.rows.length, 1)
})

test("should return object of requested created index from TagUtil.", async ({assert}) => {
    const tag =  new TagUtil(Tag)
    const {tag_id} = await tag.getById(2)
    assert.isOk(tag)
})
  
test("should return structured data with no references via post method", async ({client,}) => {
    const tag = {
        tag_name: "Math"
    }
    const response = await client.post('http://127.0.0.1:4000/api/v1/tags').send(tag).end()
    response.assertStatus(200)
    response.assertJSONSubset({error: undefined,})
    await Tag.find(response.body.data.tag_id).then((response) =>response.delete())
})

test("should return structured data with no references via put method", async ({client,}) => {
    const tag1 = {
        tag_name: "Math01"
    }
    const response1 = await client.post('http://127.0.0.1:4000/api/v1/tags').send(tag1).end()
    const tag2 = {
        tag_name: "Math02"
    }
    const response2 = await client.put(`http://127.0.0.1:4000/api/v1/tags/${response1.body.data.tag_id}`)
        .send(tag2).end()
    response2.assertStatus(200)
    response2.assertJSONSubset({error: undefined,})
    await Tag.find(response2.body.data.tag_id).then((response) =>response.delete())
})

test("should return structured data with no references via delete method", async ({client,assert}) => {
    const tag1 = {
        tag_name: "Math01"
    }
    const response1 = await client.post('http://127.0.0.1:4000/api/v1/tags').send(tag1).end()
    const tagId = await response1.body.data.tag_id
    const tag2 =  new TagUtil(Tag)
    const {tag_id} = await tag2.getById(tagId)
    const response2 = await client.delete(`http://127.0.0.1:4000/api/v1/tags/${response1.body.data.tag_id}`)
        .end()
    response2.assertStatus(200)
    response2.assertJSONSubset({error: undefined})
    assert.isNotOk(response2.body.data.tag_id)
})
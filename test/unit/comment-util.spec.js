const CommentUtil = require("../../util/commentUtil")
const Comment = use('App/Models/Comment')
const { test, trait } = use("Test/Suite")("Comment Util")
trait("Test/ApiClient")

test("should get more than one when get multiple comments", async ({ assert }) => {
    const commentUtil = new CommentUtil(Comment)
    const comments = await commentUtil.getAll()
    assert.isAbove(comments.rows.length, 1)
})

test("should return object of requested created index from CommentUtil.", async ({assert}) => {
    const comment =  new CommentUtil(Comment)
    const {comment_id} = await comment.getById(2)
    assert.isOk(comment)
})
  
test("should return structured data with no references via post method", async ({client,}) => {
    const comment = {
        comment_content: "01 I loveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee it",
        blog_id: "1"
    }
    const response = await client.post('http://127.0.0.1:4000/api/v1/comments').send(comment).end()
    response.assertStatus(200)
    response.assertJSONSubset({error: undefined,})
    await Comment.find(response.body.data.comment_id).then((response) =>response.delete())
})

test("should return structured data with no references via put method", async ({client,}) => {
    const comment1 = {
        comment_content: "02 I loveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee it",
        blog_id: "1"
    }
    const response1 = await client.post('http://127.0.0.1:4000/api/v1/comments').send(comment1).end()
    const comment2 = {
        comment_content: "02 Fix I loveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee it",
        blog_id: "1"
    }
    const response2 = await client.put(`http://127.0.0.1:4000/api/v1/comments/${response1.body.data.comment_id}`)
        .send(comment2).end()
    response2.assertStatus(200)
    response2.assertJSONSubset({error: undefined,})
    await Comment.find(response2.body.data.comment_id).then((response) =>response.delete())
})

test("should return structured data with no references via delete method", async ({client,assert}) => {
    const comment1 = {
        comment_content: "03 I loveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee it",
        blog_id: "1"
    }
    const response1 = await client.post('http://127.0.0.1:4000/api/v1/comments').send(comment1).end()
    const commentId = await response1.body.data.comment_id
    const comment2 =  new CommentUtil(Comment)
    const {comment_id} = await comment2.getById(commentId)
    const response2 = await client.delete(`http://127.0.0.1:4000/api/v1/comments/${response1.body.data.comment_id}`)
        .end()
    response2.assertStatus(200)
    response2.assertJSONSubset({error: undefined})
    assert.isNotOk(response2.body.data.comment_id)
})

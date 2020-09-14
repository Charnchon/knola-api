const BlogUtil = require("../../util/blogUtil")
const Blog = use('App/Models/Blog')
const { test, trait } = use("Test/Suite")("Blog Util")
trait("Test/ApiClient")

test("should get more than one when get multiple blogs", async ({ assert }) => {
    const blogUtil = new BlogUtil(Blog)
    const blogs = await blogUtil.getAll()
    assert.isAbove(blogs.rows.length, 1)
})

test("should return object of requested created index from BlogUtil.", async ({assert}) => {
    const blog =  new BlogUtil(Blog)
    const {blog_id} = await blog.getById(2)
    assert.isOk(blog)
})
  
test("should return structured data with no references via post method", async ({client,}) => {
    const blog = {
        blog_title: "01 Why do I love coding so badddddddddddddd",
        blog_content: "I loveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee it",
        user_id: "1"
    }
    const response = await client.post('http://127.0.0.1:4000/api/v1/blogs').send(blog).end()
    response.assertStatus(200)
    response.assertJSONSubset({error: undefined,})
    await Blog.find(response.body.data.blog_id).then((response) =>response.delete())
})

test("should return structured data with no references via put method", async ({client,}) => {
    const blog1 = {
        blog_title: "02 Why do I love coding so badddddddddddddd",
        blog_content: "I loveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee it",
        user_id: "1"
    }
    const response1 = await client.post('http://127.0.0.1:4000/api/v1/blogs').send(blog1).end()
    const blog2 = {
        blog_title: "02 Fix Why do not I love coding so badddddddddddddd",
        blog_content: "I dont loveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee it",
        user_id: "1"
    }
    const response2 = await client.put(`http://127.0.0.1:4000/api/v1/blogs/${response1.body.data.blog_id}`)
        .send(blog2).end()
    response2.assertStatus(200)
    response2.assertJSONSubset({error: undefined,})
    await Blog.find(response2.body.data.blog_id).then((response) =>response.delete())
})

test("should return structured data with no references via delete method", async ({client,assert}) => {
    const blog1 = {
        blog_title: "03 Why do I love coding so badddddddddddddd",
        blog_content: "I loveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee it",
        user_id: "1"
    }
    const response1 = await client.post('http://127.0.0.1:4000/api/v1/blogs').send(blog1).end()
    const blogId = await response1.body.data.blog_id
    const blog2 =  new BlogUtil(Blog)
    const {blog_id} = await blog2.getById(blogId)
    const response2 = await client.delete(`http://127.0.0.1:4000/api/v1/blogs/${response1.body.data.blog_id}`)
        .end()
    response2.assertStatus(200)
    response2.assertJSONSubset({error: undefined})
    assert.isNotOk(response2.body.data.blog_id)
})

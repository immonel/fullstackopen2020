const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const { 
    manyBlogs, 
    oneBlog, 
    blogWithNoLikes, 
    blogWithNoTitleAndUrl 
} = require('./blogLists')
const { rootUser } = require('./users')

const api = supertest(app)
let token, userId

beforeAll(async () => {
    await User.deleteMany({})
    const pwdHash = await bcrypt.hash(rootUser.password, 10)
    const user = new User({ username: rootUser.username, name: rootUser.name, pwdHash })
    userId = (await user.save())._id

    const response = await api
        .post('/api/login')
        .send({username: rootUser.username, password: rootUser.password})
        
    token = 'bearer '.concat(response.body.token)
})

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(manyBlogs.map(blog => ({...blog, user: userId})))
})

describe('GET: /api/blogs', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(manyBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')
        const titles = response.body.map(r => r.title)
      
        expect(titles).toContain(
          'Canonical string reduction'
        )
    })

    test('a blog should have a defined field named "id"', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })
})

describe('POST: /api/blogs', () => {

    test('number of blogs should grow by one when a new blog is added', async () => {
        await api
            .post('/api/blogs')
            .set('Authorization', token)
            .send(oneBlog[0])

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(manyBlogs.length + 1)
    })

    test('blog addition should be rejected without a token', async () => {
        await api
            .post('/api/blogs')
            .send(oneBlog[0])
            .expect(401)
    })

    test('the added blog should have the right contents', async () => {
        await api
            .post('/api/blogs')
            .set('Authorization', token)
            .send(oneBlog[0])

        const blogs = (await api.get('/api/blogs')).body
        const lastBlog = _(blogs[blogs.length - 1]).omit('id').omit('user').value()

        expect(lastBlog).toEqual(oneBlog[0])
    })

    test('likes of a blog with no likes set should be zero', async () => {
        const response = await api
            .post('/api/blogs')
            .set('Authorization', token)
            .send(blogWithNoLikes[0])

        expect(response.body.likes).toBe(0)
    })

    test('blog with no title should be rejected with 400', async () => {
        const blogWithNoTitle = {...blogWithNoTitleAndUrl, title: "sas"}

        await api
            .post('/api/blogs')
            .set('Authorization', token)
            .send(blogWithNoTitle)
            .expect(400)
    })

    test('blog with no url should be rejected with 400', async () => {
        const blogWithNoUrl = {...blogWithNoTitleAndUrl, url: "sas"}

        await api
            .post('/api/blogs')
            .set('Authorization', token)
            .send(blogWithNoUrl)
            .expect(400)
    })
})

describe('DELETE: /api/blogs/:id', () => {

    test('amount of blogs should be reduced by one when one is deleted', async () => {
        const blogId = (await api.get('/api/blogs')).body[0].id
        await api
            .delete(`/api/blogs/${blogId}`)
            .set('Authorization', token)
        const blogs = (await api.get('/api/blogs')).body

        expect(blogs).toHaveLength(manyBlogs.length - 1)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
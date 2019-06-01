const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const _ = require('lodash')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')

    await helper.initialBlogs.forEach(async (blog) => {
        let blogObject = new Blog(blog)
        await blogObject.save()
        console.log('saved')
    })
    console.log('done')
})

const basicCountTest = async (expectedCount) =>
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect(res => res.body.length === expectedCount)


test('all blogs are returned as json ', async () => {
    await basicCountTest(6)
})
// TÄMÄ EI VIELÄ TOIMI,KORJAA
test('all blogs contain id ', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .expect(res =>  res.body.map(i => 'id' in i).reduce((c, i) =>  c && i, true), true)
})

test('adding a blog increases blogcount', async () => {
    await basicCountTest(6)
    await api
        .post('/api/blogs')
        .send(helper.additionalBlog)
        .set('Accept','application/json')
        .expect(201)
    await basicCountTest(7)
})

test('likes default to 0', async () => {
    let additionalBlog = _.clone(helper.additionalBlog)
    let assume = _.clone(helper.additionalBlog)
    assume.likes = 0
    assume.id = assume._id
    delete assume['_id']
    delete assume['__v']
    delete additionalBlog['likes']
    await api
        .post('/api/blogs')
        .send(additionalBlog)
        .set('Accept','application/json')
        .expect(201)
    await api
        .get(`/api/blogs/${additionalBlog._id}`)
        .expect(200,assume)
        .expect('Content-Type', /application\/json/)
})

test('uanble to add blog without title and url', async () => {
    let additionalBlog = _.clone(helper.additionalBlog)
    delete additionalBlog['title']
    delete additionalBlog['url']
    await api
        .post('/api/blogs')
        .send(additionalBlog)
        .set('Accept','application/json')
        .expect(400)
})



afterAll(() => {
    mongoose.connection.close()
})
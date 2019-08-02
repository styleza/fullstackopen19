const listHelper = require('../utils/list_helper')
const blogs = require('./test_helper').initialBlogs

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has multiple blogs equals the sum of those', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})

describe('favourite post', () => {
    test('when no blog post, get no result', () => {
        const result = listHelper.favouriteBlog([])
        expect(result).toBe(false)
    })

    test('when multiple post pick the correct favourite', () => {
        const result = listHelper.favouriteBlog(blogs)
        expect(result).toEqual(blogs[2])
    })
})

describe('most blogs', () => {
    test('when multiple posts pick the most active author and N of blog posts', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({
            "author": "Robert C. Martin",
            "blogs": 3
        })
    })
})


describe('most likes', () => {
    test('when multiple posts pick the most liked author and N of likes ', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        })
    })
})
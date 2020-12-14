const listHelper = require('../utils/list_helper')
const { manyBlogs, oneBlog, noBlogs } = require('./blogLists')


test('dummy returns one', () => {
  expect(listHelper.dummy(manyBlogs)).toBe(1)
})

describe('total likes', () => {
  
    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(oneBlog)
      expect(result).toBe(5)
    })

    test('likes should be counted correctly with a list of blogs', () => {
        const result = listHelper.totalLikes(manyBlogs)
        expect(result).toBe(36)
    })

    test('empty array should return zero likes', () => {
        const result = listHelper.totalLikes(noBlogs)
        expect(result).toBe(0)
    })
})

describe('favorite blog', () => {
    
    test('from test array favorite blog should be 5a422b3a1b54a676234d17f9', () => {
        const result = listHelper.favoriteBlog(manyBlogs)
        expect(result).toEqual(manyBlogs[2])
    })

    test('from one blog array favorite should be 5a422aa71b54a676234d17f8', () => {
        const result = listHelper.favoriteBlog(oneBlog)
        expect(result).toEqual(oneBlog[0])
    })

    test('from empty array undefined should be returned', () => {
        const result = listHelper.favoriteBlog(noBlogs)
        expect(result).toEqual(undefined)
    })
})

describe('most blogs author', () => {
    
    test('from test array author with most blogs should be "Robert C. Martin"', () => {
        const result = listHelper.mostBlogs(manyBlogs)
        expect(result).toEqual({
            author: 'Robert C. Martin',
            blogs: 3
        })
    })

    test('from one blog array author with most blogs should be "Edsger W. Dijkstra"', () => {
        const result = listHelper.mostBlogs(oneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1
        })
    })

    test('from empty array undefined should be returned', () => {
        const result = listHelper.mostBlogs(noBlogs)
        expect(result).toEqual(undefined)
    })
})

describe('most likes author', () => {
    
    test('from test array author with most likes should be Edsger W. Dijkstra', () => {
        const result = listHelper.mostLikes(manyBlogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17
        })
    })

    test('from one blog array author with most likes should be Edsger W. Dijkstra', () => {
        const result = listHelper.mostLikes(oneBlog)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 5
        })
    })

    test('from empty array undefined should be returned', () => {
        const result = listHelper.mostLikes(noBlogs)
        expect(result).toEqual(undefined)
    })
})
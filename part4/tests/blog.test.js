const { test, describe } = require('node:test')
const assert = require('node:assert')
//const listHelper = require('../utils/list_helper')
const totalLikes = require('../utils/list_helper').totalLikes
const { blogs, listWithOneBlog } = require('./test-helpers');

describe('total likes', () => {
    test('of empty list is', () => {
        assert.strictEqual(totalLikes([]), 0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('of a bigger list is calculated right', () => {
        assert.strictEqual(totalLikes(blogs), 36)
    })



})

const favoriteBlog = require('../utils/list_helper').favoriteBlog
const bestLikedBlog = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    }
describe('best liked blog', () => {

    test('is as expected', () => {
        assert.deepStrictEqual(favoriteBlog(blogs), bestLikedBlog)
    })

})



const mostBlogs = require('../utils/list_helper').mostBlogs
const mostBlogsAuthor = {
    author: "Robert C. Martin",
    blogs: 3
}
describe('most blogs by author', () => {

    test('is as expected', () => {
        assert.deepStrictEqual(mostBlogs(blogs), mostBlogsAuthor)
    })

})


const mostLikes = require('../utils/list_helper').mostLikes
const mostLikesAuthor = {
    author: "Edsger W. Dijkstra",
    likes: 17
}
describe('most liked author', () => {

    test('is as expected', () => {
        assert.deepStrictEqual(mostLikes(blogs), mostLikesAuthor)
    })

})
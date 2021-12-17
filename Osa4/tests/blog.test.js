const listHelper = require('../utils/list_helper')

const blog1 = {
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  __v: 0
}

const blog2 = {
  _id: '5a422aa71b54a676134c16g9',
  title: 'Canoncial string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Canoncial_String_Reduction.html',
  likes: 11,
  __v: 0
}

const blog3 = {
  _id: '5a422aa71b54a676234d1asd',
  title: 'Blaablaa',
  author: 'Author 2',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Blaablaa.html',
  likes: 3,
  __v: 0
}

const blog4 = {
  _id: '5a422aa71b54a676234d1asdasd',
  title: 'Blaablaa 2',
  author: 'Author 3',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Blaablaa2.html',
  likes: 6,
  __v: 0
}

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('Total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const blogs = []
    blogs.push(blog1)

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = []
    blogs.push(blog1)
    blogs.push(blog2)
    blogs.push(blog3)

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(19)
  })
})

describe('Blog with the most likes', () => {
  test('of empty list returns empty object', () => {
    const blogs = []

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({})
  })

  test('when list has only one blog matches its likes', () => {
    const blogs = []
    blogs.push(blog1)

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blog1)
  })

  test('of a bigger list will return the blog with the most likes', () => {
    const blogs = []
    blogs.push(blog1)
    blogs.push(blog2)
    blogs.push(blog3)

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blog2)
  })
})

describe('Author with the most blogs', () => {
  test('of empty list returns empty object', () => {
    const blogs = []

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({})
  })

  test('when list has only one blog matches its author', () => {
    const blogs = []
    blogs.push(blog1)

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  test('of a bigger list will return the author and amount his/hers blogs with the most blogs', () => {
    const blogs = []
    blogs.push(blog1)
    blogs.push(blog2)
    blogs.push(blog3)
    blogs.push(blog4)

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 2 })
  })
})

describe('Author with the most likes', () => {
  test('of empty list returns empty object', () => {
    const blogs = []

    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({})
  })

  test('when list has only one blog matches its likes', () => {
    const blogs = []
    blogs.push(blog1)

    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 })
  })

  test('of a bigger list will return the author and the sum of his/hers likes', () => {
    const blogs = []
    blogs.push(blog1)
    blogs.push(blog2)
    blogs.push(blog3)
    blogs.push(blog4)

    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 16 })
  })
})

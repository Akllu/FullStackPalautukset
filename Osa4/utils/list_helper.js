const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) return 0

  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {}

  const mostLikes = Math.max(...blogs.map(b => b.likes))
  return blogs.find(b => b.likes === mostLikes)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {}

  const blogAuthors = blogs.reduce((acc, blog) => {
    const blogIndex = acc.findIndex(b => b.author === blog.author)
    if (blogIndex > -1) {
      acc[blogIndex].blogs++
    } else {
      acc.push({ author: blog.author, blogs: 1 })
    }
    return acc
  }, [])

  const blogsOfAuthor = Math.max(...blogAuthors.map(a => a.blogs))
  const auth = blogAuthors.find(a => a.blogs === blogsOfAuthor)

  return { author: auth.author, blogs: blogsOfAuthor }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}

  const blogAuthors = blogs.reduce((acc, blog) => {
    const blogIndex = acc.findIndex(b => b.author === blog.author)
    if (blogIndex > -1) {
      acc[blogIndex].likes += blog.likes
    } else {
      acc.push({ author: blog.author, likes: blog.likes })
    }
    return acc
  }, [])

  const likesOfAuthor = Math.max(...blogAuthors.map(a => a.likes))
  const auth = blogAuthors.find(a => a.likes === likesOfAuthor)

  return { author: auth.author, likes: auth.likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
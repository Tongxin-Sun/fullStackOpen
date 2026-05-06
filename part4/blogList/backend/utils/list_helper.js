const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  // This function receives a list of blogs and returns the blog with the most likes.
  // If there are multiple favorites, the function will return any one of them.
  if (blogs.length === 0) {
    return {}
  }
  let maxLikes = 0
  for (let blog of blogs) {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes
    }
  }

  return blogs.find(blog => blog.likes === maxLikes)
}

module.exports = {
  totalLikes,
  favoriteBlog,
}
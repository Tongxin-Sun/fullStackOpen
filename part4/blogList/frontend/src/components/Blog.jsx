import { useState } from "react"

const Blog = ({ blog, user, update, remove }) => {
  const [showAll, setShowAll] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const hide = { display: showAll ? '' : 'none' }
  const label = showAll ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateLike = async blog => {
    const userId = JSON.parse(window.localStorage.getItem('loggedBloglistUser')).id
    await update({
      user: userId,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }, blog.id)
    setLikes(likes + 1)
  }

  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={() => setShowAll(!showAll)}>{label}</button>
      <div style={hide}>
        <div>{blog.url}</div>
        <div>likes {likes} <button onClick={() => updateLike(blog)}>like</button></div>
        <div>{blog.author}</div>
        {user.id === blog.user.id && <button onClick={() => remove(blog)}>remove</button>}
      </div>
    </div>
  )
}

export default Blog
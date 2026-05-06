import { useState } from "react"

const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false)
  const hide = { display: showAll ? '' : 'none' }
  const label = showAll ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={() => setShowAll(!showAll)}>{label}</button>
      <div style={hide}>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button>like</button></div>
        <div>{blog.author}</div>
      </div>
    </div>
  )
}

export default Blog
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Toggable from './components/Toggable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async blogObject => {

    try {
      blogFormRef.current.toggleVisibility()
      const addedBlog = await blogService.create(blogObject)
      setMessage(`a new blog ${addedBlog.title} by ${addedBlog.author} added`)
      setBlogs(blogs.concat(addedBlog))
      setTimeout(() => { setMessage(null) }, 5000)
    } catch (error) {
      if (error.status === 401) {
        setErrorMessage('Login expired. Please login again.')
      } else {
        setErrorMessage(`error: ${error.message}`)
      }
      window.localStorage.removeItem('loggedBloglistUser')
      blogService.setToken(null)
      setUser(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const update = async (updatedBlog, blogId) => {
    await blogService.update(updatedBlog, blogId)
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const loginForm = () =>
  (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)} />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type='text'
            value={password}
            onChange={({ target }) => setPassword(target.value)} />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogFormRef = useRef()

  const blogForm = () => (
    <Toggable buttonLabel={"create new blog"} ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Toggable>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} type='error' />
      <Notification message={message} type='normal' />
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
        </div>
      )}


      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} update={update} />
      )}
    </div>
  )
}

export default App
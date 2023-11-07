import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggable from './components/Toggable'
import CreateBlogForm from './components/createBlogForm'

const Notification = ({ notification }) => {
  let messageColor = notification.isSuccess === true ? 'green' : 'red'
  const notificationStyle = {
    color: messageColor,
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderradius: '5px',
    padding: '20px',
    marginbottom: '20px'
  }
  if (notification.message === null) {
    return null
  } else {
    return (
      <div style={notificationStyle}>
        {notification.message}
      </div>
    )
  }
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState({ message: null, isSuccess: null })

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }

  }, [])

  const setTempNotification = ({ message, isSuccess }) => {
    setNotification({ message, isSuccess })
    setTimeout(() => {
      setNotification({ message: null, isSuccess: null })
    }, 5000)
  }

  const blogSection = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.getAll().then(blogs => setBlogs(blogs))
      setTempNotification({ message: "Login successful", isSuccess: true })
    } catch (exception) {
      console.log(exception)
      setTempNotification({ message: "Wrong username or password", isSuccess: false })
    }
  }

  const handleLogout = async () => {
    try {
      window.localStorage.clear()
      blogService.setToken(user.token)
      setUser(null)
      setBlogs([])
      setTempNotification({ message: "Logout successful", isSuccess: true })
    }
    catch (exception) {
      console.log(exception)
      setTempNotification({ message: "Logout unsuccessful", isSuccess: false })
    }
  }

  const handleCreateBlog = async (blog) => {
    try {
      createBlogFormRef.current.toggleVisibility()
      const newblog = await blogService.create(blog)
      newblog.user = user
      setBlogs(blogs.concat(newblog))
      setTempNotification({
        message: `a new blog ${newblog.title} by ${newblog.author} added`,
        isSuccess: true
      })
    }
    catch (exception) {
      console.log(exception)
      setTempNotification({ message: "add new blog unsuccessful", isSuccess: false })
    }
  }

  const loginForm = () => (
    <div>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const createBlogFormRef = useRef()
  const createBlogForm = () => (
    <Toggable buttonLabel="create new" ref={createBlogFormRef}>
      <CreateBlogForm handleCreateBlog={handleCreateBlog} />
    </Toggable>
  )

  return (
    <div>
      {!user &&
        <div>
          <h2>Log in to application</h2>
          <Notification notification={notification} />
          {loginForm()}
        </div>
      }
      {user &&
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          {createBlogForm()}
          {blogSection()}
        </div>
      }
    </div>
  )
}

export default App
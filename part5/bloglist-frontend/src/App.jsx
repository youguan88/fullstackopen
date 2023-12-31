import { useState, useEffect, useRef } from 'react'
import { Blog } from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
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
      <div style={notificationStyle} id='notification'>
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
      {blogs
        .sort((a,b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleLikes={() => updateLikes(blog)}
            handleDelete={() => deleteBlog(blog)}/>
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
      setTempNotification({ message: 'Login successful', isSuccess: true })
    } catch (exception) {
      console.log(exception)
      setTempNotification({ message: 'Wrong username or password', isSuccess: false })
    }
  }

  const handleLogout = async () => {
    try {
      window.localStorage.clear()
      blogService.setToken(user.token)
      setUser(null)
      setBlogs([])
      setTempNotification({ message: 'Logout successful', isSuccess: true })
    }
    catch (exception) {
      console.log(exception)
      setTempNotification({ message: 'Logout unsuccessful', isSuccess: false })
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
      setTempNotification({ message: 'add new blog unsuccessful', isSuccess: false })
    }
  }

  const updateLikes = async (blog) => {
    try
    {
      const updatedblog = { ...blog, likes : blog.likes + 1, user: blog.user.id }
      await blogService.update(blog.id, updatedblog)
      setBlogs(blogs.map(x => x.id === blog.id ? { ...x, likes: x.likes + 1 } : x))
    }
    catch(exception)
    {
      console.log(exception)
    }
  }

  const deleteBlog = async (blog) => {
    try
    {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
        await blogService.deleteBlog(blog.id)
        setBlogs(blogs.filter(x => x.id !== blog.id))
      }
    }
    catch(exception)
    {
      console.log(exception)
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
            id="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )

  const createBlogFormRef = useRef()
  const createBlogForm = () => (
    <Togglable buttonLabel="create new" ref={createBlogFormRef}>
      <CreateBlogForm handleCreateBlog={handleCreateBlog} />
    </Togglable>
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
import { useState, useEffect, useRef } from 'react'
import { Blog, BlogDetail } from './components/Blog'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/createBlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { setNewNotification, resetNotification } from './reducers/notificationReducer'
import { setNotificationStatus } from './reducers/notificationSuccessReducer'
import { initializeBlogs, createBlog, updateBlog, removeBlog } from './reducers/blogReducer'
import { initializeLogin, initializeLogout, loginAction } from './reducers/loginReducer'
import User, { UserDetail } from './components/User'
import { initializeUsers } from './reducers/userReducer'
import { Routes, Route, Link, useMatch } from 'react-router-dom'
import './style/style.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/Container';

const Notification = () => {
  let message = useSelector(state => { return state.notification })
  let messageColor = useSelector(state => { return state.notificationSuccess }) === true ? 'green' : 'red'
  const notificationStyle = {
    color: messageColor,
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderradius: '5px',
    padding: '20px',
    marginbottom: '20px'
  }
  if (message === null) {
    return null
  } else {
    return (
      <div style={notificationStyle} id="notification">
        {message}
      </div>
    )
  }
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      dispatch(initializeLogin(user))
      dispatch(initializeBlogs())
      dispatch(initializeUsers())
    }
  }, [dispatch])

  const user = useSelector(state => state.loginInfo)
  const bloglist = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)

  const userMatch = useMatch('/users/:id')
  const userMatched = userMatch
    ? users.find(user => user.id === userMatch.params.id) : null

  const blogMatch = useMatch('/blogs/:id')
  const blogMatched = blogMatch
    ? bloglist.find(blog => blog.id === blogMatch.params.id) : null

  const setTempNotification = ({ message, isSuccess }) => {
    dispatch(setNewNotification(message))
    dispatch(setNotificationStatus(isSuccess))
    setTimeout(() => {
      dispatch(resetNotification())
      dispatch(setNotificationStatus(null))
    }, 5000)
  }

  const blogSection = () => {
    return (
      <div>
        {[...bloglist]
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
            />
          ))}
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(loginAction(username, password))
      setUsername('')
      setPassword('')
      setTempNotification({
        message: 'Login successful',
        isSuccess: true
      })
    } catch (exception) {
      console.log(exception)
      setTempNotification({
        message: 'Wrong username or password',
        isSuccess: false
      })
    }
  }

  const handleLogout = async () => {
    try {
      dispatch(initializeLogout())
      setTempNotification({
        message: 'Logout successful',
        isSuccess: true
      })
    } catch (exception) {
      console.log(exception)
      setTempNotification({
        message: 'Logout unsuccessful',
        isSuccess: false
      })
    }
  }

  const handleCreateBlog = async (blog) => {
    try {
      createBlogFormRef.current.toggleVisibility()
      dispatch(createBlog(blog, user))
      setTempNotification({
        message: `a new blog ${blog.title} by ${blog.author} added`,
        isSuccess: true
      })
    } catch (exception) {
      console.log(exception)
      setTempNotification({
        message: 'add new blog unsuccessful',
        isSuccess: false
      })
    }
  }

  const updateLikes = async (blog) => {
    try {
      dispatch(updateBlog(blog))
    } catch (exception) {
      console.log(exception)
    }
  }

  const deleteBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        dispatch(removeBlog(blog))
      }
    } catch (exception) {
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
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    </div>
  )

  const createBlogFormRef = useRef()
  const createBlogForm = () => (
    <Togglable buttonLabel="create new" ref={createBlogFormRef}>
      <CreateBlogForm handleCreateBlog={handleCreateBlog} />
    </Togglable>
  )

  const padding = { paddingRight: '5px' }
  const backgroundColor = { background: 'pink' }

  return (
    <div className='body'>
      {!user && (
        <div>
          <h2>Log in to application</h2>
          <Notification />
          {loginForm()}
        </div>
      )}
      {user && (
        <div>
          <Navbar style={backgroundColor}>
            <Container>
              <Nav className="me-auto">
                <Nav.Link style={padding} href="/">Blogs</Nav.Link>
                <Nav.Link style={padding} href="/users">Users</Nav.Link>
              </Nav>
              <Nav>
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                    {user.name} logged in
                  </Navbar.Text>
                  <Button size="sm" variant='secondary' onClick={handleLogout}>logout</Button>
                </Navbar.Collapse>
              </Nav>
            </Container>
          </Navbar>
          <h2>blog app</h2>
          <Notification />
          <Routes>
            <Route path="/users" element={<User />} />
            <Route path="/users/:id" element={<UserDetail user={userMatched} />} />
            <Route path="/blogs/:id" element={<BlogDetail
              blog={blogMatched}
              user={user}
              handleLikes={updateLikes}
              handleDelete={deleteBlog} />} />
            <Route path="/" element={
              <>
                {createBlogForm()}
                {blogSection()}
              </>} />
          </Routes>
        </div>
      )}

    </div>

  )
}

export default App

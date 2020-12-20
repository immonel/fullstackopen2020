import React, { useState, useEffect, createContext } from 'react'
import Blogs from './Blogs'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import { Notification } from './components/Notifications'

/* eslint-disable no-unused-vars */
export const NotificationContext = createContext({
  notify: (type, message) => {}
})

export const BlogsContext = createContext({
  blogs: [],
  setBlogs: (blogs) => {}
})

export const UserContext = createContext({
  user: {},
  setUser: (user) => {}
})
/* eslint-enable no-unused-vars */

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  const [ user, setUser ] = useState(null)
  const [ message, setMessage ] = useState('')
  const [ messageType, setMessageType ] = useState('info')

  const notify = (type, message) => {
    setMessage(message)
    setMessageType(type)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  useEffect(() => {
    let savedUser = window.localStorage.getItem('loggedInUser')
    if (savedUser) {
      savedUser = JSON.parse(savedUser)
      setUser(savedUser)
      blogService.setToken(savedUser.token)
    }
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  return (
    <NotificationContext.Provider value={{ notify }}>
      <BlogsContext.Provider value={{ blogs, setBlogs }}>
        <UserContext.Provider value={{ user, setUser }}>
          <div className='App'>
            <Notification type={messageType} message={message} />
            {user !== null ? <Blogs blogs={blogs} /> : <LoginForm />}
          </div>
        </UserContext.Provider>
      </BlogsContext.Provider>
    </NotificationContext.Provider>
  )
}

export default App
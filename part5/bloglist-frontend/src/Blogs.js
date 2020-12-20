import React, { useContext, useState } from 'react'
import CreateBlog from './components/CreateBlog'
import BlogList from './components/BlogList'
import { UserContext } from './App'

const logout = () => {
  window.localStorage.removeItem('loggedInUser')
  window.location.reload()
}

const Blogs = ({ blogs }) => {
  const [ createFormVisible, setCreateFormVisible ] = useState(false)
  const OpenFormButton = () => <button id='toggle-create-form-button' onClick={() => setCreateFormVisible(true)}>New note</button>

  const context = useContext(UserContext)

  return (
    <div>
      <h2>blogs</h2>
      {context.user.name} logged in
      <button onClick={logout}>Logout</button>

      <BlogList blogs={blogs} />
      {createFormVisible ? <CreateBlog closeForm={() => setCreateFormVisible(false)} /> : <OpenFormButton />}
    </div>
  )
}

export default Blogs

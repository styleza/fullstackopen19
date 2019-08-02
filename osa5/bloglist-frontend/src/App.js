import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import {getAll} from './services/blogs'
import {loginService} from './services/login'
import UserControl from './components/UserControl'
import NewBlog from './components/NewBlog'
import config from './config'


function App() {
    const [ blogs, setBlogs] = useState([])
    const [ user, setUserExt] = useState(null)

    const setUser = async (p) => {
        setUserExt(p)
        localStorage.setItem('user', JSON.stringify(p))
        const blogsData = await getAll(p.token)
        setBlogs(blogsData)
    }

    useEffect(() => {
        if(localStorage.getItem('user')){
            setUser(JSON.parse(localStorage.getItem('user')))
        }
    }, [])

    const logoutAction = () => {
        localStorage.removeItem('user')
        setUserExt(null)
    }

    const newBlogHandle = (blog) => {
        setBlogs([...blogs, blog])
    }

    if (user === null) {
        return (
            <Login loginService={loginService} setUser={setUser} />
        )
    }

    return (
        <div>
          <h2>blogs</h2>
            <UserControl logoutAction={logoutAction} user={user} />
            <NewBlog handle={newBlogHandle} token={user.token} />

            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    )
}

export default App;

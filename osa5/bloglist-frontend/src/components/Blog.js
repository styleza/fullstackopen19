import React from 'react'
const Blog = ( props ) => {
    const {blog} = props
    return(<div>
        {blog.title} {blog.author}
    </div>)
}

export default Blog
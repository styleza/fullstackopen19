import React, { useState } from 'react'
import {post} from '../services/blogs'

const NewBlog = ({ handle, token }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const submitBlog = async(e) => {
        e.preventDefault()
        const res = await post({title, author, url}, token)
        handle(res)
    }

    return (
        <form onSubmit={submitBlog}>
            <h1>Create new </h1>
            <div>Title: <input type="text" value={title} onChange={e => setTitle(e.target.value)}/></div>
            <div>Author: <input type="text" value={author} onChange={e => setAuthor(e.target.value)}/></div>
            <div>Url: <input type="text" value={url} onChange={e => setUrl(e.target.value)}/></div>
            <div><input type="submit" value="Add" /></div>
        </form>
    )
}

export default NewBlog
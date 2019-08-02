import React, { useState } from 'react'


const Login = ({loginService, setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await loginService(username, password)
        console.log(response)
        if(!response) {
            setError("Login failed")
            setUsername('')
            setPassword('')
        } else {
            setUser(response)
        }
    }

    return(
    <form onSubmit={handleSubmit}>
        <h1>Please login</h1>
        {error && (<h2>{error}</h2>)}
        <div><input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} /> </div>
        <div><input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/></div>
        <div><input type="submit" value="Log in" /></div>
    </form>
    )
}

export default Login
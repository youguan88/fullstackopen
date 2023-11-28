import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN } from "../queries"

const LoginForm = ({show, setToken, setPage}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error)
        }
    })

    useEffect(()=>{
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
        }
    }, [result.data])

    if (!show){
        return null
    }

    const handleLogin = (event) => {
        console.log(username)
        console.log(password)
        event.preventDefault()
        login({variables: {username, password}})
        setUsername('')
        setPassword('')
        setPage('authors')
    }
    
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}> 
                <div>username:<input
                    value={username}
                    onChange={({ target }) => { setUsername(target.value) }}
                /></div>
                <div>password: <input
                    value={password}
                    onChange={({ target }) => { setPassword(target.value) }}
                    type="password"
                /></div>
                <div><button type="submit">login</button></div>
            </form>
        </div>
    )
}

export default LoginForm
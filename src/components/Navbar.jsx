
import { useState } from 'react'
import { usePost } from './PostProvider'
import './navbar.css'
export default function Navbar() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { auth, loggedIn, logout } = usePost()


    function validate(e) {
        e.preventDefault()
        auth(username, password)
    }


    return (<nav className="navbar">
        <div className="container-fluid">

            <a className="navbar-brand" href="#">Programming Posts</a>

            {loggedIn ? <button onClick={logout} className='btn custom-button'>LOGOUT</button> :
                <form onSubmit={validate}>
                    <div class="input-group">
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" class="form-control" placeholder="Username" required minLength={5} />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" placeholder="Password" required minLength={5} />
                        <button onSubmit={validate} type='submit' className='btn custom-button'>LOGIN</button>
                    </div>
                    <div className="form-text">Initial login creates an account.</div>
                </form>
            }
        </div>

    </nav>)
}
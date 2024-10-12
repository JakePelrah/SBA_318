
import { useState } from 'react'
import { usePost } from './PostProvider'
import './navbar.css'
export default function Navbar() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [register, setRegister] = useState(false)
    const { auth, loggedIn, logout } = usePost()


    function validate(e) {
        e.preventDefault()
        auth(username, password, register)
        setRegister(false)
    }


    return (<nav className="navbar">
        <div className="container-fluid">

            <a className="navbar-brand" href="#">Programming Posts</a>

            {loggedIn ? <button onClick={logout} className='btn custom-button'>LOGOUT</button> :
                <form onSubmit={validate}>
                    <div class="input-group">
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" class="form-control form-control-sm" placeholder="Username" required minLength={5} />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" class="form-control form-control-sm" placeholder="Password" required minLength={5} />
                        <button onSubmit={validate} type='submit' className='btn custom-button'>LOGIN</button>
                    </div>

                    <div class="form-check">
                        <input value={register} onChange={(e)=>setRegister(e.target.checked)} class="form-check-input" type="checkbox" id="flexCheckDefault" />
                        <label className='text-white' for="flexCheckDefault">
                            Register?
                        </label>
                    </div>
                </form>
            }
        </div>

    </nav>)
}
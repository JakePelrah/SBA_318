import { useState } from "react"

export default function Home() {
    const [showRegister, setShowRegister] = useState(false)

    function onClick(e) {
        e.preventDefault()
        setShowRegister(!showRegister)
    }

    return (<div className="home d-flex flex-column">
        {showRegister ? <div class="my-3">
            <label for="exampleFormControlInput1" class="form-label">Username</label>
            <input type="email" class="form-control mb-1" id="exampleFormControlInput1" placeholder="name@example.com" />
            <label for="exampleFormControlInput1" class="form-label">Password</label>
            <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
        </div> :
            <div class="my-3">
                <label for="exampleFormControlInput1" class="form-label">Username</label>
                <input type="email" class="form-control mb-1" id="exampleFormControlInput1" placeholder="name@example.com" />
                <label for="exampleFormControlInput1" class="form-label">Password</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
        }
        <button onClick={onClick} className="btn custom-button mt-5">{showRegister ? 'Login' : 'Sign Up'}</button>
    </div>)
}
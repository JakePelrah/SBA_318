import { useState } from 'react'
import Modal from './Modal'
import './navbar.css'
export default function Navbar() {
    const[showRegister, setShowRegister] = useState(true)


    return (<nav className="navbar">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Programming Posts</a>

            <div className='d-flex gap-2'>
                <div className="custom-button btn" data-bs-toggle="modal" data-bs-target="#exampleModal" href="#">REGISTER</div>
                <div onClick={(e)=> setShowRegister(false)} className="custom-button btn" data-bs-toggle="modal" data-bs-target="#exampleModal" href="#">LOGIN</div>
            </div>

        </div>
        <Modal showRegister={showRegister} />
    </nav>)
}
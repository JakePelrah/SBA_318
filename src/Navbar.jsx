import './navbar.css'

export default function Navbar() {

    return (<nav className="navbar">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Programming Posts</a>

            <div className='d-flex gap-2'>
                <button className="custom-button btn" href="#">REGISTER</button>
                <button className="custom-button btn" href="#">LOGIN</button>
            </div>

        </div>
    </nav>)
}
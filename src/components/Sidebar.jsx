import { usePost } from './PostProvider'
import { v4 as uuidv4 } from 'uuid'
import './sidebar.css'

export default function Sidebar() {
    const { users, loggedIn } = usePost()

    const renderedUsers = users.map(user => <li key={user.user_id} className="list-group-item">
        <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
        {user.username}
        <div className='uuid'>({user.user_id})</div>
    </li>)




    return (<div className="sidebar">

        <div>
            <div className='sidebar-title ms-3 mt-5'>Users</div>
            <ul className="list-group">
                {renderedUsers}
            </ul>
        </div>

        <div className='d-flex justify-content-center'>
            {loggedIn.id ?
                <div data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn custom-button mt-5">Create Post</div>
                : null}
        </div>
    </div>)
}
import { usePost } from './PostProvider'
import { v4 as uuidv4 } from 'uuid'
import './sidebar.css'

export default function Sidebar() {
    const { users, tags } = usePost()

    console.log(users)
    const renderedUsers = users.map(user => <li key={uuidv4()} className="list-group-item">
        <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
        {user.username}
        <div className='uuid'>({user.userUUID})</div>
    </li>)

    const renderedTags = tags.map(_ => <li key={uuidv4()} className="list-group-item">
        <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
        tags
    </li>)

    

    return (<div className="sidebar">

        <div>
            <div className='sidebar-title ms-3 mt-5'>Users</div>
            <ul className="list-group">
                {renderedUsers}
            </ul>
        </div>

        <div>
            <div className='sidebar-title ms-3 mt-3'>Tags</div>
            <ul className="list-group">
                {renderedTags}
            </ul>
        </div>

        <div className='d-flex justify-content-center'>
            <div data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn custom-button mt-5">Create Post</div>
        </div>
    </div>)
}
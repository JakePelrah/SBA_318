import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePost } from './PostProvider'
import { v4 as uuidv4 } from 'uuid'
import './sidebar.css'

export default function Sidebar() {
    const { users, tags } = usePost()



    const renderedUsers = users.map(_ => <li class="list-group-item">
        <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
        <Link to={`user/${uuidv4()}`}>User Name</Link>
    </li>)

    const renderedTags = tags.map(_ => <li class="list-group-item">
        <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
        <Link to={`user/${uuidv4()}`}>Tag Name</Link>
    </li>)

    return (<div className="sidebar">

        <div>
            <div className='sidebar-title ms-3 mt-5'>Users</div>

            <ul class="list-group">
                {renderedUsers}
            </ul>
        </div>

        <div>
            <div className='sidebar-title ms-3 mt-3'>Tags</div>
            <ul class="list-group">
                {renderedTags}
            </ul>
        </div>

        <div className='d-flex justify-content-center'>
            <Link className="btn custom-button mt-5" to={`create/${uuidv4()}`}>Create Post</Link>
        </div>
    </div>)
}
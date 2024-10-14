import { useState } from 'react'
import { usePost } from './PostProvider'
import './sidebar.css'

export default function Sidebar() {
    const { users, tags, loggedIn, setCurrentTag, setCurrentUser, submitSearch } = usePost()
    const [searchTerm, setSearchTerm] = useState('')

 

    const renderedUsers = users.map(user => <option key={user.user_id} value={user.username}>{user.username}</option>)
    const renderedTags = tags?.map(tag => <option key={tag.tag} value={tag.tag}>{tag.tag}</option>)

    return (<div className="sidebar">

        <div>
            <div className='sidebar-title ms-3 mt-4'>Users</div>
            <select onChange={(e) => setCurrentUser(e.target.value)} class="form-select" size="6" aria-label="size 3 select example">
                <option value={''} selected>All</option>
                {renderedUsers}
            </select>
        </div>

        <div>
            <div className='sidebar-title ms-3 mt-4'>Tags</div>
            <select onChange={(e) => setCurrentTag(e.target.value)} class="form-select" size="6" aria-label="size 3 select example">
                <option value={''} selected>All</option>
                {renderedTags}
            </select>
        </div>

        <form class="d-flex input-group mt-4 p-2" role="search">
            <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} class="form-control" type="search" placeholder="Search" aria-label="Search" />
            <button onClick={(e)=>submitSearch(e, searchTerm)} class="btn custom-button">Search</button>
        </form>

        <div className='d-flex justify-content-center'>
            {loggedIn.id ?
                <div data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn custom-button mt-5">Create Post</div>
                : null}
        </div>
    </div>)
}
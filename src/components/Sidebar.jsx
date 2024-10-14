import { usePost } from './PostProvider'
import './sidebar.css'

export default function Sidebar() {
    const { users, tags, loggedIn, setCurrentTag } = usePost()


    const renderedUsers = users.map(user => <option key={user.user_id} value={user.username}>{user.username}</option>)

    const renderedTags = tags?.map(tag => <option key={tag.tag} value={tag.tag}>{tag.tag}</option>)

    return (<div className="sidebar">

        <div>
            <div className='sidebar-title ms-3 mt-4'>Users</div>
            <select class="form-select" size="6" aria-label="size 3 select example">
                <option value={''} selected>All</option>
                {renderedUsers}
            </select>
        </div>

        <div>
            <div className='sidebar-title ms-3 mt-4'>Tags</div>
            <select onChange={(e)=>setCurrentTag(e.target.value)} class="form-select" size="6" aria-label="size 3 select example">
                <option value={''} selected>All</option>
                {renderedTags}
            </select>
        </div>

        <div className='d-flex justify-content-center'>
            {loggedIn.id ?
                <div data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn custom-button mt-5">Create Post</div>
                : null}
        </div>
    </div>)
}
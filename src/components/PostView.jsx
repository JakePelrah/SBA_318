import { Link, useParams } from "react-router-dom"
import { usePost } from "./PostProvider"
import { useEffect, useState } from "react"
import Comment from "./Comment"
import './post.css'

export default function PostView() {
    const { getPostById, getCommentsByPostId, createComment, loggedIn, comments, currentPost } = usePost()
    const { id } = useParams()
    const [newComment, setNewComment] = useState('')

    useEffect(() => {
        getPostById(id)
        getCommentsByPostId(id)
    }, [])

    function onClick(e) {
        e.preventDefault()
        if (newComment) {
            createComment(newComment)
            setNewComment('')
        }
    }

    const renderComments = comments?.map(comment => <Comment
        username={comment.username}
        text={comment.text}
        timestamp={comment.timestamp}
        userId={comment.user_id}
        commentId={comment.comment_id} />)

    return (<div id='post-view' className="d-flex flex-column  m-5 p-5">

        <Link className="mb-5 link" to='/'>Home</Link>

        <h1 className="post-title text-center">{currentPost?.title}</h1>

        <div className="d-flex flex-column mt-5 justify-content-start">
            <div className="d-flex align-items-center fw-bold" >
                <img className="me-2" src="../../icons/person-square.svg">
                </img>{currentPost?.username}
            </div>
            <div>Published:{new Date(currentPost?.timestamp).toLocaleString()}</div>
        </div>

        <p className="mt-5">{currentPost?.text}</p>

        <div className="d-flex justify-content-center">
            <div className="fw-bold">Comments</div>
        </div>

        <div className="mt-5">{renderComments}</div>

        {loggedIn.id ?
            <form className="d-flex flex-column mt-5 align-items-center">
                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} className="form-control"></textarea>
                <button onClick={onClick} className="btn post-button w-25 mt-2">Post</button>
            </form>
            : null}

    </div>)
}
import { Link, useParams } from "react-router-dom"
import { usePost } from "./PostProvider"
import { useEffect, useState } from "react"
import './post.css'

export default function PostView() {
    const { getPostById, getCommentsByPostId, createComment, loggedIn } = usePost()
    const { id } = useParams()
    const [post, setPost] = useState([])
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    useEffect(() => {
        getPostById(id).then(setPost)
        getCommentsByPostId(id).then(setComments)
    }, [])


    function onClick(e) {
        e.preventDefault()
        if (comment) {
            createComment(comment, id)
            .then(() => getCommentsByPostId(id).then(setComments))
            setComment('')
        }
    }

    const renderComments = comments?.map(comment =>
        <div className="comment d-flex flex-column mb-3">
            <div className="comment-header d-flex justify-content-between">
                <div >{comment.username}</div>
                <div> {comment.dateTime}</div>
            </div>
            <div className="mt-2"> {comment.text}</div>
        </div>)

    return (<div id='post-view' className="d-flex flex-column  m-5 p-5">

        <Link className="mb-5 link" to='/'>Home</Link>

        <h1 className="post-title text-center">{post?.title}</h1>

        <div className="d-flex flex-column mt-5 justify-content-start">
            <div className="d-flex align-items-center fw-bold" >
                <img className="me-2" src="../../icons/person-square.svg">
                </img>{post?.username}
            </div>
            <div>Published:{post?.dateTime}</div>
        </div>

        <p className="mt-5">{post?.text}</p>

        <div className="d-flex justify-content-center">
            <div className="fw-bold">Comments</div>
        </div>

        <div className="mt-5">{renderComments}</div>

        {loggedIn ?
            <form className="d-flex flex-column mt-5 align-items-center">
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} className="form-control"></textarea>
                <button onClick={onClick} className="btn post-button w-25 mt-2">Post</button>
            </form>
            : null}


    </div>)
}
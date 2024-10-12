import { useParams } from "react-router-dom"
import { usePost } from "./PostProvider"
import { useEffect, useState } from "react"
import './post.css'

export default function PostView() {
    const { getPostById } = usePost()
    const { id } = useParams()
    const [post, setPost] = useState(null)

    useEffect(() => {
        getPostById(id).then(setPost)
    }, [])

    return (<div className="d-flex flex-column  m-5">

        <h1 className="post-title text-center">{post?.title}</h1>

        <div className="d-flex flex-column mt-5 justify-content-start">
            <div className="d-flex align-items-center fw-bold" >
                <img className="me-2" src="../../icons/person-square.svg">
                </img>{post?.username}
            </div>
            <div>Published:{post?.dateTime}</div>
        </div>

        <p className="mt-5">{post?.text}</p>

        <div className="d-flex">
            <div className="btn custom-button">Comment</div>
        </div>
    </div>)
}
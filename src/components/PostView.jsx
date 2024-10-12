import { useParams } from "react-router-dom"
import { usePost } from "./PostProvider"
import { useEffect, useState } from "react"
export default function PostView() {
    const { getPostById } = usePost()
    const { id } = useParams()
    const [post, setPost] = useState(null)

    useEffect(() => {
        getPostById(id).then(setPost)
    }, [])

    return (<div className="d-flex flex-column align-items-center m-5">

        <h1>{post?.title}</h1>
        <div>Tags:{post?.tags}</div>

        <div>Published:{post?.dateTime}</div>
        <div className="d-flex align-items-center fw-bold" >
            <img className="me-2" src="../../icons/person-square.svg">
            </img>{post?.username}
        </div>

        <p className="mt-5">{post?.text}</p>

        <div className="d-flex">
            <div className="btn custom-button">Comment</div>
        </div>
    </div>)
}
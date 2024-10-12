import { useEffect, useRef, useState } from "react"
import { usePost } from "./PostProvider"

export default function Comment({ username, text, dateTime, userUUID, commentUUID }) {
    const { loggedIn, patchComment, deleteComment } = usePost()
    const [editing, setEditing] = useState(null)
    const commentDiv = useRef(null)

    useEffect(() => {
        if (editing) {
            commentDiv.current.focus()
        }
    }, [editing])

    function onSave() {
        const newText = commentDiv.current.innerText
        if (newText !== '') {
            patchComment(commentUUID, commentDiv.current.innerText)
            setEditing(false)
        }
        else {
            alert('comment is empty')
            commentDiv.current.focus()
        }
    }

    function remove() {
        deleteComment(commentUUID)
    }

    function renderButton() {
        if (!loggedIn?.id) {
            return null
        }
        else if (loggedIn?.id === userUUID && editing) {

            return <div onClick={onSave} className="btn comment-button">Save</div>
        }
        else if (loggedIn?.id === userUUID && !editing) {

            return <div onClick={() => setEditing(!editing)} className="btn comment-button">Edit</div>
        }
    }

    return (<div className="comment d-flex flex-column mb-3">
        <div className="comment-header d-flex justify-content-between">
            <div >{username}</div>
            <div> {dateTime}</div>
            <div>
                {renderButton()}
                {loggedIn?.id === userUUID ? <div onClick={remove} className="btn delete-button ms-2">DELETE</div> : null}
            </div>
        </div>
        <div ref={commentDiv} className="mt-2" contentEditable={editing}> {text}</div>
    </div>)
}
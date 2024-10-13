import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext()
export const usePost = () => useContext(PostContext)

export default function PostProvider({ children }) {
    const [posts, setPosts] = useState([])
    const [currentPost, setCurrentPost] = useState({})
    const [users, setUsers] = useState([])
    const [comments, setComments] = useState([])
    const [loggedIn, setLoggedIn] = useState({})

    useEffect(() => {
        getPosts()
        getUsers()
        checkLogin()
    }, [])

    function getPosts() {
        fetch('/posts')
            .then(res => res.json())
            .then(setPosts)
    }

    function getUsers() {
        fetch('/users')
            .then(res => res.json())
            .then(setUsers)
    }

    function checkLogin() {
        fetch('/checkLogin')
            .then(res => res.json())
            .then(data=>{console.log(data); return data})
            .then(user => setLoggedIn(user))
    }

    function logout(e) {
        e.preventDefault()
        fetch('/logout', { method: 'POST' })
            .then(res => res.json())
            .then(user => setLoggedIn(user))
    }

    function auth(username, password, register) {
        fetch('/auth', {
            method: 'POST',
            body: JSON.stringify({ username, password, register }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(user => {
                console.log(user)
                if (!user.id) {
                    alert('Are you already registered? Check username and password')
                }
                else {
                    setLoggedIn(user)
                    checkLogin()
                }
            })
    }

    function createPost(title, category, text, tags) {
        fetch('/createPost', {
            method: 'POST',
            body: JSON.stringify({ title, category, text, tags }),
            headers: { 'Content-Type': 'application/json' }
        }).then(() => getPosts())
    }


    function getPostById(id) {
        fetch('/getPostById', {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(setCurrentPost)
    }

    function getCommentsByPostId(id) {
        fetch('/getCommentsByPostId', {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(setComments)
    }

    function createComment(text) {
        const { postId } = currentPost
        fetch('/createComment', {
            method: 'POST',
            body: JSON.stringify({ text, postId }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(() => getCommentsByPostId(postId))
    }


    function patchComment(commentId, text){
        const { postId } = currentPost
        fetch('/patchComment', {
            method: 'PATCH',
            body: JSON.stringify({ text, commentId }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(() => getCommentsByPostId(postId))
    }

    function deleteComment(commentId){
        const { postId } = currentPost
        fetch('/deleteComment', {
            method: 'DELETE',
            body: JSON.stringify({ commentId }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(() => getCommentsByPostId(postId))
    }


    return (
        <PostContext.Provider value={{
            auth, loggedIn, logout,
            posts, users, comments, currentPost,
            createPost, 
            getPostById, getCommentsByPostId,
            createComment, patchComment, deleteComment
        }}>
            {children}
        </PostContext.Provider>
    );
}; 
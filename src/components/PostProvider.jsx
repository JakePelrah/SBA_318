import { createContext, useContext, useEffect, useState } from "react";


const PostContext = createContext()
export const usePost = () => useContext(PostContext)

export default function PostProvider({ children }) {
    const [posts, setPosts] = useState([])
    const [currentPost, setCurrentPost] = useState({})
    const [users, setUsers] = useState([])
    const [tags, setTags] = useState([])
    const [comments, setComments] = useState([])
    const [loggedIn, setLoggedIn] = useState({})
    const [currentTag, setCurrentTag] = useState(null)


    useEffect(() => {
        getPostsByTag(currentTag)

    }, [currentTag])

    useEffect(() => {
        getPosts()
        getUsers()
        getTags()

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

    function getTags() {
        fetch('/tags')
            .then(res => res.json())
            .then(setTags)
    }

    function checkLogin() {
        fetch('/checkLogin')
            .then(res => res.json())
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
                if (!user.id) {
                    alert('Are you already registered? Check username and password')
                }
                else {
                    setLoggedIn(user)
                    getUsers()
                    getPosts()
                    checkLogin()
                }
            })
    }

    function createPost(title, text, tags) {
        fetch('/createPost', {
            method: 'POST',
            body: JSON.stringify({ title, text, tags }),
            headers: { 'Content-Type': 'application/json' }
        }).then(() => {
            getPosts()
            getTags()
        })
    }

    function getPostById(id) {
        fetch('/getPostById', {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(setCurrentPost)
    }

    function getCommentsByPostId(post_id) {
        fetch('/getCommentsByPostId', {
            method: 'POST',
            body: JSON.stringify({ post_id }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(setComments)
    }

    function createComment(text) {
        const { post_id } = currentPost
        fetch('/createComment', {
            method: 'POST',
            body: JSON.stringify({ text, post_id }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(() => getCommentsByPostId(post_id))
    }

    function patchComment(comment_id, text) {
        const { post_id } = currentPost
        fetch('/patchComment', {
            method: 'PATCH',
            body: JSON.stringify({ text, comment_id }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(() => getCommentsByPostId(post_id))
    }

    function deleteComment(comment_id) {
        const { post_id } = currentPost
        fetch('/deleteComment', {
            method: 'DELETE',
            body: JSON.stringify({ comment_id }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(() => getCommentsByPostId(post_id))
    }

    function deletePost(post_id) {
        fetch('/deletePost', {
            method: 'DELETE',
            body: JSON.stringify({ post_id }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then(({ deleted }) => deleted ? window.location.href = '/' : null)
    }

    function getPostsByTag(tag) {
        fetch(`/getPostsByTag/${tag}`)
            .then(res => res.json())
            .then(setPosts)
    }

    return (
        <PostContext.Provider value={{
            auth, loggedIn, logout,
            posts, users, tags, comments, currentPost,
            createPost, deletePost,
            getPostById, getCommentsByPostId,
            createComment, patchComment, deleteComment,
            getPostsByTag, setCurrentTag
        }}>
            {children}
        </PostContext.Provider>
    );
}; 
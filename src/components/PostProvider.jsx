import { createContext, useContext, useEffect, useState } from "react";

const PostContext = createContext()
export const usePost = () => useContext(PostContext)

export default function PostProvider({ children }) {
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [tags, setTags] = useState([...Array(10).keys()])
    const [loggedIn, setLoggedIn] = useState(false)

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
            .then(({ loggedIn }) => setLoggedIn(loggedIn))
    }

    function logout(e) {
        e.preventDefault()
        fetch('/logout', { method: 'POST' })
            .then(res => res.json())
            .then(({ loggedIn }) => setLoggedIn(loggedIn))
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
            .then(({ registered }) => {
                if (!registered) {
                    alert('Are you already registered? Check username and password')
                }
                else {
                    setLoggedIn(true)
                    getUsers()
                    getPosts()
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
        return fetch('/getPostById', {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
    }

    function getCommentsByPostId(id) {
        return fetch('/getCommentsByPostId', {
            method: 'POST',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
    }

    function createComment(text, postUUID) {
       return fetch('/createComment', {
            method: 'POST',
            body: JSON.stringify({ text, postUUID }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res=>res.json())
    }


    return (
        <PostContext.Provider value={{
            posts, users, tags, createPost,
            auth, loggedIn, logout, getPostById, getCommentsByPostId, 
            createComment
        }}>
            {children}
        </PostContext.Provider>
    );
}; 
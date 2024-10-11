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
        console.log('here')
        e.preventDefault()
        fetch('/logout', { method: 'POST' })
            .then(res => res.json())
            .then(({ loggedIn }) => setLoggedIn(loggedIn))
    }

    function auth(username, password) {
        fetch('/auth', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(checkLogin)
    }

    function createPost(postUUID, title, category, text, tags, username, password) {
        fetch('/createPost', {
            method: 'POST',
            body: JSON.stringify({ postUUID, title, category, text, tags, username, password }),
            headers: { 'Content-Type': 'application/json' }
        }).then(() => getPosts())
    }

    return (
        <PostContext.Provider value={{
            posts, users, tags, createPost,
            auth, loggedIn, logout
        }}>
            {children}
        </PostContext.Provider>
    );
}; 
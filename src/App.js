import firebase from "./utils/firebase"
import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Header from "./header"
import Posts from "./pages/Posts"
import Signin from "./pages/Signin"
import NewPost from "./pages/NewPost"
import Post from "./pages/Post"
import MyPosts from "./pages/MyPosts"
import MyCollections from "./pages/MyCollections"
import MySettings from "./pages/MySettings"
import PostLayout from "./PostLayout"
import MemberLayout from "./MemberLayout"



function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser)
    })
  }, [])
  return (
    <BrowserRouter>
      <Header user={user} />
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />} />
        <Route path="posts" element={<PostLayout />} >
          <Route index element={<Posts />} />
          <Route path=":postId" element={user ? <Post /> : <Navigate to="/posts" />} />
        </Route>
        <Route path="/new-post" element={user ? <NewPost /> : <Navigate to="/posts" />} />
        <Route path="/signin" element={user ? <Navigate to="/posts" /> : <Signin />} />
        <Route path="/my" element={user ? <MemberLayout /> : <Navigate to="/posts" />} >
          <Route path="posts" element={<MyPosts />} />
          <Route path="collections" element={<MyCollections />} />
          <Route path="settings" element={<MySettings user={user} />} />
        </Route>
        <Route path="*" element={<Navigate to="/posts" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
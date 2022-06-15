import { Item } from "semantic-ui-react"
import { useState, useEffect, useRef } from "react"
import firebase from "../utils/firebase"
import "firebase/compat/firestore"
import Post from "../components/Post"
import { useLocation } from "react-router-dom"
import { Waypoint } from "react-waypoint"



function Posts() {
  const location = useLocation()
  const urlSearchParams = new URLSearchParams(location.search)
  const currentTopic = urlSearchParams.get("topic")
  const [posts, setPosts] = useState([])
  const lastPostSnapShotRef = useRef()
  useEffect(() => {
    if (currentTopic) {
      firebase
        .firestore()
        .collection("posts")
        .where("topic", "==", currentTopic)
        .orderBy("createdAt", 'desc')
        .limit(2)
        .get()
        .then((collectionSnapshot) => {
          const data = collectionSnapshot.docs.map((doc) => {
            const id = doc.id
            return { ...doc.data(), id }
          })
          lastPostSnapShotRef.current = collectionSnapshot.docs[collectionSnapshot.docs.length - 1]
          setPosts(data)
        })
    } else {
      firebase
        .firestore()
        .collection("posts")
        .orderBy("createdAt", 'desc')
        .limit(2)
        .get()
        .then((collectionSnapshot) => {
          const data = collectionSnapshot.docs.map((doc) => {
            const id = doc.id
            return { ...doc.data(), id }
          })
          lastPostSnapShotRef.current = collectionSnapshot.docs[collectionSnapshot.docs.length - 1]
          setPosts(data)
        })
    }


  }, [currentTopic])
  return (
    <>
      <Item.Group>
        {posts.map(post => {
          return <Post key={post.id} post={post} />
        })}
      </Item.Group>

      {posts.length > 0 &&
        <Waypoint onEnter={() => {
          if (lastPostSnapShotRef.current) {
            if (currentTopic) {
              firebase
                .firestore()
                .collection("posts")
                .where("topic", "==", currentTopic)
                .orderBy("createdAt", 'desc')
                .startAfter(lastPostSnapShotRef.current)
                .limit(2)
                .get()
                .then((collectionSnapshot) => {
                  const data = collectionSnapshot.docs.map((doc) => {
                    const id = doc.id
                    return { ...doc.data(), id }
                  })
                  lastPostSnapShotRef.current = collectionSnapshot.docs[collectionSnapshot.docs.length - 1]
                  setPosts([...posts, ...data])
                })
            } else {
              firebase
                .firestore()
                .collection("posts")
                .orderBy("createdAt", 'desc')
                .startAfter(lastPostSnapShotRef.current)
                .limit(2)
                .get()
                .then((collectionSnapshot) => {
                  const data = collectionSnapshot.docs.map((doc) => {
                    const id = doc.id
                    return { ...doc.data(), id }
                  })
                  lastPostSnapShotRef.current = collectionSnapshot.docs[collectionSnapshot.docs.length - 1]
                  setPosts([...posts, ...data])
                })
            }
          }
        }} />
      }
    </>
  )
}

export default Posts
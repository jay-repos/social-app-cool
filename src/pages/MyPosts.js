import { Header, Item } from "semantic-ui-react"
import { useState, useEffect } from "react"
import firebase from "../utils/firebase"
import "firebase/compat/firestore"
import Post from "../components/Post"

function MyPosts() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged((authObj) => {
      unsub();
      if (authObj) {
        firebase
          .firestore()
          .collection("posts")
          .where("author.uid", "==", firebase.auth().currentUser.uid)
          .get()
          .then((collectionSnapshot) => {
            const data = collectionSnapshot.docs.map((doc) => {
              const id = doc.id
              return { ...doc.data(), id }
            })
            setPosts(data)
          })
      }
    })


  }, [])
  return (
    <>
      <Header>My Articles</Header>
      <Item.Group>
        {posts.map(post => {
          return <Post key={post.id} post={post} />
        })}
      </Item.Group>
    </>
  )
}

export default MyPosts
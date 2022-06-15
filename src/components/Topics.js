import { useState, useEffect } from "react"
import { List } from "semantic-ui-react"
import firebase from "../utils/firebase"
import "firebase/compat/firestore"
import { Link, useLocation } from "react-router-dom"


function Topics() {
  const location = useLocation()
  const urlSearchParams = new URLSearchParams(location.search)
  const currentTopic = urlSearchParams.get("topic")
  const [topics, setTopics] = useState([])
  useEffect(() => {
    firebase
      .firestore()
      .collection("topics")
      .get()
      .then((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          return doc.data()
        })
        setTopics(data)
      })
  }, [])
  return (<List animated selection>
    {topics.map((topic) => {
      return (
        <List.Item
          key={topic.name}
          as={Link}
          to={`/posts?topic=${topic.name}`}
          active={topic.name === currentTopic}
        >{topic.name}</List.Item>)
    })
    }
  </List>)
}

export default Topics
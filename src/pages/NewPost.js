import { Container, Header, Form, Image, Button } from "semantic-ui-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import firebase from "../utils/firebase"
import "firebase/compat/firestore"
import "firebase/compat/storage"


function NewPost() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [topics, setTopics] = useState([])
  const [topicName, setTopicName] = useState("")
  const [file, setFile] = useState(null)
  const [isloading, setIsloading] = useState(false)
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
  const options = topics.map((topic) => {
    return {
      text: topic.name,
      value: topic.name
    }
  })
  const previewUrl = file ? URL.createObjectURL(file) : "https://react.semantic-ui.com/images/wireframe/image.png"

  function onSubmit() {
    setIsloading(true)
    const documentRef = firebase.firestore().collection("posts").doc()
    const fileRef = firebase.storage().ref("post-images/" + documentRef.id)
    const metadata = {
      contentType: file.type
    }
    fileRef.put(file, metadata).then(() => {
      fileRef.getDownloadURL().then((imageUrl) => {
        documentRef.set({
          title,
          content,
          topic: topicName,
          createdAt: firebase.firestore.Timestamp.now(),
          author: {
            displayName: firebase.auth().currentUser.displayName || "",
            photoURL: firebase.auth().currentUser.photoURL || "",
            uid: firebase.auth().currentUser.uid,
            email: firebase.auth().currentUser.email
          },
          imageUrl,
        }).then(() => {
          setIsloading(false)
          navigate("/posts")
        })
      })
    })

  }

  return (
    <Container>
      <Header>Hey! Try post something!</Header>
      <Form onSubmit={onSubmit}>
        <Image
          src={previewUrl}
          size="small"
          floated="left"
        />
        <Button
          basic
          as="label"
          htmlFor="post-image"
        >
          upload a picture
        </Button>
        <Form.Input
          type="file"
          id="post-image"
          style={{ display: "none" }}
          onChange={(e) => { setFile(e.target.files[0]) }}
        />

        <Form.Input
          placeholder="Title here"
          value={title}
          onChange={(e) => { setTitle(e.target.value) }}
        />

        <Form.TextArea
          placeholder="Content here"
          value={content}
          onChange={(e) => { setContent(e.target.value) }}
        />
        <Form.Dropdown
          placeholder="choose a topic"
          options={options}
          selection
          value={topicName}
          onChange={(e, { value }) => { setTopicName(value) }}
        />
        <Form.Button loading={isloading}>Submit</Form.Button>
      </Form>
    </Container>
  )
}

export default NewPost
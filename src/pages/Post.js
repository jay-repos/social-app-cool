import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Image, Header, Segment, Icon, Comment, Form } from "semantic-ui-react"
import firebase from "../utils/firebase"



function Post() {
  const { postId } = useParams()
  const [post, setPost] = useState({ author: {} })
  const [commentContent, setCommentContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [comments, setComments] = useState([])
  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .onSnapshot((docSnapshot) => {
        const data = docSnapshot.data()
        setPost(data)
      })
    // .get()
    // .then((docSnapshot) => {
    //   const data = docSnapshot.data()
    //   setPost(data)
    // })
  }, [])

  useEffect(() => {
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("createdAt")
      .onSnapshot((collectionSnapshot) => {
        const data = collectionSnapshot.docs.map((doc) => {
          const id = doc.id
          return { ...doc.data(), id }
        })
        setComments(data)
      })
  }, [])

  function toggle(isActive, field) {
    const uid = firebase.auth().currentUser.uid
    firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .update({
        [field]: isActive
          ? firebase.firestore.FieldValue.arrayRemove(uid)
          : firebase.firestore.FieldValue.arrayUnion(uid)
      })

  }
  function onSubmit() {
    setIsLoading(true)
    const firestore = firebase.firestore()
    const batch = firestore.batch()
    const postRef = firestore.collection("posts").doc(postId)
    batch.update(postRef, {
      commentCount: firebase.firestore.FieldValue.increment(1)
    })
    const commentRef = postRef.collection("comments").doc()
    batch.set(commentRef, {
      content: commentContent || " ",
      createdAt: firebase.firestore.Timestamp.now(),
      author: {
        uid: firebase.auth().currentUser.uid,
        displayName: firebase.auth().currentUser.displayName || "",
        photoURL: firebase.auth().currentUser.photoURL || "",
      }
    })
    batch.commit().then(() => {
      setCommentContent("")
      setIsLoading(false)
    }
    )
  }



  const isCollected = post.collectedBy?.includes(firebase.auth().currentUser.uid)
  const isLiked = post.likedBy?.includes(firebase.auth().currentUser.uid)

  return (
    <>
      {post.author.photoURL
        ? <Image src={post.author.photoURL} avatar />
        : <Icon name="user circle" />
      }
      {post.author.displayName || "user"}
      <Header>
        {post.title}
        <Header.Subheader>
          {post.topic} | {post.createdAt?.toDate().toLocaleDateString()}
        </Header.Subheader>
      </Header>
      <Image src={post.imageUrl} />
      <Segment basic vertical>{post.content}</Segment>
      <Segment basic vertical>
        Comment {post.commentCount || 0} | Like {post.likedBy?.length || 0} |
        <Icon
          name={`thumbs up${isLiked ? "" : " outline"}`}
          color={isLiked ? "blue" : "grey"}
          link
          onClick={() => toggle(isLiked, "likedBy")}
        />
        <Icon
          name={`bookmark${isCollected ? "" : " outline"}`}
          color={isCollected ? "blue" : "grey"}
          link
          onClick={() => toggle(isCollected, "collectedBy")}
        />
      </Segment>
      <Comment.Group>
        <Form reply>
          <Form.TextArea value={commentContent} onChange={e => setCommentContent(e.target.value)} />
          <Form.Button
            onClick={onSubmit}
            loading={isLoading}
            disabled={!commentContent}
          >
            Comment
          </Form.Button>
        </Form>
        <Header>Total {post.commentCount || 0} comments</Header>
        {comments.map((comment) => {
          return (
            <Comment key={comment.id}>
              <Comment.Avatar src={comment.author.photoURL} />
              <Comment.Content>
                <Comment.Author as="span">{comment.author.displayName}</Comment.Author>
                <Comment.Metadata>{comment.createdAt.toDate().toLocaleString()}</Comment.Metadata>
                <Comment.Text>{comment.content}</Comment.Text>
              </Comment.Content>
            </Comment>
          )
        })}

      </Comment.Group>

    </>
  )
}

export default Post
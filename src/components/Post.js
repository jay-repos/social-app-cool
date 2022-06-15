import { Icon, Image, Item } from "semantic-ui-react"
import { Link } from "react-router-dom"

function Post({ post }) {
  return (
    <Item as={Link} to={`/posts/${post.id}`}>
      <Item.Image src={post.imageUrl || "https://react.semantic-ui.com/images/wireframe/image.png"} />
      <Item.Content>
        <Item.Meta>
          {post.author.photoURL
            ? <Image src={post.author.photoURL} avatar />
            : <Icon name="user circle" />
          }
          {" "}{post.topic} | {post.author.displayName || "user"}
        </Item.Meta>
        <Item.Header>{post.title}</Item.Header>
        <Item.Description>{post.content}</Item.Description>
        <Item.Extra>Comment {post.commentCount || 0} | like {post.likedBy?.length || 0}</Item.Extra>
      </Item.Content>
    </Item>
  )
}

export default Post
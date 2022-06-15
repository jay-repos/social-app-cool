import { useState } from "react"
import { Menu, Form, Container, Message } from "semantic-ui-react"
import { useNavigate } from "react-router-dom"
import firebase from "../utils/firebase"
import "firebase/compat/auth"

function Signin() {
  const navigate = useNavigate()
  const [activeItem, setActiveItem] = useState("register")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isloading, setIsloading] = useState(false)


  function onSubmit() {
    setIsloading(true)
    if (activeItem === "register") {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          navigate("/posts")
          setIsloading(false)
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              setErrorMessage("email already in use")
              break
            case "auth/invalid-email":
              setErrorMessage("invalid email form")
              break
            case "auth/weak-password":
              setErrorMessage("weak password")
              break
            default:
              break
          }
          setIsloading(false)
        })
    } else if (activeItem === "login") {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigate("/posts")
          setIsloading(false)
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              setErrorMessage("invalid email form")
              break
            case "auth/user-not-found":
              setErrorMessage("the email is not registered")
              break
            case "auth/wrong-password":
              setErrorMessage("wrong password")
              break
            default:
              break
          }
          setIsloading(false)
        })
    }
  }

  return (
    <Container>
      <Menu widths="2" >
        <Menu.Item
          active={activeItem === "register"}
          onClick={() => setActiveItem("register")}
        >
          Register
        </Menu.Item >

        <Menu.Item
          active={activeItem === "login"}
          onClick={() => setActiveItem("login")}
        >Log in</Menu.Item>
      </Menu>
      <Form onSubmit={onSubmit}>
        <Form.Input
          label="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="email">
        </Form.Input>
        <Form.Input
          label="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="password"
          type="password">
        </Form.Input>
        {errorMessage && <Message negative>{errorMessage}</Message>}
        <Form.Button loading={isloading}>
          {activeItem === "register" && 'Register'}
          {activeItem === "login" && 'Log in'}
        </Form.Button>
      </Form>
    </Container>
  )
}

export default Signin
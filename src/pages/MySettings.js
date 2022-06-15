import { Button, Header, Input, Modal, Image, Segment } from "semantic-ui-react"
import firebase from "../utils/firebase"
import { useState, useEffect } from "react"

function MyName({ user }) {
  const [displayName, setDisplayname] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, SetIsLoading] = useState(false)

  function onSubmit() {
    SetIsLoading(true)
    user
      .updateProfile({ displayName })
      .then(() => {
        SetIsLoading(false)
        setDisplayname("")
        setIsModalOpen(false)

      })
  }

  return (
    <>
      <Header size="small">
        Member name
        <Button floated="right" onClick={() => setIsModalOpen(true)}>Edit</Button>
      </Header>
      <Segment vertical>{user.displayName}</Segment>
      <Modal open={isModalOpen} size="mini">
        <Modal.Header>Edit Member's name</Modal.Header>
        <Modal.Content>
          <Input
            fluid
            placeholder="Type new name here"
            value={displayName}
            onChange={e => setDisplayname(e.target.value)}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button onClick={onSubmit} loading={isLoading}>Edit</Button>
        </Modal.Actions>
      </Modal>
    </>
  )
}

function Myphoto({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const previewImageUrl = file ? URL.createObjectURL(file) : user.photoURL

  function onSubmit() {
    setIsLoading(true)
    const fileRef = firebase.storage().ref("user-photos/" + user.uid)
    const metadata = {
      contentType: file.type
    }
    fileRef.put(file, metadata).then(() => {
      fileRef.getDownloadURL().then((imageUrl) => {
        user
          .updateProfile({
            photoURL: imageUrl
          })
          .then(() => {
            setIsLoading(false)
            setFile(null)
            setIsModalOpen(false)
          })
      })
    })
  }
  return (
    <>
      <Header size="small">
        Member photo
        <Button floated="right" onClick={() => setIsModalOpen(true)}>Edit</Button>
      </Header>
      <Segment vertical><Image src={user.photoURL} avatar /></Segment>
      <Modal open={isModalOpen} size="mini">
        <Modal.Header>Update user photo</Modal.Header>
        <Modal.Content image>
          <Image src={previewImageUrl} avatar wrapped />
          <Modal.Description>
            <Button as="label" htmlFor="post-image">Upload</Button>
            <Input
              type="file"
              id="post-image"
              style={{ display: "none" }}
              onChange={e => setFile(e.target.files[0])}
            ></Input>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button onClick={onSubmit} loading={isLoading}>Edit</Button>
        </Modal.Actions>
      </Modal>
    </>)
}

function MyPassword({ user }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)


  function onSubmit() {
    setIsLoading(true)
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword)
    user.reauthenticateWithCredential(credential).then(() => {
      user.updatePassword(newPassword).then(() => {
        setIsLoading(false)
        setIsModalOpen(false)
        setOldPassword("")
        setNewPassword("")
      })
    })
  }
  return (<>
    <Header size="small">
      Password
      <Button floated="right" onClick={() => setIsModalOpen(true)}>Edit</Button>
    </Header>
    <Segment vertical>******</Segment>
    <Modal open={isModalOpen} size="mini">
      <Modal.Header>Edit password</Modal.Header>
      <Modal.Content>
        <Header size="small">Current password</Header>
        <Input
          placeholder="Old password"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
        />
        <Header size="small">New password</Header>
        <Input
          placeholder="New password"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
        <Button onClick={onSubmit} loading={isLoading}>Edit</Button>
      </Modal.Actions>
    </Modal>
  </>)
}

function MySettings({ user }) {
  return (
    <>
      <Header>Member Info</Header>
      <MyName user={user} />
      <Myphoto user={user} />
      <MyPassword user={user} />
    </>
  )
}

export default MySettings
import { Outlet } from "react-router-dom"
import { Container, Grid } from "semantic-ui-react"
import MyMenu from "./components/MyMenu"




function MemberLayout() {
  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column width={3}><MyMenu /></Grid.Column>
          <Grid.Column width={10}>
            <Outlet />
          </Grid.Column>
          <Grid.Column width={3}></Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}

export default MemberLayout
import { Menu, Search } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import firebase from './utils/firebase'



function Header({ user }) {

    return (
        <Menu>
            <Menu.Item as={Link} to="/posts">Social App Cool</Menu.Item>
            <Menu.Item>
                <Search />
            </Menu.Item>
            <Menu.Menu position="right">
                {user ? (<>
                    <Menu.Item as={Link} to="/new-post">New Post</Menu.Item>
                    <Menu.Item as={Link} to="/my/posts">Member</Menu.Item>
                    <Menu.Item onClick={() => firebase.auth().signOut()}>Log Out</Menu.Item>
                </>) : (<Menu.Item as={Link} to="/signin">Register/Log In</Menu.Item>)
                }

            </Menu.Menu>
        </Menu>
    )

}

export default Header
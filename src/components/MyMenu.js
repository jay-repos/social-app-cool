import { Link, useLocation } from "react-router-dom"
import { List } from "semantic-ui-react"



function MyMenu() {
  const location = useLocation()
  const menuItems = [
    {
      name: "My articles",
      path: "/my/posts"
    }, {
      name: "My collections",
      path: "/my/collections"
    }, {
      name: "Member Settings",
      path: "/my/settings"
    }]
  return (<List animated selection>
    {menuItems.map((menuItem) => {
      return (
        <List.Item
          as={Link}
          to={menuItem.path}
          key={menuItem.name}
          active={menuItem.path === location.pathname}
        >
          {menuItem.name}
        </List.Item>
      )
    })
    }
  </List>)
}

export default MyMenu
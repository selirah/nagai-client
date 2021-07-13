import { Home } from 'react-feather'
import { PRIVATE_ROUTES } from 'router/constants'

const HorizontalNavigation = [
  {
    id: 'home',
    title: 'Dashboard',
    icon: <Home size={20} />,
    navLink: PRIVATE_ROUTES.HOME
  },
  {
    header: 'Features'
  }
]

export default HorizontalNavigation

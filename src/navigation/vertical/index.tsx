import { Home } from 'react-feather'
import { PRIVATE_ROUTES } from 'router/constants'

const VerticalNavigation: any = [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: PRIVATE_ROUTES.HOME
  },
  {
    header: 'Customers & Account'
  }
]

export default VerticalNavigation

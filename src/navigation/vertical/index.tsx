import { Navigation } from 'classes'
import { Grid, Home } from 'react-feather'

const VerticalNavigation: Navigation[] = [
  {
    links: {
      id: 'home',
      title: 'Home',
      icon: <Home size={20} />,
      navLink: '/admin/home'
    },
    header: 'Customers & Accounts'
  },
  {
    links: {
      id: 'accounts',
      title: 'Accounts',
      icon: <Grid size={20} />,
      navLink: '/admin/accounts'
    }
  }
]

export default VerticalNavigation

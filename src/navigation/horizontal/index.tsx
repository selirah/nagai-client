import * as Icons from 'react-feather'
import { PRIVATE_ROUTES } from 'router/constants'

const HorizontalNavigation = [
  {
    id: 'home',
    title: 'Dashboard',
    icon: <Icons.Home size={20} />,
    navLink: PRIVATE_ROUTES.HOME
  },
  {
    header: 'Features'
  },
  {
    id: 'manufacturers',
    title: 'Manufacturers',
    icon: <Icons.Server size={20} />,
    navLink: PRIVATE_ROUTES.MANUFACTURERS
  },
  {
    id: 'outlets',
    title: 'Outlets',
    icon: <Icons.CloudLightning size={20} />,
    navLink: PRIVATE_ROUTES.OUTLETS
  },
  {
    id: 'categories',
    title: 'Categories',
    icon: <Icons.Database size={20} />,
    navLink: PRIVATE_ROUTES.CATEGORIES
  },
  {
    id: 'products',
    title: 'Products',
    icon: <Icons.Coffee size={20} />,
    navLink: PRIVATE_ROUTES.PRODUCTS
  },
  {
    id: 'territories',
    title: 'Territories',
    icon: <Icons.Map size={20} />,
    navLink: PRIVATE_ROUTES.TERRITORIES
  },
  {
    id: 'stock',
    title: 'Stock',
    icon: <Icons.CheckCircle size={20} />,
    navLink: PRIVATE_ROUTES.STOCK
  },
  {
    id: 'orders',
    title: 'Orders',
    icon: <Icons.ShoppingCart size={20} />,
    navLink: PRIVATE_ROUTES.ORDERS
  },
  {
    id: 'deliveries',
    title: 'Deliveries',
    icon: <Icons.Truck size={20} />,
    navLink: PRIVATE_ROUTES.DELIVERIES
  },
  {
    id: 'sales',
    title: 'Sales',
    icon: <Icons.ShoppingBag size={20} />,
    navLink: PRIVATE_ROUTES.SALES
  },
  {
    id: 'payments',
    title: 'Payments',
    icon: <Icons.BookOpen size={20} />,
    navLink: PRIVATE_ROUTES.PAYMENTS
  }
]

export default HorizontalNavigation

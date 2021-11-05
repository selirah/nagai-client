import * as Icons from 'react-feather'
import { PRIVATE_ROUTES } from '@router/constants'

const HorizontalNavigation = [
  {
    header: 'Home'
  },
  {
    id: 'home',
    title: 'Dashboard',
    icon: <Icons.Home size={20} />,
    navLink: PRIVATE_ROUTES.HOME
  },
  {
    header: 'Outlets and Territories'
  },
  {
    id: 'manufacturers',
    title: 'Manufacturers',
    icon: <Icons.Server size={20} />,
    navLink: PRIVATE_ROUTES.MANUFACTURERS
  },
  {
    id: 'territories',
    title: 'Territories',
    icon: <Icons.Map size={20} />,
    navLink: PRIVATE_ROUTES.TERRITORIES
  },
  {
    id: 'outlets',
    title: 'Outlets',
    icon: <Icons.CloudLightning size={20} />,
    navLink: PRIVATE_ROUTES.OUTLETS
  },
  {
    id: 'users',
    title: 'Users',
    icon: <Icons.Users size={20} />,
    navLink: PRIVATE_ROUTES.USERS
  },
  {
    header: 'Products and Stock'
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
    id: 'stock',
    title: 'Stock',
    icon: <Icons.CheckCircle size={20} />,
    navLink: PRIVATE_ROUTES.STOCK
  },
  {
    header: 'Orders and Deliveries'
  },
  {
    id: 'orders',
    title: 'Orders',
    icon: <Icons.ShoppingBag size={20} />,
    navLink: PRIVATE_ROUTES.ORDERS
  },
  {
    id: 'invoices',
    title: 'Invoices',
    icon: <Icons.Paperclip size={20} />,
    navLink: PRIVATE_ROUTES.INVOICES
  },
  {
    id: 'deliveries',
    title: 'Deliveries',
    icon: <Icons.Truck size={20} />,
    navLink: PRIVATE_ROUTES.DELIVERIES
  },
  {
    header: 'Sales and Payments'
  },
  {
    id: 'sales',
    title: 'Sales',
    icon: <Icons.Briefcase size={20} />,
    navLink: PRIVATE_ROUTES.SALES
  },
  {
    id: 'payments',
    title: 'Payments',
    icon: <Icons.DollarSign size={20} />,
    navLink: PRIVATE_ROUTES.PAYMENTS
  }
  // {
  //   header: 'Reports'
  // }
  // {
  //   id: 'reports',
  //   title: 'Reports',
  //   icon: <Icons.BarChart2 size={20} />,
  //   navLink: PRIVATE_ROUTES.REPORTS
  // }
]

export default HorizontalNavigation

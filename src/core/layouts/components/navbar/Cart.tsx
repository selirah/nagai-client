import { useState, useEffect, Fragment, useCallback } from 'react'
import { ShoppingCart } from 'react-feather'
import { Badge } from 'reactstrap'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import { Item } from '@classes/Order'
import CartDrawer from '@containers/orders/CartDrawer'
import orderActions from '@redux/orders/actions'

const { clearCart, removeFromCart } = orderActions

const CartDisplay = () => {
  const store = Selector((state) => state.orders)
  const [total, setTotal] = useState(0)
  const [cart, setCart] = useState<Item[]>([])
  const [toggleDrawer, setToggleDrawer] = useState(false)
  const dispatch: Dispatch = useDispatch()

  useEffect(() => {
    const { cart } = store
    setTotal(cart.length)
    setCart(cart)
  }, [store])

  const handleDrawer = useCallback(() => {
    setToggleDrawer(!toggleDrawer)
  }, [toggleDrawer])

  const removeItem = useCallback(
    (index: number) => {
      dispatch(removeFromCart(index))
    },
    [dispatch]
  )

  const emptyCart = useCallback(() => {
    dispatch(clearCart())
  }, [dispatch])

  return (
    <Fragment>
      <ShoppingCart className="cursor-pointer" onClick={handleDrawer} />
      <Badge className="cursor-pointer" onClick={handleDrawer} pill>
        {total}
      </Badge>
      <CartDrawer
        toggleDrawer={toggleDrawer}
        handleToggleDrawer={() => setToggleDrawer(!toggleDrawer)}
        cart={cart}
        removeItem={removeItem}
        emptyCart={emptyCart}
      />
    </Fragment>
  )
}

export default CartDisplay

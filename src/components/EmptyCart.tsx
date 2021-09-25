const EmptyCart = () => {
  return (
    <div className="w-100 h-100 d-block mx-auto">
      <div className="p-1 text-center">
        <h2 className="font-weight-bold text-success mb-2">Empty Cart</h2>
        <img
          alt="empty"
          src={require('assets/images/icons/empty-cart.svg').default}
          width={100}
        />
        <p className="mt-2">Consider adding products to cart</p>
      </div>
    </div>
  )
}

export default EmptyCart

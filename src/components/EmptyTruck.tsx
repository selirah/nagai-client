const EmptyTruck = () => {
  return (
    <div className="w-100 h-100 d-block mx-auto">
      <div className="p-1 text-center">
        <h2 className="font-weight-bold text-danger mb-2">Empty Cart</h2>
        <img
          alt="empty"
          src={require('assets/images/icons/delivery-truck.svg').default}
          width={100}
        />
        <p className="mt-2">
          This order has not been picked up by dispatch yet
        </p>
      </div>
    </div>
  )
}

export default EmptyTruck

const Empty = () => {
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <div className="p-4 text-center">
        <h4>No data found</h4>
        <img
          alt="empty"
          src={require('@assets/images/icons/empty-box.svg').default}
          width={100}
        />
        <p>No record has been detected</p>
      </div>
    </div>
  )
}

export default Empty

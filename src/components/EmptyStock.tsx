import React from 'react'
import { Link } from 'react-router-dom'
import RippleButton from '@core/components/ripple-button'

interface Props {
  productId: string
}

const EmptyStock: React.FC<Props> = (props) => {
  const { productId } = props

  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <div className="p-4 text-center">
        <h4>Product not Stocked</h4>
        <img
          alt="empty"
          src={require('@assets/images/icons/empty-box.svg').default}
          width={100}
        />
        <p>
          The product you have selected has not been stocked yet. Consider
          stocking it by clicking the button below
        </p>
        <RippleButton
          color="primary"
          size="md"
          tag={Link}
          to={`/admin/stock/add/${productId}`}
        >
          Stock Product
        </RippleButton>
      </div>
    </div>
  )
}

export default EmptyStock

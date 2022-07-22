import { useMemo, useCallback } from 'react'
import { Delivery, Item, OrderStatus } from '@classes/index'
import DataTable, {
  createTheme,
  IDataTableStyles,
  IDataTableColumn
} from 'react-data-table-component'
import { ArrowDown, Map } from 'react-feather'
import RippleButton from '@core/components/ripple-button'
import { Selector } from '@redux/selector-dispatch'
import { Badge } from 'reactstrap'
import { numberWithCommas } from '@utils/index'
import { userRoles } from '@utils/ability'

const customStyles: IDataTableStyles = {
  rows: {
    style: {
      minHeight: '38px', // override the row height,
      textAlign: 'center',
      cursor: 'pointer'
    }
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
      fontWeight: 'bolder',
      fontSize: '11px',
      textTransform: 'uppercase',
      textAlign: 'center'
    }
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px'
    }
  },
  pagination: {
    pageButtonsStyle: {
      color: '#b4b7bd'
    }
  }
}

createTheme('dark', {
  text: {
    primary: '#b4b7bd',
    secondary: '#b4b7bd'
  },
  background: {
    default: '#283046'
  },
  context: {
    background: '#283046',
    text: '#b4b7bd'
  },
  divider: {
    default: '#b4b7bd'
  },
  action: {
    button: '#b4b7bd',
    hover: '#b4b7bd',
    disabled: '#b4b7bd'
  },
  expander: {
    fontColor: '#FFF',
    backgroundColor: 'red',
    collapsedButton:
      'data:image/svg+xml,%3Csvg%20fill%3D%22%23757575%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M8.59%2016.34l4.58-4.59-4.58-4.59L10%205.75l6%206-6%206z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0-.25h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E',
    expandedButton:
      'data:image/svg+xml,%3Csvg%20fill%3D%22%23757575%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20width%3D%2224%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M7.41%207.84L12%2012.42l4.59-4.58L18%209.25l-6%206-6-6z%22/%3E%0A%20%20%20%20%3Cpath%20d%3D%22M0-.75h24v24H0z%22%20fill%3D%22none%22/%3E%0A%3C/svg%3E'
  }
})

const ExpandedRow = (props: any) => {
  const delivery: Delivery = props.data
  const { handleDeliverySelection } = props
  const layoutStore = Selector((state) => state.layout)
  const authStore = Selector((state) => state.auth)

  const renderBadge = useCallback((status: string) => {
    switch (status) {
      case OrderStatus.PENDING:
        return (
          <Badge className="text-uppercase" color="primary" pill>
            {status}
          </Badge>
        )
      case OrderStatus.TRANSIT:
        return (
          <Badge className="text-uppercase" color="secondary" pill>
            {status}
          </Badge>
        )
      case OrderStatus.DELIVERED:
        return (
          <Badge className="text-uppercase" color="success" pill>
            {status}
          </Badge>
        )
      case OrderStatus.FAILED:
        return (
          <Badge className="text-uppercase" color="danger" pill>
            {status.toUpperCase()}
          </Badge>
        )

      case OrderStatus.DISPATCH:
        return (
          <Badge className="text-uppercase" color="info" pill>
            {status.toUpperCase()}
          </Badge>
        )
    }
  }, [])

  const columns: IDataTableColumn[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Product ID',
        sortable: true,
        selector: (row: Item) => row.product.id
      },
      {
        id: 2,
        name: 'Product',
        sortable: true,
        selector: (row: Item) => row.product.productName.toUpperCase()
      },
      {
        id: 3,
        name: 'SKU',
        sortable: true,
        selector: (row: Item) => row.sku
      },
      {
        id: 4,
        name: 'Unit',
        sortable: true,
        selector: (row: Item) => row.unit
      },
      {
        id: 5,
        name: 'Unit Price',
        sortable: true,
        selector: (row: Item) => `GHC ${row.unitPrice}`
      },
      {
        id: 6,
        name: 'Quantity',
        sortable: true,
        selector: (row: Item) => row.quantity
      },
      {
        id: 7,
        name: 'Sub-Total',
        sortable: true,
        selector: (row: Item) =>
          `GHC ${(row.quantity * row.unitPrice).toFixed(2)}`
      }
    ],
    []
  )

  return (
    <div className="row mt-2 mx-2 animate__animated animate__fadeIn">
      <div className="col-sm-12 col-lg-12">
        <hr className="mb-2" />
        <div className="d-lg-flex justify-content-between d-block">
          <div>
            <h6 className="font-weight-bolder mb-1">
              Order Number:{' '}
              <span className="text-primary">{delivery.order.id}</span>
            </h6>
            <h6 className="font-weight-bolder mb-1">
              Order Total:{' '}
              <span className="text-primary">{`GHC ${numberWithCommas(
                delivery.order.orderTotal
              )}`}</span>
            </h6>
            <h6 className="font-weight-bolder mb-1">
              Order Status:{' '}
              <span className="text-primary">
                {renderBadge(delivery.order.status)}
              </span>
            </h6>
            {(authStore.user!.role === userRoles.admin ||
              authStore.user!.role === userRoles.agent) &&
            (delivery.order.status === OrderStatus.DISPATCH ||
              delivery.order.status === OrderStatus.TRANSIT) ? (
              <RippleButton
                color="success"
                className="mt-1 mb-1"
                size="sm"
                onClick={() => handleDeliverySelection(delivery)}
              >
                <Map size={14} /> Track Progress
              </RippleButton>
            ) : null}
          </div>
          <div>
            <h6 className="font-weight-bolder mb-1">
              Dispatch Name:{' '}
              <span className="text-primary">{`${delivery.dispatch.firstName.toUpperCase()} ${delivery.dispatch.lastName.toUpperCase()}`}</span>
            </h6>
            <h6 className="font-weight-bolder mb-1">
              Dispatch Phone:{' '}
              <span className="text-primary">{delivery.dispatch.phone}</span>
            </h6>
            <h6 className="font-weight-bolder mb-1">
              Dispatch Email:{' '}
              <span className="text-primary">{delivery.dispatch.email}</span>
            </h6>
          </div>
        </div>
        <hr className="" />
      </div>
      <DataTable
        columns={columns}
        data={delivery.order.items}
        theme={layoutStore.mode}
        noHeader
        sortIcon={<ArrowDown />}
        customStyles={customStyles}
      />
    </div>
  )
}

export default ExpandedRow

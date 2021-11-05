import { useMemo } from 'react'
import { Order, Item } from '@classes/index'
import DataTable, {
  createTheme,
  IDataTableStyles,
  IDataTableColumn
} from 'react-data-table-component'
import { ArrowDown } from 'react-feather'
import RippleButton from '@core/components/ripple-button'
import { Selector } from '@redux/selector-dispatch'

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
  const order: Order = props.data
  const { handleOrderSelection } = props
  const layoutStore = Selector((state) => state.layout)

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
              Outlet Name:{' '}
              <span className="text-primary">
                {order.outlet.outletName.toUpperCase()}
              </span>
            </h6>
            <h6 className="font-weight-bolder mb-1">
              Outlet Owner:{' '}
              <span className="text-primary">
                {order.outlet.ownerName.toUpperCase()}
              </span>
            </h6>
            <h6 className="font-weight-bolder mb-1">
              Sub-Locality:{' '}
              <span className="text-primary">
                {order.outlet.subLocality.toUpperCase()}
              </span>
            </h6>
            <RippleButton
              color="secondary"
              className="mt-1 mb-1"
              size="sm"
              onClick={() => handleOrderSelection(order)}
            >
              View Details
            </RippleButton>
          </div>
          <div>
            <h6 className="font-weight-bolder mb-1">
              Barcode:{' '}
              <span className="text-primary">{order.outlet.barcode}</span>
            </h6>
            <h6 className="font-weight-bolder mb-1">
              Locality:{' '}
              <span className="text-primary">
                {order.outlet.locality.toUpperCase()}
              </span>
            </h6>
            <h6 className="font-weight-bolder mb-1">
              Phone: <span className="text-primary">{order.outlet.mobile}</span>
            </h6>
          </div>
        </div>
        <hr className="" />
      </div>
      <DataTable
        columns={columns}
        data={order.items}
        theme={layoutStore.mode}
        noHeader
        sortIcon={<ArrowDown />}
        customStyles={customStyles}
      />
    </div>
  )
}

export default ExpandedRow

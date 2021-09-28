import React, { useMemo } from 'react'
import { Order, Item } from 'classes'
import DataTable, {
  createTheme,
  IDataTableStyles,
  IDataTableColumn
} from 'react-data-table-component'
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  SkipBack,
  SkipForward
} from 'react-feather'
import { Selector } from 'redux/selector-dispatch'

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
  }
})

const ExpandedRow = (props: any) => {
  const order: Order = props.data
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
        name: 'Unit Price',
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
    <div className="row mt-2 mx-2">
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
      />
    </div>
  )
}

export default ExpandedRow

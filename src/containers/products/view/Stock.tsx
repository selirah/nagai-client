import React, { MouseEvent, Fragment } from 'react'
import moment from 'moment'
import { Stock } from 'classes'
import { Card, CardHeader, CardBody, CardTitle, Table } from 'reactstrap'
import Empty from 'components/Empty'
import PaginationComponent from 'components/Pagination'

interface Props {
  stock: Stock[]
  pageCount: number
  currentPage: number
  handlePageClick: (e: MouseEvent<HTMLElement>, i: number) => void
  pageSize: number
}

const StockList: React.FC<Props> = (props) => {
  const { stock, currentPage, handlePageClick, pageCount, pageSize } = props

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle>Stock</CardTitle>
      </CardHeader>
      <CardBody>
        <hr className="m-0 mb-2" />
        <div className="d-flex flex-column text-left align-items-start">
          {stock.length ? (
            <Fragment>
              <Table>
                <thead>
                  <tr>
                    <th>SKU</th>
                    <th>Unit</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Value</th>
                    <th>Reorder Level</th>
                    <th>Reorder Qty</th>
                    <th>Reorder Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stock
                    .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                    .map((s) => (
                      <tr key={s.id} style={{ fontSize: '12px' }}>
                        <th scope="row">{s.sku}</th>
                        <td>{s.unit}</td>
                        <td>{s.unitPrice}</td>
                        <td>{s.quantityInStock}</td>
                        <td>{s.stockValue}</td>
                        <td>{s.reorderLevel}</td>
                        <td>{s.reorderQuantity}</td>
                        <td>{moment(s.reorderDate).format("MMM Do, 'YY")}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <PaginationComponent
                currentPage={currentPage}
                handlePageClick={handlePageClick}
                pageCount={pageCount}
              />
            </Fragment>
          ) : (
            <Empty />
          )}
        </div>
      </CardBody>
    </Card>
  )
}

export default StockList

import React, { useMemo } from 'react'
import { Outlet } from 'classes'
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
import { IDataTableColumn } from 'react-data-table-component'
import SimpleTable from 'components/SimpleTable'
import moment from 'moment'

interface Props {
  outlets: Outlet[]
  theme: string
}

const Outlets: React.FC<Props> = (props) => {
  const { outlets, theme } = props

  const columns: IDataTableColumn[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Outlet Name',
        sortable: true,
        selector: (row: Outlet) => row.outletName.toUpperCase()
      },
      {
        id: 2,
        name: 'Owner Name',
        sortable: true,
        selector: (row: Outlet) => row.ownerName.toUpperCase()
      },
      {
        id: 3,
        name: 'Mobile',
        sortable: true,
        selector: (row: Outlet) => row.mobile
      },
      {
        id: 4,
        name: 'Lat',
        sortable: true,
        selector: (row: Outlet) => row.coordinates.lat
      },
      {
        id: 5,
        name: 'Lng',
        sortable: true,
        selector: (row: Outlet) => row.coordinates.lng
      },
      {
        id: 6,
        name: 'Locality',
        sortable: true,
        selector: (row: Outlet) => row.locality.toUpperCase()
      },
      {
        id: 7,
        name: 'Sub-locality',
        sortable: true,
        selector: (row: Outlet) => row.subLocality.toUpperCase()
      },
      {
        id: 8,
        name: 'Created Date',
        sortable: true,
        selector: (row: Outlet) => moment(row.createdAt).format("MMM Do, 'YY")
      },
      {
        id: 9,
        name: 'Updated Date',
        sortable: true,
        selector: (row: Outlet) => moment(row.updatedAt).format("MMM Do, 'YY")
      }
    ],
    []
  )

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle>Outlets under territory</CardTitle>
      </CardHeader>
      <CardBody>
        <hr className="m-0 mb-2" />
        <SimpleTable columns={columns} data={outlets} theme={theme} />
      </CardBody>
    </Card>
  )
}

export default Outlets

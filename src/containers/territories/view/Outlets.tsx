import React, { useMemo } from 'react'
import { Outlet } from 'classes'
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
import { IDataTableColumn } from 'react-data-table-component'
import SimpleTable from 'components/SimpleTable'

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
        selector: (row: Outlet) => row.outletName
      },
      {
        id: 2,
        name: 'Owner Name',
        sortable: true,
        selector: (row: Outlet) => row.ownerName
      },
      {
        id: 3,
        name: 'Mobile',
        sortable: true,
        selector: (row: Outlet) => row.mobile
      },
      {
        id: 4,
        name: 'Region',
        sortable: true,
        selector: (row: Outlet) => row.region.region
      },
      {
        id: 5,
        name: 'Lat',
        sortable: true,
        selector: (row: Outlet) => row.coordinates.lat
      },
      {
        id: 6,
        name: 'Lng',
        sortable: true,
        selector: (row: Outlet) => row.coordinates.lng
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

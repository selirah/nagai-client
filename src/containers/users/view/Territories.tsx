import React, { useMemo } from 'react'
import moment from 'moment'
import { Territory, UserTerritory } from 'classes'
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
import { IDataTableColumn } from 'react-data-table-component'
import SimpleTable from 'components/SimpleTable'

interface Props {
  userTerritories: UserTerritory
  theme: string
}

const Territories: React.FC<Props> = (props) => {
  const { userTerritories, theme } = props

  const columns: IDataTableColumn[] = useMemo(
    () => [
      {
        id: 1,
        name: 'Locality',
        sortable: true,
        selector: (row: Territory) => row.locality.toUpperCase()
      },
      {
        id: 2,
        name: 'Region',
        sortable: true,
        selector: (row: Territory) => row.region.region
      },
      {
        id: 3,
        name: 'Created Date',
        sortable: true,
        selector: (row: Territory) =>
          moment(row.createdAt).format("MMM Do, 'YY")
      },
      {
        id: 4,
        name: 'Updated Date',
        sortable: true,
        selector: (row: Territory) =>
          moment(row.updatedAt).format("MMM Do, 'YY")
      }
    ],
    []
  )

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle>Territories</CardTitle>
      </CardHeader>
      <CardBody>
        <hr className="m-0 mb-2" />
        <SimpleTable
          columns={columns}
          data={userTerritories ? userTerritories.territories : []}
          theme={theme}
        />
      </CardBody>
    </Card>
  )
}

export default Territories

import React, { useMemo } from 'react'
import { DBUser } from 'classes'
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
import { IDataTableColumn } from 'react-data-table-component'
import SimpleTable from 'components/SimpleTable'

interface Props {
  agents: DBUser[]
  theme: string
}

const Agents: React.FC<Props> = (props) => {
  const { agents, theme } = props

  const columns: IDataTableColumn[] = useMemo(
    () => [
      {
        id: 1,
        name: 'ID',
        sortable: true,
        selector: (row: DBUser) => row.id
      },
      {
        id: 2,
        name: 'Name',
        sortable: true,
        selector: (row: DBUser) => `${row.firstName} ${row.lastName}`
      },
      {
        id: 3,
        name: 'Email',
        sortable: true,
        selector: (row: DBUser) => row.email
      },
      {
        id: 4,
        name: 'Phone',
        sortable: true,
        selector: (row: DBUser) => row.phone
      },
      {
        id: 5,
        name: 'Role',
        sortable: true,
        selector: (row: DBUser) => row.role.toUpperCase()
      }
    ],
    []
  )

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle>Agents under territory</CardTitle>
      </CardHeader>
      <CardBody>
        <hr className="m-0 mb-2" />
        <SimpleTable columns={columns} data={agents} theme={theme} />
      </CardBody>
    </Card>
  )
}

export default Agents

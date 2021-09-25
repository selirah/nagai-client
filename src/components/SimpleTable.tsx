import React from 'react'
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
import Empty from './EmptyBox'
import { PuffLoader } from 'react-spinners'

const customStyles: IDataTableStyles = {
  rows: {
    style: {
      minHeight: '38px', // override the row height,
      cursor: 'pointer'
    }
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
      fontWeight: 'bolder',
      fontSize: '11px',
      textTransform: 'uppercase'
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

interface Props {
  columns: IDataTableColumn[]
  data: any[]
  theme: string
  loading?: boolean
  onRowClick?: (row: any) => void
  selectableRows?: boolean
  onSelectedRowsChange?: (value: any) => void
  selectableRowSelected?: (row: any) => boolean
}

const SimpleTable: React.FC<Props> = (props) => {
  const {
    columns,
    data,
    theme,
    loading,
    onRowClick,
    selectableRows,
    onSelectedRowsChange,
    selectableRowSelected
  } = props

  const renderEmptyList = () => <Empty />

  const renderLoader = () => (
    <div className="mt-5 text-primary">
      <PuffLoader color="#0090fe" />
    </div>
  )

  return (
    <DataTable
      columns={columns}
      keyField="id"
      data={data}
      defaultSortField="name"
      pagination
      paginationRowsPerPageOptions={[10, 15, 20]}
      paginationIconNext={<ChevronRight />}
      paginationIconPrevious={<ChevronLeft />}
      paginationIconFirstPage={<SkipBack />}
      paginationIconLastPage={<SkipForward />}
      noHeader
      theme={theme}
      sortIcon={<ArrowDown />}
      customStyles={customStyles}
      noDataComponent={renderEmptyList()}
      progressPending={loading}
      progressComponent={renderLoader()}
      onRowClicked={onRowClick}
      selectableRows={selectableRows}
      onSelectedRowsChange={onSelectedRowsChange}
      selectableRowSelected={selectableRowSelected}
    />
  )
}

export default SimpleTable

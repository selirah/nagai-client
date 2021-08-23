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
import { ScaleLoader } from 'react-spinners'
import Empty from './EmptyBox'

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
  server: boolean
  totalRows: number
  currentPage: number
  handlePerRowsChange: (newPerPage: number) => void
  handlePageClick: (page: number) => void
  pageSize: number
  theme: string
  loading: boolean
  onRowClicked?: (row: any) => void
}

const DataTableComponent: React.FC<Props> = (props) => {
  const {
    columns,
    currentPage,
    data,
    handlePageClick,
    handlePerRowsChange,
    onRowClicked,
    pageSize,
    loading,
    server,
    theme,
    totalRows
  } = props

  const renderLoader = () => (
    <div className="mt-5 text-primary">
      <ScaleLoader color="#0090fe" />
    </div>
  )

  const renderEmptyList = () => <Empty />

  return (
    <DataTable
      columns={columns}
      keyField="id"
      data={data}
      defaultSortField="name"
      pagination
      paginationServer={server}
      paginationTotalRows={totalRows}
      paginationDefaultPage={currentPage}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageClick}
      paginationPerPage={pageSize}
      paginationIconNext={<ChevronRight />}
      paginationIconPrevious={<ChevronLeft />}
      paginationIconFirstPage={<SkipBack />}
      paginationIconLastPage={<SkipForward />}
      noHeader
      theme={theme}
      sortIcon={<ArrowDown />}
      customStyles={customStyles}
      progressPending={loading}
      progressComponent={renderLoader()}
      noDataComponent={renderEmptyList()}
      onRowClicked={onRowClicked}
    />
  )
}

export default DataTableComponent

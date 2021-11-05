import React, { ChangeEvent, useCallback, useState } from 'react'
import { InputGroup, Input, Button } from 'reactstrap'
import { Menu } from 'react-feather'
import { useDispatch } from 'react-redux'
import { Dispatch, Selector } from '@redux/selector-dispatch'
import saleActions from '@redux/sales/actions'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select, { components } from 'react-select'
import { SaleStatus } from '@classes/index'

const { Option } = components

const { getSalesRequest } = saleActions

interface Props {
  handleMainSidebar: () => void
}

const options = [
  {
    value: SaleStatus.PENDING,
    label: SaleStatus.PENDING
  },
  {
    value: SaleStatus.PAYING,
    label: SaleStatus.PAYING
  },
  {
    value: SaleStatus.PAID,
    label: SaleStatus.PAID
  },
  {
    value: SaleStatus.FAILED,
    label: SaleStatus.FAILED
  },
  {
    value: SaleStatus.ALL,
    label: SaleStatus.ALL
  }
]

const SelectOptions = [
  {
    label: 'Status',
    options: options
  }
]

const customStyles = {
  container: (base: any) => ({
    ...base,
    flex: 1,
    width: 120,
    border: 0,
    boxShadow: 'none'
  })
}

const SearchBar: React.FC<Props> = (props) => {
  const { handleMainSidebar } = props
  const [query, setQuery] = useState('')
  const dispatch: Dispatch = useDispatch()
  const { activeLink, params } = Selector((state) => state.sales)
  const [dateRange, setDateRange] = useState<Date[] | null[]>([null, null])
  const [startDate, endDate] = dateRange
  const [status, setStatus] = useState('')

  const handleFilter = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])

  const handleSearch = useCallback(() => {
    params.query = query
    params.skip = 0
    params.fromDate = startDate ? new Date(startDate).toISOString() : ''
    params.toDate = endDate ? new Date(endDate).toISOString() : ''
    params.status = status ? status : SaleStatus.ALL
    dispatch(getSalesRequest(params))
  }, [dispatch, params, query, startDate, endDate, status])

  const handleChange = useCallback((e) => {
    setStatus(e.value)
  }, [])

  const OptionComponent = ({ data, ...props }: any) => {
    return (
      <Option {...props}>
        <div className="d-flex justify-content-start align-items-center">
          <div className="">{data.label}</div>
        </div>
      </Option>
    )
  }

  return (
    <div className="app-fixed-search d-flex align-items-center">
      <div
        className="sidebar-toggle cursor-pointer d-block d-lg-none ml-1"
        onClick={handleMainSidebar}
      >
        <Menu size={21} />
      </div>
      <div className="d-flex align-content-center justify-content-around w-100">
        <InputGroup className="input-group-merge mr-1">
          <Input
            value={query}
            onChange={handleFilter}
            placeholder={
              activeLink !== 'add' && activeLink !== 'edit'
                ? 'Search by sales id, order number, invoice number'
                : ''
            }
            disabled={activeLink === 'edit'}
            className="border"
          />
        </InputGroup>
        <div className="mr-1">
          <Select
            options={SelectOptions}
            onChange={handleChange}
            className="react-select"
            classNamePrefix="select"
            components={{ Option: OptionComponent }}
            styles={customStyles}
            placeholder="STATUS"
            isDisabled={activeLink === 'edit'}
          />
        </div>

        <DatePicker
          selectsRange
          startDate={startDate}
          onChange={(update: any) => {
            setDateRange(update)
          }}
          endDate={endDate}
          className="form-control border"
          placeholderText="select date range"
          disabled={activeLink === 'edit'}
        />
        <Button
          color="primary"
          className="ml-1"
          onClick={handleSearch}
          disabled={activeLink === 'edit'}
        >
          Filter
        </Button>
      </div>
    </div>
  )
}

export default SearchBar

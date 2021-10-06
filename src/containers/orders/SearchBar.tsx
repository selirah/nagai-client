import React, { ChangeEvent, useCallback, useState } from 'react'
import { InputGroup, Input, Button } from 'reactstrap'
import { Menu } from 'react-feather'
import { useDispatch } from 'react-redux'
import { Dispatch, Selector } from 'redux/selector-dispatch'
import orderActions from 'redux/orders/actions'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select, { components } from 'react-select'
import { OrderStatus } from 'classes'

const { Option } = components

const { getOrdersRequest } = orderActions

interface Props {
  handleMainSidebar: () => void
}

const options = [
  {
    value: OrderStatus.PENDING,
    label: OrderStatus.PENDING
  },
  {
    value: OrderStatus.TRANSIT,
    label: OrderStatus.TRANSIT
  },
  {
    value: OrderStatus.DELIVERED,
    label: OrderStatus.DELIVERED
  },
  {
    value: OrderStatus.FAILED,
    label: OrderStatus.FAILED
  },
  {
    value: OrderStatus.ALL,
    label: OrderStatus.ALL
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
  const { activeLink, params } = Selector((state) => state.orders)
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
    params.status = status ? status : OrderStatus.ALL
    dispatch(getOrdersRequest(params))
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
                ? 'Search by order number'
                : ''
            }
            disabled={
              activeLink === 'add' ||
              activeLink === 'edit' ||
              activeLink === 'product-stock' ||
              activeLink === 'dispatch'
            }
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
            disabled={
              activeLink === 'add' ||
              activeLink === 'edit' ||
              activeLink === 'product-stock' ||
              activeLink === 'dispatch'
            }
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
          disabled={
            activeLink === 'add' ||
            activeLink === 'edit' ||
            activeLink === 'product-stock' ||
            activeLink === 'dispatch'
          }
        />
        <Button
          color="primary"
          className="ml-1"
          onClick={handleSearch}
          disabled={
            activeLink === 'add' ||
            activeLink === 'edit' ||
            activeLink === 'product-stock' ||
            activeLink === 'dispatch'
          }
        >
          Filter
        </Button>
      </div>
    </div>
  )
}

export default SearchBar

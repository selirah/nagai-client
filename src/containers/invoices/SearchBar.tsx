import React, { ChangeEvent, useCallback, useState } from 'react'
import { InputGroup, Input, Button } from 'reactstrap'
import { Menu } from 'react-feather'
import { useDispatch } from 'react-redux'
import { Dispatch, Selector } from '@redux/selector-dispatch'
import stockActions from '@redux/stock/actions'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const { getStockRequest } = stockActions

interface Props {
  handleMainSidebar: () => void
}

const SearchBar: React.FC<Props> = (props) => {
  const { handleMainSidebar } = props
  const [query, setQuery] = useState('')
  const dispatch: Dispatch = useDispatch()
  const { activeLink, params } = Selector((state) => state.stock)
  const [dateRange, setDateRange] = useState<Date[] | null[]>([null, null])
  const [startDate, endDate] = dateRange

  const handleFilter = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])

  const handleSearch = useCallback(() => {
    params.query = query
    params.skip = 0
    params.fromDate = startDate ? new Date(startDate).toISOString() : ''
    params.toDate = endDate ? new Date(endDate).toISOString() : ''
    dispatch(getStockRequest(params))
  }, [dispatch, params, query, startDate, endDate])

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
                ? 'Search by invoice number, order number ..'
                : ''
            }
            disabled={activeLink === 'add' || activeLink === 'edit'}
            className="border"
          />
        </InputGroup>

        <DatePicker
          selectsRange
          startDate={startDate}
          onChange={(update: any) => {
            setDateRange(update)
          }}
          endDate={endDate}
          className="form-control border"
          placeholderText="select date range"
          disabled={activeLink === 'add' || activeLink === 'edit'}
        />
        <Button
          color="primary"
          className="ml-1"
          onClick={handleSearch}
          disabled={activeLink === 'add' || activeLink === 'edit'}
        >
          Filter
        </Button>
      </div>
    </div>
  )
}

export default SearchBar

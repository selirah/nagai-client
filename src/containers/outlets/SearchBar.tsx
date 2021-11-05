import React, { ChangeEvent, useCallback, useState } from 'react'
import { InputGroup, Input, Button } from 'reactstrap'
import { Menu } from 'react-feather'
import { useDispatch } from 'react-redux'
import { Dispatch, Selector } from '@redux/selector-dispatch'
import outletActions from '@redux/outlets/actions'
import Select, { components } from 'react-select'
import { Territory, OptionKey } from '@classes/index'

interface Props {
  handleMainSidebar: () => void
  territories: Territory[]
}

const { getOutletsRequest } = outletActions

const { Option } = components

const SearchBar: React.FC<Props> = (props) => {
  const { handleMainSidebar, territories } = props
  const [query, setQuery] = useState('')
  const dispatch: Dispatch = useDispatch()
  const { activeLink, params } = Selector((state) => state.outlets)
  const [territoryId, setTerritoryId] = useState(0)

  const handleFilter = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])

  const handleSelect = useCallback((value: any) => {
    setTerritoryId(parseInt(value.value))
  }, [])

  const handleSearch = useCallback(() => {
    params.query = query
    params.skip = 0
    params.territory = territoryId
    dispatch(getOutletsRequest(params))
  }, [dispatch, params, query, territoryId])

  const territoriesOptions: OptionKey[] = []

  territories.length &&
    territories.map((t) => {
      territoriesOptions.push({
        value: `${t.id}`,
        label: `${t.locality}`
      })
      return territoriesOptions
    })

  const selectOptions = [
    {
      label: 'Select territory to search',
      options: territoriesOptions
    }
  ]

  const OptionComponent = ({ data, ...props }: any) => {
    return (
      <Option {...props}>
        <div className="d-flex justify-content-start align-items-center">
          <div className="profile-user-info">{data.label}</div>
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
      <div className="d-flex align-content-center justify-content-between w-100">
        <InputGroup className="input-group-merge mr-1 w-50">
          <Input
            value={query}
            onChange={handleFilter}
            placeholder={
              activeLink !== 'add' && activeLink !== 'edit'
                ? 'Search by barcode, outlet name, owner name ..'
                : ''
            }
            disabled={activeLink === 'add' || activeLink === 'edit'}
            className="border"
          />
        </InputGroup>
        <div className="w-50">
          <Select
            options={selectOptions}
            onChange={handleSelect}
            className="react-select"
            components={{ Option: OptionComponent }}
            classNamePrefix="select"
            placeholder="Select territory to search"
            isDisabled={activeLink === 'add' || activeLink === 'edit'}
          />
        </div>

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

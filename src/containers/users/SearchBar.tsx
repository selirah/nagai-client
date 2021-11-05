import React, { ChangeEvent, Fragment, useCallback, useState } from 'react'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Button
} from 'reactstrap'
import { Search, Menu } from 'react-feather'
import { useDispatch } from 'react-redux'
import { Dispatch, Selector } from '@redux/selector-dispatch'
import userActions from '@redux/users/actions'
import utilsActions from '@redux/utils/actions'
interface Props {
  handleMainSidebar: () => void
}

const { getUsersRequest } = userActions
const { setSearchText } = utilsActions

const SearchBar: React.FC<Props> = (props) => {
  const { handleMainSidebar } = props
  const [query, setQuery] = useState('')
  const dispatch: Dispatch = useDispatch()
  const { activeLink, params } = Selector((state) => state.users)
  const { territories } = Selector((state) => state.utils)

  const handleFilter = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }, [])

  const handleSearch = useCallback(() => {
    params.query = query
    params.skip = 0
    params.role = ''
    dispatch(getUsersRequest(params))
  }, [dispatch, params, query])

  const handleTextSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value)
      dispatch(setSearchText(e.target.value, territories))
    },
    [dispatch, territories]
  )

  return (
    <div className="app-fixed-search d-flex align-items-center">
      <div
        className="sidebar-toggle cursor-pointer d-block d-lg-none ml-1"
        onClick={handleMainSidebar}
      >
        <Menu size={21} />
      </div>
      <div className="d-flex align-content-center justify-content-between w-100">
        {activeLink !== 'assign-territories' ? (
          <Fragment>
            <InputGroup className="input-group-merge">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  {activeLink !== 'add' && activeLink !== 'edit' ? (
                    <Search className="text-muted" size={14} />
                  ) : null}
                </InputGroupText>
              </InputGroupAddon>
              <Input
                value={query}
                onChange={handleFilter}
                placeholder={
                  activeLink !== 'add' && activeLink !== 'edit'
                    ? 'Search by first name, last name, email, phone ..'
                    : ''
                }
                disabled={activeLink === 'add' || activeLink === 'edit'}
              />
            </InputGroup>
            <Button
              color="primary"
              className="ml-1"
              onClick={handleSearch}
              disabled={activeLink === 'add' || activeLink === 'edit'}
            >
              Filter
            </Button>
          </Fragment>
        ) : (
          <InputGroup className="input-group-merge">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <Search className="text-muted" size={14} />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              value={query}
              onChange={handleTextSearch}
              placeholder="Search by area .."
            />
          </InputGroup>
        )}
      </div>
    </div>
  )
}

export default SearchBar

import React, {
  useState,
  useEffect,
  useCallback,
  KeyboardEvent,
  ChangeEvent,
  Fragment
} from 'react'
import { Link } from 'react-router-dom'
import * as Icons from 'react-feather'
import classnames from 'classnames'
import Autocomplete from '@core/components/autocomplete'
import {
  NavItem,
  NavLink,
  UncontrolledTooltip,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { useDispatch } from 'react-redux'
import { Selector, Dispatch } from '@redux/selector-dispatch'
import navbarActions from '@redux/navbar/actions'
import { Bookmark } from '@classes/Bookmark'

const { getBookmarksRequest, updateBookmarkRequest, handleSearchQuery } =
  navbarActions

interface NavbarBookmarksProps {
  setMenuVisibility: (value: boolean) => void
}

const NavbarBookmarks: React.FC<NavbarBookmarksProps> = (props) => {
  const { setMenuVisibility } = props
  const [value, setValue] = useState('')
  const [openSearch, setOpenSearch] = useState(false)
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.navbar)

  useEffect(() => {
    dispatch(getBookmarksRequest())
  }, [])

  // ** Loops through Bookmarks Array to return Bookmarks
  const renderBookmarks = () => {
    if (store.bookmarks.length) {
      return store.bookmarks
        .map((item) => {
          const IconTag = Icons[item.icon]
          return (
            <NavItem key={item.target} className="d-none d-lg-block">
              <NavLink tag={Link} to={item.link} id={item.target}>
                <IconTag className="ficon" />
                <UncontrolledTooltip target={item.target}>
                  {item.title}
                </UncontrolledTooltip>
              </NavLink>
            </NavItem>
          )
        })
        .slice(0, 10)
    } else {
      return null
    }
  }

  // ** If user has more than 10 bookmarks then add the extra Bookmarks to a dropdown
  const renderExtraBookmarksDropdown = () => {
    if (store.bookmarks.length && store.bookmarks.length >= 11) {
      return (
        <NavItem className="d-none d-lg-block">
          <NavLink tag="span">
            <UncontrolledDropdown>
              <DropdownToggle>
                <Icons.ChevronDown className="ficon" />
              </DropdownToggle>
              <DropdownMenu right>
                {store.bookmarks
                  .map((item) => {
                    const IconTag = Icons[item.icon]
                    return (
                      <DropdownItem tag={Link} to={item.link} key={item.id}>
                        <IconTag className="mr-50" size={14} />
                        <span className="align-middle">{item.title}</span>
                      </DropdownItem>
                    )
                  })
                  .slice(10)}
              </DropdownMenu>
            </UncontrolledDropdown>
          </NavLink>
        </NavItem>
      )
    }
  }

  // ** Removes query in store
  const handleClearQueryInStore = useCallback(() => {
    dispatch(handleSearchQuery(''))
  }, [dispatch])

  // ** Loops through Bookmarks Array to return Bookmarks
  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== undefined && (e.key === 'Escape' || e.key === 'Enter')) {
        setTimeout(() => {
          setOpenSearch(false)
          handleClearQueryInStore()
        }, 1)
      }
    },
    [handleClearQueryInStore]
  )

  // ** Function to toggle Bookmarks
  const handleBookmarkUpdate = useCallback(
    (id: number) => {
      dispatch(updateBookmarkRequest(id))
    },
    [dispatch]
  )

  // ** Function to handle Bookmarks visibility
  const handleBookmarkVisibility = useCallback(() => {
    setOpenSearch(!openSearch)
    setValue('')
    handleClearQueryInStore()
  }, [openSearch, handleClearQueryInStore])

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
      dispatch(handleSearchQuery(e.target.value))
    },
    [dispatch]
  )

  // ** Function to handle external Input click
  const handleExternalClick = useCallback(() => {
    if (openSearch) {
      setOpenSearch(false)
      handleClearQueryInStore()
    }
  }, [openSearch, handleClearQueryInStore])

  // ** Function to clear input value
  const handleClearInput = useCallback(
    (setUserInput: any) => {
      if (!openSearch) {
        setUserInput('')
        handleClearQueryInStore()
      }
    },
    [openSearch, handleClearQueryInStore]
  )

  return (
    <Fragment>
      <ul className="navbar-nav d-xl-none">
        <NavItem className="mobile-menu mr-auto">
          <NavLink
            className="nav-menu-main menu-toggle hidden-xs is-active"
            onClick={() => setMenuVisibility(true)}
          >
            <Icons.Menu className="ficon" />
          </NavLink>
        </NavItem>
      </ul>
      <ul className="nav navbar-nav bookmark-icons">
        {renderBookmarks()}
        {renderExtraBookmarksDropdown()}
        <NavItem className="nav-item d-none d-lg-block">
          <NavLink className="bookmark-star" onClick={handleBookmarkVisibility}>
            <Icons.Star className="ficon text-warning" />
          </NavLink>
          <div
            className={classnames('bookmark-input search-input', {
              show: openSearch
            })}
          >
            <div className="bookmark-input-icon">
              <Icons.Search size={14} />
            </div>
            {openSearch && store.suggestions.length ? (
              <Autocomplete
                wrapperClass={classnames('search-list search-list-bookmark', {
                  show: openSearch
                })}
                className="form-control"
                suggestions={
                  !value.length ? store.bookmarks : store.suggestions
                }
                filterKey="title"
                autoFocus={true}
                defaultSuggestions
                suggestionLimit={!value.length ? store.bookmarks.length : 6}
                placeholder="Search..."
                externalClick={handleExternalClick}
                clearInput={(userInput, setUserInput) =>
                  handleClearInput(setUserInput)
                }
                onKeyDown={onKeyDown}
                value={value}
                onChange={handleInputChange}
                customRender={(
                  item: Bookmark,
                  i: number,
                  filteredData: any,
                  activeSuggestion: any,
                  onSuggestionItemClick: any,
                  onSuggestionItemHover: any
                ) => {
                  const IconTag = Icons[item.icon ? item.icon : 'X']
                  return (
                    <li
                      key={i}
                      onMouseEnter={() =>
                        onSuggestionItemHover(filteredData.indexOf(item))
                      }
                      className={classnames(
                        'suggestion-item d-flex align-items-center justify-content-between',
                        {
                          active:
                            filteredData.indexOf(item) === activeSuggestion
                        }
                      )}
                    >
                      <Link
                        to={item.link}
                        className="d-flex align-items-center justify-content-between p-0"
                        onClick={() => {
                          setOpenSearch(false)
                          handleClearQueryInStore()
                        }}
                        style={{ width: 'calc(90%)' }}
                      >
                        <div className="d-flex justify-content-start align-items-center overflow-hidden">
                          <IconTag size={17.5} className="mr-75" />
                          <span className="text-truncate">{item.title}</span>
                        </div>
                      </Link>
                      <Icons.Star
                        size={17.5}
                        className={classnames('bookmark-icon float-right', {
                          'text-warning': item.isBookmarked
                        })}
                        onClick={() => handleBookmarkUpdate(item.id)}
                      ></Icons.Star>
                    </li>
                  )
                }}
              />
            ) : null}
          </div>
        </NavItem>
      </ul>
    </Fragment>
  )
}

export default NavbarBookmarks

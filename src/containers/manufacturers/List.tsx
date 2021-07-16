import { useEffect, useState, Fragment } from 'react'
import { Selector, Dispatch } from 'redux/selector-dispatch'
import { useDispatch } from 'react-redux'
import manufacturerActions from 'redux/manufacturers/actions'
import { Manufacturer } from 'classes'
import { isEmpty } from 'utils'
import Spinner from 'components/Spinner'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { ReactSortable } from 'react-sortablejs'
import classnames from 'classnames'
import { MoreVertical } from 'react-feather'
import Avatar from 'core/components/avatar'
import moment from 'moment'

const { getManufacturersRequest, reorderList } = manufacturerActions

const List = () => {
  const dispatch: Dispatch = useDispatch()
  const store = Selector((state) => state.manufacturers)
  const [loading, setLoading] = useState(false)
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([])

  useEffect(() => {
    if (isEmpty(manufacturers)) {
      dispatch(getManufacturersRequest())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { loading, manufacturers } = store
    setLoading(loading)
    setManufacturers(manufacturers)
  }, [store])

  const renderLoader = () => <Spinner />

  const renderEmptyList = () => (
    <div className="no-results show">
      <h5>No entries found</h5>
    </div>
  )

  const renderAvatar = (manifacturer: Manufacturer) => {
    if (manifacturer && manifacturer.logo) {
      return (
        <div
          className="avatar-placeholder"
          style={{
            background: `url(${manifacturer.logo}) no-repeat center transparent`
          }}
        ></div>
      )
    } else {
      return <Avatar color="primary" content={`${manifacturer.name}`} initals />
    }
  }

  const renderList = () => (
    <PerfectScrollbar
      options={{ wheelPropagation: false }}
      containerRef={(ref: any) => {
        if (ref) {
          ref._getBoundingClientRect = ref.getBoundingClientRect
          ref.getBoundingClientRect = () => {
            const original = ref._getBoundingClientRect()

            return { ...original, height: Math.floor(original.height) }
          }
        }
      }}
    >
      <Fragment>
        <ReactSortable
          tag="ul"
          list={manufacturers}
          handle=".drag-icon"
          className="todo-task-list media-list"
          setList={(state: Manufacturer[]) => dispatch(reorderList(state))}
        >
          {manufacturers.map((item) => (
            <li
              key={item.id}
              className={classnames('todo-item', { completed: false })}
            >
              <div className="todo-title-wrapper">
                <div className="todo-title-area">
                  <MoreVertical className="drag-icon" />
                  <span className="todo-title">{`${item.name}`}</span>
                </div>
                <div className="todo-item-action mt-lg-0 mt-50">
                  <small className="text-nowrap text-muted mr-1">
                    {moment(item.createdAt).format('MMM Do')}
                  </small>
                  {renderAvatar(item)}
                </div>
              </div>
            </li>
          ))}
        </ReactSortable>
      </Fragment>
    </PerfectScrollbar>
  )

  return (
    <Fragment>
      <div className="list-group todo-task-list-wrapper">
        {loading
          ? renderLoader()
          : manufacturers.length
          ? renderList()
          : renderEmptyList()}
      </div>
    </Fragment>
  )
}

export default List

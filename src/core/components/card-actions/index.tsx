import { Fragment, useState, useEffect } from 'react'
import classnames from 'classnames'
import UILoader from '@core/components/ui-loader'
import { ChevronDown, RotateCw, X } from 'react-feather'
import { Card, CardHeader, CardTitle, Collapse } from 'reactstrap'

interface CardActionsProps {
  title: string
  collapseIcon?: any
  removeIcon?: any
  reloadIcon?: any
  actions: any
  endReload?: (props: any) => any
}

const CardActions: React.FC<CardActionsProps> = (props) => {
  const {
    title,
    actions,
    children,
    collapseIcon,
    reloadIcon,
    removeIcon,
    endReload
  } = props
  const [reload, setReload] = useState(false)
  const [collapse, setCollapse] = useState(true)
  const [visibility, setVisibility] = useState(true)

  /**
   ** If custom icon is defined then consider that else default icons
   */
  const Icons: any = {
    collapse: collapseIcon ? collapseIcon : ChevronDown,
    remove: removeIcon ? removeIcon : X,
    reload: reloadIcon ? reloadIcon : RotateCw
  }

  // Action to call
  const callAction = (action: string) => {
    switch (action) {
      case 'collapse':
        return setCollapse(!collapse)
      case 'remove':
        return setVisibility(false)
      case 'reload':
        return setReload(true)
      default:
    }
  }

  // ** Renders card actions
  const renderIcons = () => {
    /**
     ** IF: user passes array of actions then loop through them & render all of the actions
     ** ELSE: render single action
     */
    if (Array.isArray(actions)) {
      return actions.map((action, i) => {
        const Tag = Icons[action]
        return (
          <Tag
            key={i}
            className={classnames('cursor-pointer', {
              'mr-50': i < actions.length - 1
            })}
            size={15}
            onClick={() => callAction(action)}
          />
        )
      })
    } else {
      const Tag = Icons[actions]
      return (
        <Tag
          className="cursor-pointer"
          size={15}
          onClick={() => callAction(actions)}
        />
      )
    }
  }

  // ** Ends reload
  const removeReload = () => {
    setReload(false)
  }

  // ** If user passes endReload function call it.
  useEffect(() => {
    if (reload && endReload) {
      endReload(removeReload)
    }
  })

  // ** If user passes collapse action then return <Collapse> as Wrapper else return <Fragment>
  const CollaseWrapper =
    actions === 'collapse' || actions.includes('collapse') ? Collapse : Fragment

  // ** If user passes reload action then return <BlockUi> as Wrapper else return <Fragment>
  const BlockUIWrapper =
    actions === 'collapse' || actions.includes('collapse') ? UILoader : Fragment

  return (
    <BlockUIWrapper
      {...(actions === 'reload' || actions.includes('reload')
        ? {
            blocking: reload
          }
        : { blocking: false })}
    >
      <Card
        className={classnames('card-action', {
          'd-none': !visibility
        })}
      >
        <CardHeader>
          <CardTitle tag="h4">{title}</CardTitle>
          <div className="action-icons">{renderIcons()}</div>
        </CardHeader>
        <CollaseWrapper
          {...(actions === 'collapse' || actions.includes('collapse')
            ? { isOpen: collapse }
            : {})}
        >
          {children}
        </CollaseWrapper>
      </Card>
    </BlockUIWrapper>
  )
}

export default CardActions

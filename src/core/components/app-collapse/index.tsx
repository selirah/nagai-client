import { useState } from 'react'
import classnames from 'classnames'
import { ChevronUp } from 'react-feather'
import { Collapse, Card, CardHeader, CardBody, CardTitle } from 'reactstrap'

interface AppCollapseProps {
  data: any
  accordion?: boolean
  type?: 'shadow' | 'border' | 'margin'
  active?: any | number
  titleKey?: string
  contentKey?: string
  className?: any
  toggle?: 'click' | 'hover'
}

const AppCollapse: React.FC<AppCollapseProps> = (props) => {
  // Props
  const {
    data,
    type,
    accordion,
    active,
    toggle,
    titleKey,
    contentKey,
    className
  } = props

  // If accordion is true then return only one active index else return an array
  const defaultActive = () => {
    return accordion ? active : [...active]
  }

  // State
  const [openCollapse, setOpenCollapse] = useState(defaultActive())

  // Function to handle collapse toggle
  const handleCollapseToggle = (id: number) => {
    if (accordion) {
      id === openCollapse ? setOpenCollapse(null) : setOpenCollapse(id)
    } else {
      const arr = openCollapse
      const index = arr.indexOf(id)
      if (arr.includes(id)) {
        arr.splice(index, 1)
        setOpenCollapse([...arr])
      } else {
        arr.push(id)
        setOpenCollapse([...arr])
      }
    }
  }

  // Function to render collapse
  const renderData = () => {
    return data.map((item: any, index: number) => {
      const title = titleKey ? item[titleKey] : item.title
      const content = contentKey ? item[contentKey] : item.content

      return (
        <Card
          className={classnames('app-collapse', {
            [item.className]: item.className,
            open: accordion
              ? openCollapse === index
              : openCollapse.includes(index) && type === 'shadow'
          })}
          key={index}
        >
          <CardHeader
            className={classnames('align-items-center', {
              collapsed: accordion
                ? openCollapse !== index
                : !openCollapse.includes(index)
            })}
            {...(toggle === 'hover'
              ? { onMouseEnter: () => handleCollapseToggle(index) }
              : { onClick: () => handleCollapseToggle(index) })}
          >
            <CardTitle className="collapse-title">{title}</CardTitle>
            <ChevronUp size={14} />
          </CardHeader>
          <Collapse
            isOpen={
              accordion ? openCollapse === index : openCollapse.includes(index)
            }
          >
            <CardBody>{content}</CardBody>
          </Collapse>
        </Card>
      )
    })
  }

  return (
    <div
      className={classnames('collapse-icon', {
        [className]: className,
        'collapse-default': !type,
        'collapse-shadow': type === 'shadow',
        'collapse-border': type === 'border',
        'collapse-margin': type === 'margin'
      })}
    >
      {renderData()}
    </div>
  )
}

AppCollapse.defaultProps = {
  active: [],
  toggle: 'click'
}

export default AppCollapse

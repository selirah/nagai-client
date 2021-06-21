import { Fragment } from 'react'
import classnames from 'classnames'
import { UncontrolledTooltip } from 'reactstrap'
import Avatar from 'core/components/avatar'

interface AvatarGroupProps {
  data: any[]
  tag?: any
  className?: any
}

const AvatarGroup: React.FC<AvatarGroupProps> = (props) => {
  const { data, tag, className } = props
  const Tag = tag ? tag : 'div'

  const renderData = () => {
    return data.map((item, i) => {
      const ItemTag = item.tag ? item.tag : 'div'
      return (
        <Fragment key={i}>
          {item.title ? (
            <UncontrolledTooltip
              placement={item.placement}
              target={item.title.split(' ').join('-')}
            >
              {item.title}
            </UncontrolledTooltip>
          ) : null}
          {!item.meta ? (
            <Avatar
              tag={ItemTag}
              className={classnames('pull-up', {
                [item.className]: item.className
              })}
              {...(item.title ? { id: item.title.split(' ').join('-') } : {})}
              {...item}
            />
          ) : null}
          {item.meta ? (
            <ItemTag className="d-flex align-items-center pl-1">
              {item.meta}
            </ItemTag>
          ) : null}
        </Fragment>
      )
    })
  }

  return (
    <Tag
      className={classnames('avatar-group', {
        [className]: className
      })}
    >
      {renderData()}
    </Tag>
  )
}
export default AvatarGroup

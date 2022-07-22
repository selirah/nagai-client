import { forwardRef } from 'react'
import { Badge } from 'reactstrap'
import classnames from 'classnames'

interface AvatarProps {
  imgClassName?: any
  className?: any
  src?: string
  tag?: any
  badgeUp?: boolean
  content?: any
  icon?: React.ReactNode
  contentStyles?: object
  badgeText?: string
  imgHeight?: string | number
  imgWidth?: string | number
  size?: 'sm' | 'lg' | 'xl'
  status?: 'online' | 'offline' | 'away' | 'busy'
  initials?: boolean
  badgeColor?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'info'
    | 'warning'
    | 'dark'
    | 'light-primary'
    | 'light-secondary'
    | 'light-success'
    | 'light-danger'
    | 'light-info'
    | 'light-warning'
    | 'light-dark'
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'info'
    | 'warning'
    | 'dark'
    | 'light-primary'
    | 'light-secondary'
    | 'light-success'
    | 'light-danger'
    | 'light-info'
    | 'light-warning'
    | 'light-dark'
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const {
    color,
    className,
    imgClassName,
    size,
    badgeUp,
    content,
    icon,
    badgeColor,
    badgeText,
    src,
    imgHeight,
    imgWidth,
    status,
    tag: Tag,
    contentStyles,
    initials,
    ...rest
  } = props

  // ** Function to extract initials from content
  const getInitials = (str: string) => {
    const results: string[] = []
    const wordArray = str.split(' ')
    wordArray.forEach((e) => {
      results.push(e[0])
    })
    return results.join('').substr(0, 2)
  }
  return (
    <Tag
      className={classnames('avatar', {
        [className]: className,
        [`bg-${color}`]: color,
        [`avatar-${size}`]: size
      })}
      ref={ref}
      {...rest}
    >
      {!src || src === undefined ? (
        <span
          className={classnames('avatar-content', {
            'position-relative': badgeUp
          })}
          style={contentStyles}
        >
          {initials && content ? getInitials(content) : content}
          {icon ? icon : null}
          {badgeUp ? (
            <Badge
              color={badgeColor ? badgeColor : 'primary'}
              className="badge-sm badge-up"
              pill
            >
              {badgeText ? badgeText : '0'}
            </Badge>
          ) : null}
        </span>
      ) : (
        <img
          className={classnames({
            [imgClassName]: imgClassName
          })}
          src={src}
          alt="avatarImg"
          height={imgHeight && !size ? imgHeight : 32}
          width={imgWidth && !size ? imgWidth : 32}
        />
      )}
      {status ? (
        <span
          className={classnames({
            [`avatar-status-${status}`]: status,
            [`avatar-status-${size}`]: size
          })}
        ></span>
      ) : null}
    </Tag>
  )
})

Avatar.defaultProps = {
  tag: 'div'
}

export default Avatar

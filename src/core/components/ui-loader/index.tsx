import { Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Spinner } from 'reactstrap'
import './index.scss'

interface UILoaderProps {
  blocking: boolean
  tag?: any
  loader?: any
  className?: string
  overlayColor?: string
}

const UILoader: React.FC<UILoaderProps> = (props) => {
  const { blocking, children, className, loader, overlayColor, tag } = props

  const Tag = tag

  return (
    <Tag
      className={classnames('ui-loader', {
        [className ? className : '']: className,
        show: blocking
      })}
    >
      {children}
      {blocking ? (
        <Fragment>
          <div
            className="overlay"
            {...(blocking && overlayColor ? { style: { backgroundColor: overlayColor } } : {})}
          ></div>
          <div className="loader">{loader}</div>
        </Fragment>
      ) : null}
    </Tag>
  )
}

export default UILoader

UILoader.defaultProps = {
  tag: 'div',
  blocking: false,
  loader: <Spinner color="primary" />
}

UILoader.propTypes = {
  blocking: PropTypes.bool.isRequired,
  tag: PropTypes.any,
  loader: PropTypes.any,
  className: PropTypes.string,
  overlayColor: PropTypes.string
}

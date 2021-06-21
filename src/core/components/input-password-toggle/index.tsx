import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Eye, EyeOff } from 'react-feather'
import {
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  Label
} from 'reactstrap'

interface InputPasswordToggleProps {
  hideIcon?: React.ReactNode
  showIcon?: React.ReactNode
  visible?: boolean
  className?: any
  placeholder?: string
  iconSize?: number
  inputClassName?: any
  htmlFor?: string
  label?: string
}

const InputPasswordToggle: React.FC<InputPasswordToggleProps> = (props) => {
  const {
    label,
    hideIcon,
    showIcon,
    visible,
    className,
    htmlFor,
    placeholder,
    iconSize,
    inputClassName,
    ...rest
  } = props
  const [inputVisibility, setInputVisibility] = useState(visible)

  const renderIcon = () => {
    const size = iconSize ? iconSize : 14

    if (inputVisibility === false) {
      return hideIcon ? hideIcon : <Eye size={size} />
    } else {
      return showIcon ? showIcon : <EyeOff size={size} />
    }
  }

  return (
    <Fragment>
      {label ? <Label for={htmlFor}>{label}</Label> : null}
      <InputGroup
        className={classnames({
          [className]: className
        })}
      >
        <Input
          type={inputVisibility === false ? 'password' : 'text'}
          placeholder={placeholder ? placeholder : '············'}
          className={classnames({
            [inputClassName]: inputClassName
          })}
        />
        <InputGroupAddon
          addonType="append"
          onClick={() => setInputVisibility(!inputVisibility)}
        >
          <InputGroupText className="cursor-pointer">
            {renderIcon()}
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </Fragment>
  )
}

InputPasswordToggle.defaultProps = {
  visible: false
}

export default InputPasswordToggle

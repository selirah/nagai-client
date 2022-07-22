import React, { Fragment, useState } from 'react'
import classnames from 'classnames'
import { Eye, EyeOff } from 'react-feather'
import {
  InputGroup,
  InputGroupAddon,
  Input,
  InputGroupText,
  Label,
  InputProps
} from 'reactstrap'

interface InputPasswordToggleProps extends InputProps {
  hideIcon?: React.ReactNode
  showIcon?: React.ReactNode
  show?: boolean
  className?: any
  placeholder?: string
  iconSize?: number
  inputClassName?: any
  htmlFor?: string
  label?: string
  id?: string
}

const InputPasswordToggle: React.FC<InputPasswordToggleProps> = (props) => {
  const {
    label,
    hideIcon,
    showIcon,
    show,
    className,
    htmlFor,
    placeholder,
    iconSize,
    inputClassName
  } = props
  const [inputVisibility, setInputVisibility] = useState(show)

  const renderIcon = () => {
    const size = iconSize ? iconSize : 14

    if (!inputVisibility) {
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
          type={!inputVisibility ? 'password' : 'text'}
          placeholder={placeholder ? placeholder : '············'}
          className={classnames({
            [inputClassName]: inputClassName
          })}
          {...props}
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

export default InputPasswordToggle

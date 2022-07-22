import React, { useState, useEffect, ChangeEvent } from 'react'
import classnames from 'classnames'
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap'
import { Plus, Minus } from 'react-feather'
import './index.scss'

const KEYCODE_UP = 'ArrowUp'
const KEYCODE_DOWN = 'ArrowDown'

interface NumberInputProps {
  wrap?: boolean
  min?: number
  max?: number
  step?: number
  value?: number
  style?: object
  vertical?: boolean
  disabled?: boolean
  readonly?: boolean
  onChange?: (count: number) => void
  upIcon?: React.ReactNode
  downIcon?: React.ReactNode
  className?: any
  onDecrement?: (count: number) => void
  onIncrement?: (count: number) => void
  inputClassName?: any
  size?: any
}

const NumberInput: React.FC<NumberInputProps> = (props) => {
  const {
    min,
    max,
    step,
    size,
    wrap,
    value,
    style,
    upIcon,
    disabled,
    readonly,
    onChange,
    downIcon,
    vertical,
    className,
    onDecrement,
    onIncrement,
    inputClassName,
    ...rest
  } = props

  const [count, setCount] = useState(value || min)

  // ** Handle btn down click
  const handleDecrement = () => {
    if (!disabled && !readonly) {
      // ** If count is equals or smaller than min then return and do nothing
      if (!wrap && count && min && count <= min) {
        return
      }

      // ** Returns the decreased count based on wrap & and min prop
      const countCondition = () => {
        if (count && step && min && count - step < min) {
          return wrap ? max : min
        } else {
          return count && step ? count - step : 1
        }
      }

      setCount(countCondition())

      if (onDecrement && count) {
        onDecrement(count)
      }
    }
  }

  // ** Handle btn up click
  const handleIncrement = () => {
    if (!disabled && !readonly) {
      // ** If count is equals or larger than min then return and do nothing
      if (!wrap && count && max && count >= max) {
        return
      }
    }

    // ** Returns the Increased count based on wrap & and max prop
    const countCondition = () => {
      if (count && step && max && count + step > max) {
        return wrap ? min : max
      } else {
        return count && step ? count + step : Infinity
      }
    }

    setCount(countCondition())

    if (onIncrement && count) {
      onIncrement(count)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCount(Number(e.target.value))
  }

  // ** Handle Arrow Up & Down
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (!readonly) {
      if (e.key !== undefined && e.key === KEYCODE_UP) {
        handleIncrement()
      }
      if (e.key !== undefined && e.key === KEYCODE_DOWN) {
        handleDecrement()
      }
    }
  }

  // ** UseEffect based on user passed onChange
  useEffect(() => {
    if (onChange && count) {
      onChange(count)
    }
  }, [count, onChange])

  return (
    <InputGroup
      className={classnames('number-input', {
        disabled,
        readonly,
        [className]: className,
        'vertical-number-input': vertical && size
      })}
      {...(style ? { style } : null)}
    >
      <InputGroupAddon addonType="prepend" onClick={handleDecrement}>
        <Button
          className="btn-icon"
          color="transparent"
          {...(size ? { size } : null)}
          disabled={
            (!wrap && count && min && count <= min) || disabled || readonly
          }
        >
          {downIcon}
        </Button>
      </InputGroupAddon>
      <Input
        {...rest}
        type="number"
        value={count}
        disabled={disabled}
        readOnly={readonly}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
        className={classnames({
          [inputClassName]: inputClassName
        })}
        {...(size ? { size } : null)}
      />
      <InputGroupAddon addonType="append" onClick={handleIncrement}>
        <Button
          className="btn-icon"
          color="transparent"
          {...(size ? { size } : null)}
          disabled={
            (!wrap && count && max && count >= max) || disabled || readonly
          }
        >
          {upIcon}
        </Button>
      </InputGroupAddon>
    </InputGroup>
  )
}

NumberInput.defaultProps = {
  min: 1,
  step: 1,
  wrap: false,
  max: Infinity,
  disabled: false,
  readonly: false,
  downIcon: <Minus size={14} />,
  upIcon: <Plus size={14} />
}

export default NumberInput

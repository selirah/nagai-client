import React, { Fragment } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface Props {
  onChange: (name: string, value: any) => void
  onBlur?: (name: string, value: boolean) => void
  name: string
  id?: string
  error?: any
  touched?: any
  value?: any
  placeholder?: string
  minDate?: Date
  showDisabledMonthNavigation?: boolean
}

const DatePickerComponent: React.FC<Props> = (props) => {
  const {
    onChange,
    onBlur,
    id,
    name,
    error,
    touched,
    value,
    placeholder,
    minDate,
    showDisabledMonthNavigation
  } = props

  const handleChange = (e: Date) => {
    onChange(name, e)
  }

  const handleBlur = () => {
    onBlur && onBlur(name, true)
  }

  return (
    <Fragment>
      <DatePicker
        selected={value}
        onChange={handleChange}
        onBlur={handleBlur}
        id={id}
        name={name}
        placeholderText={placeholder}
        dateFormat="yyyy-MM-dd"
        minDate={minDate}
        showDisabledMonthNavigation={showDisabledMonthNavigation}
        className="form-control"
        popperPlacement="top"
      />
      {error && touched ? (
        <small style={{ color: '#ff0000' }}>{error}</small>
      ) : null}
    </Fragment>
  )
}

export default DatePickerComponent

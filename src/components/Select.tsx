import React, { Fragment } from 'react'
import Select from 'react-select'
import { OptionKey } from 'classes'

interface Option {
  label: string
  options: OptionKey[]
}

interface Props {
  onChange: (name: string, value: any) => void
  onBlur: (name: string, value: boolean) => void
  options: Option[]
  name: string
  id: string
  optionComponent: any
  error?: any
  touched?: any
  value: any
  placeholder?: string
}

const SelectComponent: React.FC<Props> = (props) => {
  const {
    onChange,
    onBlur,
    optionComponent,
    id,
    name,
    options,
    error,
    touched,
    value,
    placeholder
  } = props

  const handleChange = (e: OptionKey) => {
    onChange(name, e)
  }

  const handleBlur = () => {
    onBlur(name, true)
  }

  return (
    <Fragment>
      <Select
        options={options}
        onChange={handleChange}
        onBlur={handleBlur}
        className="react-select"
        name={name}
        id={id}
        classNamePrefix="select"
        components={{ Option: optionComponent }}
        value={value}
        placeholder={placeholder}
      />
      {error && touched ? (
        <small style={{ color: '#ff0000' }}>{error}</small>
      ) : null}
    </Fragment>
  )
}

export default SelectComponent

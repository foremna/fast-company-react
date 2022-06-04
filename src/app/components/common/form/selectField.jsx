import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({
  label,
  value,
  name,
  onChange,
  defaultOption,
  options,
  error
}) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
        name: options[optionName].name,
        value: [optionName]._id
      }))
      : options

  const handleChange = ({ target }) => {
    onChange({ name: [target.name], value: target.value })
  }
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={`form-select ${error ? 'is-invalid' : ''}`}
        id="validationCustom04"
        name={name}
        value={value}
        onChange={handleChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
      </select>
      <div className="invalid-feedback">{error && error}</div>
    </div>
  )
}

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  defaultOption: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  optionsArray: PropTypes.func,
  error: PropTypes.string
}

export default SelectField

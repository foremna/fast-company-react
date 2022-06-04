import React from 'react'
import PropTypes from 'prop-types'

const RadioField = ({ label, name, onChange, value, options }) => {
  const handleChange = ({ target }) => {
    onChange({ name: [target.name], value: target.value })
  }
  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      {options &&
        options.map((option) => (
          <div
            key={option.name + '_' + option.value}
            className="form-check form-check-inline ms-2"
          >
            <input
              className="form-check-input"
              type="radio"
              name={name}
              id={option.name + '_' + option.value}
              value={option.value}
              checked={option.value === value}
              onChange={handleChange}
            />
            <label
              className="form-check-label"
              htmlFor={option.name + '_' + option.value}
            >
              {option.name}
            </label>
          </div>
        ))}
    </div>
  )
}

RadioField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  options: PropTypes.array
}

export default RadioField

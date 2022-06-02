import React, { useEffect, useState } from 'react'
import TextField from '../components/textField'
import { validator } from '../utils/validator'

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен неккоректно'
      }
    },
    password: {
      isRequired: {
        message: 'Пароль обязателен для заполнения'
      },
      isCapitalSymbol: {
        message: 'Необходимо наличие хотя бы одной заглавной буквы'
      },
      isContainDigit: {
        message: 'Необходимо наличие хотя бы одной цифры'
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8
      }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const validate = () => {
    const errors = validator(data, validatorConfig)

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-4 shadow p-3">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Электронная почта"
            name="email"
            value={data.email}
            onChange={handleChange}
            error={errors.email}
          />
          <TextField
            label="Пароль"
            type="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            error={errors.password}
          />
          <button className="btn btn-primary w-100 mx-auto" disabled={!isValid}>
            Авторизоваться
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login

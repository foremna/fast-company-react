import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'

import api from '../../../api'
import { validator } from '../../../utils/validator'

import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import MultiSelectField from '../../common/form/multiSelectField'
import RadioField from '../../common/form/radioField'

const EditUserPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [professions, setProfession] = useState([])
  const [qualities, setQualities] = useState([])
  const [data, setData] = useState({
    name: '',
    email: '',
    profession: '',
    sex: 'male',
    qualities: []
  })
  const [errors, setErrors] = useState({})
  const history = useHistory()
  const { userId } = useParams()

  const getProfessionalById = (id) => {
    for (const prof in professions) {
      const profData = professions[prof]
      if (profData._id === id) return profData
    }
  }

  const getQualities = (elements) => {
    const qualitiesArray = []
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          })
        }
      }
    }
    return qualitiesArray
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) return
    const { qualities, profession } = data

    api.users
      .update(userId, {
        ...data,
        profession: getProfessionalById(profession),
        qualities: getQualities(qualities)
      })
      .then((data) => history.push(`/users/${data._id}`))
  }

  const transformData = (data) => {
    return data.map((qual) => ({ label: qual._name, value: qual._id }))
  }

  useEffect(() => {
    setIsLoading(true)
    api.users.getById(userId).then(({ qualities, profession, ...data }) =>
      setData((prevState) => ({
        ...prevState,
        ...data,
        qualities: transformData(qualities),
        profession: profession._id
      }))
    )
    api.professions.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }))
      setProfession(professionsList)
    })
    api.qualities.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((optionName) => ({
        value: data[optionName]._id,
        label: data[optionName].name,
        color: data[optionName].color
      }))
      setQualities(qualitiesList)
    })
  }, [])
  useEffect(() => {
    if (data._id) setIsLoading(false)
  }, [data])

  const validatorConfig = {
    name: {
      isRequired: {
        message: 'Имя обязательно для заполнения'
      }
    },
    email: {
      isRequired: {
        message: 'Электронная почта обязательна для заполнения'
      },
      isEmail: {
        message: 'Email введен неккоректно'
      }
    }
  }

  useEffect(() => {
    validate()
  }, [data])

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)

    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValid = Object.keys(errors).length === 0

  return !isLoading && Object.keys(professions).length > 0 ? (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label="Email"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <RadioField
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Other', value: 'other' }
        ]}
        value={data.sex}
        name="sex"
        label="Пол:"
        onChange={handleChange}
      />
      <SelectField
        key={data._id}
        label="Профессии"
        value={data.profession}
        name="profession"
        onChange={handleChange}
        defaultOption="Выберите профессию"
        options={professions}
      />
      <MultiSelectField
        label="Ваши качества"
        options={qualities}
        defaultValue={data.qualities}
        onChange={handleChange}
        name="qualities"
      />
      <button className="btn btn-primary" disabled={!isValid}>
        Checkout info
      </button>
    </form>
  ) : (
    <h3>Loading...</h3>
  )
}

EditUserPage.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default EditUserPage

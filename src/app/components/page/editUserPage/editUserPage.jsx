import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import api from '../../../api'
import { validator } from '../../../utils/validator'

import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import MultiSelectField from '../../common/form/multiSelectField'
import RadioField from '../../common/form/radioField'

const EditUserPage = () => {
  const { userId } = useParams()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({
    name: '',
    email: '',
    profession: '',
    sex: 'male',
    qualities: []
  })
  const [professions, setProfession] = useState([])
  const [qualities, setQualities] = useState([])
  const [errors, setErrors] = useState({})

  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label }
      }
      console.log(prof)
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
    const { profession, qualities } = data

    api.users
      .update(userId, {
        ...data,
        profession: getProfessionById(profession),
        qualities: getQualities(qualities)
      })
      .then((data) => history.push(`/users/${data._id}`))
  }

  const transformData = (data) => {
    return data.map((qual) => ({ label: qual.name, value: qual._id }))
  }

  useEffect(() => {
    setIsLoading(true)
    api.users.getById(userId).then(({ profession, qualities, ...data }) =>
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
        // onChange={handleChange}
      />
      <SelectField
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

export default EditUserPage

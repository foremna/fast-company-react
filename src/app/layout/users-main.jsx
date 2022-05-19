import React from 'react'
import { useParams } from 'react-router-dom'

import api from '../api'

import User from '../components/user'
import Users from '../components/users'

const UsersMain = () => {
  const { userId } = useParams()

  return <>{userId ? <User api={api} userId={userId} /> : <Users />}</>
}

export default UsersMain

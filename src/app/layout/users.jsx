import React from 'react'
import { useParams } from 'react-router-dom'

import api from '../api'

import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'

const Users = () => {
  const { userId } = useParams()

  return (
    <>{userId ? <UserPage api={api} userId={userId} /> : <UsersListPage />}</>
  )
}

export default Users

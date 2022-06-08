import React from 'react'
import { useParams } from 'react-router-dom'

import api from '../api'

import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import Edit from './edit'

const Users = () => {
  const { userId, edit } = useParams()

  return (
    <>
      {userId ? (
        edit ? (
          <Edit />
        ) : (
          <UserPage api={api} userId={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </>
  )
}

export default Users

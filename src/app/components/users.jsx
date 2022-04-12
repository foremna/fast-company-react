import React from 'react'
import User from './user'

const Users = ({ users, userCrop, ...rest }) => {
  return userCrop.map((user) => (
    <User key={user._id} {...user} onDelete={rest.deleteUser} />
  ))
}

export default Users

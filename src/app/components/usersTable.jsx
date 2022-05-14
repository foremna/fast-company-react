import React from 'react'
import PropTypes from 'prop-types'

import Table from './table'
import Bookmark from './bookmark'
import Qualities from './qualities'

const UserTable = ({ handleUsers, onSort, users, selectedSort, onDelete }) => {
  const columns = {
    name: { path: 'name', name: 'Имя' },
    qualities: {
      name: 'Качества',
      component: (user) => <Qualities qualities={user.qualities} />
    },
    profession: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: { path: 'bookmark', name: 'Избранное', component: <Bookmark /> },
    delete: {
      component: (user) => (
        <button className="btn btn-danger" onClick={() => onDelete(user._id)}>
          delete
        </button>
      )
    }
  }
  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
      handleUsers={handleUsers}
    />
  )
}

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  handleUsers: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default UserTable
